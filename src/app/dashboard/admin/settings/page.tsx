"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Settings as SettingsIcon, Shield, Database } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function AdminSettings() {
    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Platform Settings</h2>
                </div>
                <div style={{ padding: "2rem" }}>
                    {/* System Settings */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h4 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <SettingsIcon size={20} color="#06b6d4" />
                            System Configuration
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {["Enable user registration", "Auto-verify companies", "Allow job posting without approval"].map((item) => (
                                <label key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1", cursor: "pointer" }}>
                                    <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px" }} />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h4 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Shield size={20} color="#06b6d4" />
                            Security Settings
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {["Two-factor authentication", "Email verification required", "IP whitelist enabled"].map((item) => (
                                <label key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1", cursor: "pointer" }}>
                                    <input type="checkbox" defaultChecked={item !== "IP whitelist enabled"} style={{ width: "18px", height: "18px" }} />
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
