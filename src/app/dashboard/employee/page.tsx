"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, BookmarkCheck, TrendingUp, Clock } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function EmployeeDashboard() {
    const stats = [
        { label: "Applied Jobs", value: "12", change: "+3 this week", positive: true, icon: Briefcase },
        { label: "Saved Jobs", value: "8", change: "2 new matches", positive: true, icon: BookmarkCheck },
        { label: "Interviews", value: "3", change: "1 upcoming", positive: true, icon: TrendingUp },
        { label: "Profile Views", value: "45", change: "+12 this week", positive: true, icon: Clock },
    ];

    const applications = [
        { id: 1, job: "Senior Frontend Developer", company: "TechCorp", status: "Interview", date: "2 days ago" },
        { id: 2, job: "Product Designer", company: "DesignHub", status: "Applied", date: "5 days ago" },
        { id: 3, job: "Full Stack Engineer", company: "StartupXYZ", status: "Reviewing", date: "1 week ago" },
        { id: 4, job: "UI/UX Designer", company: "Creative Studio", status: "Rejected", date: "2 weeks ago" },
    ];

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, string> = {
            "Interview": "success",
            "Applied": "info",
            "Reviewing": "warning",
            "Rejected": "error",
        };
        return statusMap[status] || "info";
    };

    return (
        <DashboardLayout role="employee" userName="John">
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
                                    <Icon size={24} color="#06b6d4" />
                                </div>
                            </div>
                            <div className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                                {stat.change}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Applications */}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Recent Applications</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.job}</td>
                                    <td>{app.company}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[getStatusBadge(app.status)]}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>{app.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
