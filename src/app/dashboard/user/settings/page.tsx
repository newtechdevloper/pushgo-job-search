"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { User, Bell, Lock } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function UserSettings() {
    return (
        <DashboardLayout role="user" userName="Alex">
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Account Settings</h2>
                </div>
                <div style={{ padding: "2rem" }}>
                    {/* Profile */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h4 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <User size={20} color="#06b6d4" />
                            Profile Information
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.5rem", display: "block" }}>
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Alex"
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "0.75rem",
                                        background: "rgba(0,0,0,0.4)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff"
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.5rem", display: "block" }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    defaultValue="alex@example.com"
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "0.75rem",
                                        background: "rgba(0,0,0,0.4)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff"
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h4 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Bell size={20} color="#06b6d4" />
                            Notification Preferences
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {["Email notifications", "Push notifications", "Weekly digest"].map((item) => (
                                <label key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1", cursor: "pointer" }}>
                                    <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px" }} />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <button style={{
                        padding: "0.75rem 2rem",
                        background: "linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}>
                        Save Changes
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
