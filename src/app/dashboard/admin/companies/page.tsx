"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Building2, CheckCircle, Clock, MoreVertical } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function AdminCompanies() {
    const companies = [
        { id: 1, name: "TechCorp AI", jobs: 8, verified: true, joined: "2024-01-05" },
        { id: 2, name: "DesignHub", jobs: 5, verified: true, joined: "2024-01-12" },
        { id: 3, name: "StartupXYZ", jobs: 3, verified: false, joined: "2024-02-01" },
        { id: 4, name: "DataMinds", jobs: 6, verified: true, joined: "2023-12-20" },
    ];

    return (
        <DashboardLayout role="admin" userName="Admin">
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                Company Management
            </h2>

            <div className={styles.table}>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Active Jobs</th>
                                <th>Verification</th>
                                <th>Joined Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr key={company.id}>
                                    <td>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "600" }}>
                                            <Building2 size={16} color="#06b6d4" />
                                            {company.name}
                                        </span>
                                    </td>
                                    <td>{company.jobs} jobs</td>
                                    <td>
                                        {company.verified ? (
                                            <span className={`${styles.badge} ${styles.success}`}>
                                                <CheckCircle size={14} style={{ marginRight: "0.25rem" }} />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className={`${styles.badge} ${styles.warning}`}>
                                                <Clock size={14} style={{ marginRight: "0.25rem" }} />
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td>{company.joined}</td>
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
