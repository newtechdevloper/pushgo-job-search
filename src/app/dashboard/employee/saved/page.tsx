"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Bookmark, MapPin, DollarSign, Briefcase } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function EmployeeSaved() {
    const savedJobs = [
        {
            id: 1,
            title: "Machine Learning Engineer",
            company: "AI Innovations",
            location: "New York, NY",
            salary: "$180k - $250k",
            type: "Full-time",
            saved: "2 days ago"
        },
        {
            id: 2,
            title: "DevOps Engineer",
            company: "CloudScale",
            location: "Remote",
            salary: "$130k - $170k",
            type: "Full-time",
            saved: "5 days ago"
        },
        {
            id: 3,
            title: "Product Manager",
            company: "InnovateCo",
            location: "San Francisco, CA",
            salary: "$140k - $180k",
            type: "Full-time",
            saved: "1 week ago"
        },
    ];

    return (
        <DashboardLayout role="employee" userName="John">
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Saved Jobs ({savedJobs.length})</h2>
                </div>
                <div className={styles.tableContent}>
                    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {savedJobs.map((job) => (
                            <div key={job.id} style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "0.75rem",
                                padding: "1.5rem",
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                                    <div>
                                        <h3 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "700", marginBottom: "0.25rem" }}>
                                            {job.title}
                                        </h3>
                                        <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>{job.company}</p>
                                    </div>
                                    <span className={`${styles.badge} ${styles.info}`}>{job.type}</span>
                                </div>
                                <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", fontSize: "0.9rem" }}>
                                        <MapPin size={16} color="#06b6d4" />
                                        {job.location}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", fontSize: "0.9rem" }}>
                                        <DollarSign size={16} color="#06b6d4" />
                                        {job.salary}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", fontSize: "0.9rem" }}>
                                        <Bookmark size={16} color="#06b6d4" />
                                        Saved {job.saved}
                                    </span>
                                </div>
                                <button style={{
                                    padding: "0.625rem 1.25rem",
                                    background: "linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    color: "#fff",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
