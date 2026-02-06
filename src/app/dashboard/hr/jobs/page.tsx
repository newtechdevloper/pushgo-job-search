"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { Briefcase, Users, Eye, MoreVertical } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function HRJobs() {
    const jobs = [
        { id: 1, title: "Senior Developer", applicants: 24, views: 156, status: "Active", posted: "2024-02-01" },
        { id: 2, title: "Product Designer", applicants: 18, views: 98, status: "Active", posted: "2024-01-28" },
        { id: 3, title: "Marketing Manager", applicants: 31, views: 203, status: "Active", posted: "2024-01-25" },
        { id: 4, title: "Data Scientist", applicants: 12, views: 67, status: "Paused", posted: "2024-01-20" },
        { id: 5, title: "DevOps Engineer", applicants: 15, views: 89, status: "Active", posted: "2024-01-15" },
    ];

    return (
        <DashboardLayout role="hr" userName="Sarah">
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700" }}>Posted Jobs</h2>
                <Link href="/post-job">
                    <button style={{
                        padding: "0.75rem 1.5rem",
                        background: "linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}>
                        + Post New Job
                    </button>
                </Link>
            </div>

            <div className={styles.table}>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Applicants</th>
                                <th>Views</th>
                                <th>Status</th>
                                <th>Posted Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.title}</td>
                                    <td>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <Users size={16} color="#06b6d4" />
                                            {job.applicants}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <Eye size={16} color="#8b5cf6" />
                                            {job.views}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${job.status === "Active" ? styles.success : styles.warning}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td>{job.posted}</td>
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
