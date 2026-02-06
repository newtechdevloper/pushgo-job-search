"use client";

import { useState, Suspense, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { UserCog, Search, X, CheckCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "@/styles/roles.module.css";

interface FirestoreUser {
    id: string;
    name: string;
    email: string;
    currentRole: string;
}

function UserRolesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<string | null>(userId);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [users, setUsers] = useState<FirestoreUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const roles = [
        { id: "employee", label: "Employee", description: "Can apply for jobs and manage applications", color: "blue" },
        { id: "hr", label: "HR", description: "Can post jobs and manage applicants", color: "purple" },
        { id: "admin", label: "Admin", description: "Full platform access and user management", color: "red" },
        { id: "user", label: "User", description: "Basic platform access", color: "gray" },
    ];

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const usersCollection = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollection);

                const fetchedUsers: FirestoreUser[] = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().displayName || "Unknown User",
                    email: doc.data().email || "",
                    currentRole: doc.data().role || "user",
                }));

                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            setSaving(true);

            // Update in Firestore
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                role: newRole.toLowerCase(),
            });

            // Update local state
            setUsers(users.map(user =>
                user.id === userId ? { ...user, currentRole: newRole } : user
            ));

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update role. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>
                        <UserCog size={32} />
                        User Role Management
                    </h1>
                    <p className={styles.pageSubtitle}>Assign and manage user roles across the platform</p>
                </div>
                <button onClick={() => router.back()} className={styles.backBtn}>
                    <X size={18} />
                    Close
                </button>
            </div>

            {saveSuccess && (
                <div className={styles.successAlert}>
                    <CheckCircle size={20} />
                    Role updated successfully in Firestore!
                </div>
            )}

            {loading ? (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "400px",
                    color: "#94a3b8",
                }}>
                    <div style={{ textAlign: "center" }}>
                        <Loader2 size={48} style={{ animation: "spin 1s linear infinite", marginBottom: "1rem" }} />
                        <p>Loading users from Firestore...</p>
                    </div>
                </div>
            ) : (
                <div className={styles.contentGrid}>
                    {/* User List */}
                    <div className={styles.userListCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>All Users ({users.length})</h2>
                            <div className={styles.searchWrapper}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="search"
                                    placeholder="Search users..."
                                    className={styles.searchInput}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.userList}>
                            {filteredUsers.length === 0 ? (
                                <p style={{ color: "#64748b", textAlign: "center", padding: "2rem" }}>
                                    {searchQuery ? "No users found" : "No users registered yet"}
                                </p>
                            ) : (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`${styles.userItem} ${selectedUser === user.id ? styles.userItemActive : ""}`}
                                        onClick={() => setSelectedUser(user.id)}
                                    >
                                        <div className={styles.userAvatar}>{user.name.charAt(0).toUpperCase()}</div>
                                        <div className={styles.userInfo}>
                                            <div className={styles.userName}>{user.name}</div>
                                            <div className={styles.userEmail}>{user.email}</div>
                                        </div>
                                        <span className={`${styles.roleBadge} ${styles[`role${user.currentRole.charAt(0).toUpperCase() + user.currentRole.slice(1)}`]}`}>
                                            {user.currentRole}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Role Assignment */}
                    <div className={styles.roleCard}>
                        {selectedUser ? (
                            <>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>Assign Role</h2>
                                    <p className={styles.cardSubtitle}>
                                        Selected: {users.find(u => u.id === selectedUser)?.name}
                                    </p>
                                </div>
                                <div className={styles.roleGrid}>
                                    {roles.map((role) => {
                                        const currentUser = users.find(u => u.id === selectedUser);
                                        const isActive = currentUser?.currentRole.toLowerCase() === role.id;
                                        return (
                                            <div
                                                key={role.id}
                                                className={`${styles.roleOption} ${isActive ? styles.roleOptionActive : ""} ${saving ? styles.disabled : ""}`}
                                                onClick={() => !saving && handleRoleChange(selectedUser, role.label)}
                                            >
                                                <div className={styles.roleHeader}>
                                                    <div className={`${styles.roleIcon} ${styles[`icon${role.color.charAt(0).toUpperCase() + role.color.slice(1)}`]}`}>
                                                        {saving ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : isActive && <CheckCircle size={20} />}
                                                    </div>
                                                    <h3 className={styles.roleTitle}>{role.label}</h3>
                                                </div>
                                                <p className={styles.roleDescription}>{role.description}</p>
                                                {isActive && (
                                                    <div className={styles.currentBadge}>Current Role</div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <UserCog size={64} />
                                <h3>Select a User</h3>
                                <p>Choose a user from the list to assign or change their role</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default function UserRolesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserRolesContent />
        </Suspense>
    );
}
