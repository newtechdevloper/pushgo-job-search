"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, Users, TrendingUp, DollarSign } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function HRDashboard() {
    const stats = [
        { label: "Active Jobs", value: "8", change: "+2 this month", positive: true, icon: Briefcase },
        { label: "Total Applicants", value: "156", change: "+24 this week", positive: true, icon: Users },
        { label: "Interviews Scheduled", value: "12", change: "5 this week", positive: true, icon: TrendingUp },
        { label: "Avg. Time to Hire", value: "18d", change: "-3 days", positive: true, icon: DollarSign },
    ];

    const recentApplicants = [
        { id: 1, name: "Sarah Johnson", job: "Senior Developer", status: "Shortlisted", date: "1 hour ago" },
        { id: 2, name: "Mike Chen", job: "Product Designer", status: "New", date: "3 hours ago" },
        { id: 3, name: "Emily Davis", job: "Marketing Manager", status: "Interview", date: "5 hours ago" },
        { id: 4, name: "James Wilson", job: "Data Scientist", status: "Reviewing", date: "1 day ago" },
    ];

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, string> = {
            "Shortlisted": "success",
            "New": "info",
            "Interview": "warning",
            "Reviewing": "info",
        };
        return statusMap[status] || "info";
    };

    return (
        <DashboardLayout role="hr" userName="Sarah">
            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <div>
                                    <div className={styles.statValue}>{stat.value}</div>
                                    <div className={styles.statLabel}>{stat.label}</div>
                                </div>
                                <div className={styles.statIcon}>
                                    <Icon size={24} color="#8b5cf6" />
                                </div>
                            </div>
                            <div className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                                {stat.change}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Applicants */}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Recent Applicants</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplicants.map((applicant) => (
                                <tr key={applicant.id}>
                                    <td>{applicant.name}</td>
                                    <td>{applicant.job}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[getStatusBadge(applicant.status)]}`}>
                                            {applicant.status}
                                        </span>
                                    </td>
                                    <td>{applicant.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
