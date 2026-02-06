"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import styles from "@/styles/dashboard.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export default function EmployeeApplications() {
    const { user, loading: authLoading } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!user) return;
            try {
                const q = query(collection(db, "applications"), where("applicantId", "==", user.uid));
                const snapshot = await getDocs(q);
                const appsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Handle optional salary if present in job details snapshot (not storing salary in app, might need to fetch job or store it at apply time. Storing Title is good enough for now)
                    // The schema says we store jobTitle.
                    formattedDate: doc.data().appliedAt ? new Date(doc.data().appliedAt.toDate()).toLocaleDateString() : "Unknown"
                }));
                setApplications(appsData);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchApplications();
        }
    }, [user, authLoading]);

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
                {/* Note: styles.tableCard is the new class I added, styles.table was the old container. Using fallback just in case */}
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Applications</h2>
                </div>
                <div className={styles.tableWrapper || styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th> {/* Schema doesn't strictly store Company Name in Application, only Job Title. I might need to fetch it or just show Job Title for now. Wait, schema had jobTitle. I'll just skip Company column if not available or show 'N/A' */}
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
                                        <td>{app.companyName || "-"}</td> {/* Assuming I might add companyName to application later, or it's missing now */}
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
