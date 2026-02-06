"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import { Activity, Bell, Settings, User } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function UserDashboard() {
    return (
        <ProtectedRoute requiredRole="user">
            <DashboardLayout role="user" userName="User">
                <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    User Dashboard
                </h2>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Activity size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>24</div>
                            <div className={styles.statLabel}>Activities</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Bell size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>5</div>
                            <div className={styles.statLabel}>Notifications</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <User size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>100%</div>
                            <div className={styles.statLabel}>Profile Complete</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Settings size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>3</div>
                            <div className={styles.statLabel}>Settings</div>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
                        Quick Actions
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <Link href="/dashboard/user/activity" className={styles.actionCard}>
                            <Activity size={20} />
                            View Activity
                        </Link>
                        <Link href="/dashboard/user/settings" className={styles.actionCard}>
                            <Settings size={20} />
                            Settings
                        </Link>
                        <Link href="/jobs" className={styles.actionCard}>
                            <User size={20} />
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
