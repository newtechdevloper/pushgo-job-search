"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Mail, Phone, Download, Star } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function HRApplicants() {
    const applicants = [
        { id: 1, name: "Sarah Johnson", job: "Senior Developer", email: "sarah.j@email.com", phone: "+1 555-0101", rating: 4.5, status: "Shortlisted" },
        { id: 2, name: "Mike Chen", job: "Product Designer", email: "mike.c@email.com", phone: "+1 555-0102", rating: 4.8, status: "New" },
        { id: 3, name: "Emily Davis", job: "Marketing Manager", email: "emily.d@email.com", phone: "+1 555-0103", rating: 4.2, status: "Interview" },
        { id: 4, name: "James Wilson", job: "Data Scientist", email: "james.w@email.com", phone: "+1 555-0104", rating: 4.6, status: "Reviewing" },
    ];

    const getStatusBadge = (status: string) => {
        const map: Record<string, string> = {
            "Shortlisted": "success",
            "New": "info",
            "Interview": "warning",
            "Reviewing": "info",
        };
        return map[status] || "info";
    };

    return (
        <DashboardLayout role="hr" userName="Sarah">
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                All Applicants
            </h2>

            <div className={styles.table}>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Applied For</th>
                                <th>Contact</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((applicant) => (
                                <tr key={applicant.id}>
                                    <td style={{ fontWeight: "600" }}>{applicant.name}</td>
                                    <td>{applicant.job}</td>
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.85rem" }}>
                                            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                <Mail size={14} color="#06b6d4" />
                                                {applicant.email}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                <Phone size={14} color="#8b5cf6" />
                                                {applicant.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <Star size={16} color="#fbbf24" fill="#fbbf24" />
                                            {applicant.rating}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[getStatusBadge(applicant.status)]}`}>
                                            {applicant.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button style={{
                                            padding: "0.5rem 1rem",
                                            background: "rgba(6, 182, 212, 0.2)",
                                            border: "1px solid rgba(6, 182, 212, 0.3)",
                                            borderRadius: "0.375rem",
                                            color: "#06b6d4",
                                            fontSize: "0.85rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem"
                                        }}>
                                            <Download size={14} />
                                            Resume
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
