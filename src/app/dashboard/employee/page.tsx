"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, Bookmark, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function EmployeeDashboard() {
    return (
        <ProtectedRoute requiredRole="employee">
            <DashboardLayout role="employee" userName="Employee">
                <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    Employee Dashboard
                </h2>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Briefcase size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>12</div>
                            <div className={styles.statLabel}>Applications</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Bookmark size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>8</div>
                            <div className={styles.statLabel}>Saved Jobs</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>3</div>
                            <div className={styles.statLabel}>Interviews</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Clock size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>5</div>
                            <div className={styles.statLabel}>Pending</div>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
                        Quick Actions
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <Link href="/dashboard/employee/applications" className={styles.actionCard}>
                            <Briefcase size={20} />
                            View Applications
                        </Link>
                        <Link href="/dashboard/employee/saved" className={styles.actionCard}>
                            <Bookmark size={20} />
                            Saved Jobs
                        </Link>
                        <Link href="/jobs" className={styles.actionCard}>
                            <TrendingUp size={20} />
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
