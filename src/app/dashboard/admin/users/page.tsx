"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Mail, Shield, MoreVertical } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function AdminUsers() {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Employee", status: "Active", joined: "2024-01-15" },
        { id: 2, name: "Sarah Johnson", email: "sarah@techcorp.ai", role: "HR", status: "Active", joined: "2024-01-10" },
        { id: 3, name: "Mike Chen", email: "mike@example.com", role: "Employee", status: "Active", joined: "2024-01-20" },
        { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Employee", status: "Inactive", joined: "2023-12-05" },
    ];

    return (
        <DashboardLayout role="admin" userName="Admin">
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                User Management
            </h2>

            <div className={styles.table}>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td style={{ fontWeight: "600" }}>{user.name}</td>
                                    <td>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <Mail size={14} color="#06b6d4" />
                                            {user.email}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <Shield size={14} color="#8b5cf6" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${user.status === "Active" ? styles.success : styles.warning}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{user.joined}</td>
                                    <td>
                                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                                            <MoreVertical size={18} />
                                        </button>
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
