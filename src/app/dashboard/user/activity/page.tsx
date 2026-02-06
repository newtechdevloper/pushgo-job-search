"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Activity, Bookmark, Search, Eye } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function UserActivity() {
    const activities = [
        { id: 1, action: "Saved job", detail: "Senior Developer at TechCorp", icon: Bookmark, time: "2 hours ago" },
        { id: 2, action: "Updated profile", detail: "Added new skills: React, TypeScript", icon: Activity, time: "1 day ago" },
        { id: 3, action: "Created search alert", detail: "Remote React Developer jobs", icon: Search, time: "3 days ago" },
        { id: 4, action: "Viewed company", detail: "DesignHub company profile", icon: Eye, time: "5 days ago" },
        { id: 5, action: "Saved job", detail: "Product Designer at Creative Studio", icon: Bookmark, time: "1 week ago" },
    ];

    return (
        <DashboardLayout role="user" userName="Alex">
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                Activity History
            </h2>

            <div className={styles.table}>
                <div className={styles.tableContent}>
                    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {activities.map((activity) => {
                            const Icon = activity.icon;
                            return (
                                <div key={activity.id} style={{
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "0.75rem",
                                    padding: "1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem"
                                }}>
                                    <div style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "0.75rem",
                                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.25))",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <Icon size={20} color="#06b6d4" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ color: "#fff", fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                                            {activity.action}
                                        </h4>
                                        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                                            {activity.detail}
                                        </p>
                                    </div>
                                    <span style={{ color: "#64748b", fontSize: "0.85rem", flexShrink: 0 }}>
                                        {activity.time}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
