"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function EmployeeApplications() {
    const applications = [
        {
            id: 1,
            job: "Senior Frontend Developer",
            company: "TechCorp AI",
            status: "Interview",
            date: "2024-02-04",
            salary: "$150k - $200k",
            location: "San Francisco, CA"
        },
        {
            id: 2,
            job: "Product Designer",
            company: "DesignHub",
            status: "Applied",
            date: "2024-02-01",
            salary: "$120k - $160k",
            location: "Remote"
        },
        {
            id: 3,
            job: "Full Stack Engineer",
            company: "StartupXYZ",
            status: "Reviewing",
            date: "2024-01-30",
            salary: "$130k - $170k",
            location: "New York, NY"
        },
        {
            id: 4,
            job: "UI/UX Designer",
            company: "Creative Studio",
            status: "Rejected",
            date: "2024-01-25",
            salary: "$100k - $140k",
            location: "Chicago, IL"
        },
        {
            id: 5,
            job: "React Developer",
            company: "WebFlow Inc",
            status: "Interview",
            date: "2024-01-28",
            salary: "$120k - $150k",
            location: "Remote"
        },
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

    const stats = [
        { label: "Total Applications", value: "12", icon: Briefcase },
        { label: "Interviews", value: "3", icon: Calendar },
        { label: "In Review", value: "5", icon: CheckCircle },
        { label: "Rejected", value: "4", icon: XCircle },
    ];

    return (
        <DashboardLayout role="employee" userName="John">
            {/* Stats */}
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
                        </div>
                    );
                })}
            </div>

            {/* Applications Table */}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Applications</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Applied Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.job}</td>
                                    <td>{app.company}</td>
                                    <td>{app.location}</td>
                                    <td>{app.salary}</td>
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
