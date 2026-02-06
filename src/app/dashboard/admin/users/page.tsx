"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Users, Mail, Calendar, Shield, UserCog } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function AdminUsersPage() {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Employee", status: "Active", joinedDate: "2024-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "HR", status: "Active", joinedDate: "2024-01-20" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Active", joinedDate: "2024-02-01" },
        { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Employee", status: "Inactive", joinedDate: "2024-01-10" },
    ];

    const stats = [
        { label: "Total Users", value: "1,234", icon: Users, color: "purple" },
        { label: "Active Users", value: "987", icon: Users, color: "cyan" },
        { label: "New This Month", value: "45", icon: Calendar, color: "green" },
        { label: "Admins", value: "8", icon: Shield, color: "orange" },
    ];

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>User Management</h1>
                    <p className={styles.pageSubtitle}>Manage all platform users and their roles</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Link href="/dashboard/admin/users/roles" className={styles.primaryBtn}>
                        <UserCog size={18} />
                        Assign Role
                    </Link>
                    <button className={styles.primaryBtn} style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                        <Users size={18} />
                        Add User
                    </button>
                </div>
            </div>

            <div className={styles.statsGrid}>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={styles.statCard}>
                            <div className={`${styles.statIcon} ${styles[`stat${stat.color.charAt(0).toUpperCase() + stat.color.slice(1)}`]}`}>
                                <Icon size={24} />
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Users</h2>
                    <input
                        type="search"
                        placeholder="Search users..."
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className={styles.userCell}>
                                            <div className={styles.avatar}>{user.name.charAt(0)}</div>
                                            <span>{user.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.emailCell}>
                                            <Mail size={14} />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeInfo}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${user.status === "Active" ? styles.badgeSuccess : styles.badgeWarning}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{user.joinedDate}</td>
                                    <td>
                                        <Link href={`/dashboard/admin/users/roles?userId=${user.id}`} className={styles.actionBtn}>
                                            Edit Role
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
