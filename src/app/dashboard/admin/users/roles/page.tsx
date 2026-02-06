"use client";

import { useState, Suspense } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { UserCog, Search, Save, X, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/roles.module.css";

function UserRolesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<number | null>(userId ? parseInt(userId) : null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Mock users data - in production, fetch from Firebase/database
    const allUsers = [
        { id: 1, name: "John Doe", email: "john@example.com", currentRole: "Employee" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", currentRole: "HR" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", currentRole: "User" },
        { id: 4, name: "Alice Williams", email: "alice@example.com", currentRole: "Employee" },
        { id: 5, name: "Charlie Brown", email: "charlie@example.com", currentRole: "User" },
        { id: 6, name: "Diana Prince", email: "diana@example.com", currentRole: "Admin" },
    ];

    const [users, setUsers] = useState(allUsers);

    const roles = [
        { id: "employee", label: "Employee", description: "Can apply for jobs and manage applications", color: "blue" },
        { id: "hr", label: "HR", description: "Can post jobs and manage applicants", color: "purple" },
        { id: "admin", label: "Admin", description: "Full platform access and user management", color: "red" },
        { id: "user", label: "User", description: "Basic platform access", color: "gray" },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRoleChange = (userId: number, newRole: string) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, currentRole: newRole } : user
        ));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
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
                    Role updated successfully!
                </div>
            )}

            <div className={styles.contentGrid}>
                {/* User List */}
                <div className={styles.userListCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>All Users</h2>
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
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className={`${styles.userItem} ${selectedUser === user.id ? styles.userItemActive : ""}`}
                                onClick={() => setSelectedUser(user.id)}
                            >
                                <div className={styles.userAvatar}>{user.name.charAt(0)}</div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userName}>{user.name}</div>
                                    <div className={styles.userEmail}>{user.email}</div>
                                </div>
                                <span className={`${styles.roleBadge} ${styles[`role${user.currentRole}`]}`}>
                                    {user.currentRole}
                                </span>
                            </div>
                        ))}
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
                                    const isActive = currentUser?.currentRole === role.label;
                                    return (
                                        <div
                                            key={role.id}
                                            className={`${styles.roleOption} ${isActive ? styles.roleOptionActive : ""}`}
                                            onClick={() => handleRoleChange(selectedUser, role.label)}
                                        >
                                            <div className={styles.roleHeader}>
                                                <div className={`${styles.roleIcon} ${styles[`icon${role.color.charAt(0).toUpperCase() + role.color.slice(1)}`]}`}>
                                                    {isActive && <CheckCircle size={20} />}
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
