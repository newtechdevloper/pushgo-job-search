"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import styles from "@/styles/dashboard.module.css";
import { useAuth } from "@/contexts/AuthContext";

// Static mock data for applications
const MOCK_APPLICATIONS = [
    { id: "1", jobTitle: "Senior Full Stack Developer", companyName: "TechCorp AI", status: "interview", appliedAt: "2023-11-15T10:00:00Z", formattedDate: "11/15/2023", jobId: "1" },
    { id: "2", jobTitle: "Product Designer", companyName: "DesignHub", status: "applied", appliedAt: "2023-11-20T14:30:00Z", formattedDate: "11/20/2023", jobId: "2" },
    { id: "3", jobTitle: "Machine Learning Engineer", companyName: "AI Innovations", status: "rejected", appliedAt: "2023-11-10T09:15:00Z", formattedDate: "11/10/2023", jobId: "3" },
    { id: "4", jobTitle: "Frontend Developer", companyName: "WebFlow Inc", status: "reviewing", appliedAt: "2023-11-18T16:45:00Z", formattedDate: "11/18/2023", jobId: "5" },
];

export default function EmployeeApplications() {
    const { user, loading: authLoading } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch delay
        const timer = setTimeout(() => {
            setApplications(MOCK_APPLICATIONS);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, string> = {
            "interview": "success",
            "applied": "info",
            "reviewing": "warning",
            "rejected": "error",
            "accepted": "success"
        };
        // Normalize status to lowercase for matching
        return statusMap[status.toLowerCase()] || "info";
    };

    // Calculate Stats
    const stats = [
        { label: "Total Applications", value: applications.length, icon: Briefcase },
        { label: "Interviews", value: applications.filter(a => a.status === "interview").length, icon: Calendar },
        { label: "In Review", value: applications.filter(a => a.status === "reviewing").length, icon: CheckCircle },
        { label: "Rejected", value: applications.filter(a => a.status === "rejected").length, icon: XCircle },
    ];

    if (loading || authLoading) {
        return (
            <DashboardLayout role="employee" userName={user?.displayName || "User"}>
                <div style={{ padding: "2rem", color: "#94a3b8" }}>Loading applications...</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout role="employee" userName={user?.displayName || "User"}>
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
            <div className={styles.tableCard || styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Applications</h2>
                </div>
                <div className={styles.tableWrapper || styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Applied Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                                        No applications yet. <a href="/jobs" style={{ color: "var(--neon-cyan)" }}>Apply to jobs</a>
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app.id}>
                                        <td>{app.jobTitle}</td>
                                        <td>{app.companyName || "-"}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[getStatusBadge(app.status)]}`}>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>{app.formattedDate}</td>
                                        <td>
                                            <a href={`/jobs/${app.jobId}`} style={{ color: "#94a3b8", fontSize: "0.85rem" }}>View Job</a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
