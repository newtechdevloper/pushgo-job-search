"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import { Briefcase, Users, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function HRDashboard() {
    return (
        <ProtectedRoute requiredRole="hr">
            <DashboardLayout role="hr" userName="HR Manager">
                <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    HR Dashboard
                </h2>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Briefcase size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>15</div>
                            <div className={styles.statLabel}>Active Jobs</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Users size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>234</div>
                            <div className={styles.statLabel}>Applicants</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>45</div>
                            <div className={styles.statLabel}>Shortlisted</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <DollarSign size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>8</div>
                            <div className={styles.statLabel}>Hired</div>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
                        Quick Actions
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <Link href="/post-job" className={styles.actionCard}>
                            <Briefcase size={20} />
                            Post New Job
                        </Link>
                        <Link href="/dashboard/hr/applicants" className={styles.actionCard}>
                            <Users size={20} />
                            View Applicants
                        </Link>
                        <Link href="/dashboard/hr/analytics" className={styles.actionCard}>
                            <TrendingUp size={20} />
                            View Analytics
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
