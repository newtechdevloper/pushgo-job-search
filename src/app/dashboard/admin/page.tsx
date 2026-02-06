"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Building2, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

export default function AdminDashboard() {
    return (
        <ProtectedRoute requiredRole="admin">
            <DashboardLayout role="admin" userName="Admin">
                <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    Admin Dashboard
                </h2>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Users size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>1,234</div>
                            <div className={styles.statLabel}>Total Users</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Building2 size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>89</div>
                            <div className={styles.statLabel}>Companies</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>456</div>
                            <div className={styles.statLabel}>Active Jobs</div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Shield size={24} />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statValue}>12</div>
                            <div className={styles.statLabel}>Admins</div>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
                        Quick Actions
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <Link href="/dashboard/admin/users" className={styles.actionCard}>
                            <Users size={20} />
                            Manage Users
                        </Link>
                        <Link href="/dashboard/admin/companies" className={styles.actionCard}>
                            <Building2 size={20} />
                            Manage Companies
                        </Link>
                        <Link href="/dashboard/admin/analytics" className={styles.actionCard}>
                            <TrendingUp size={20} />
                            View Analytics
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
