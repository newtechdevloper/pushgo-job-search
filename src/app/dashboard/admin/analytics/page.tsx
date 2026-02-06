"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Users, Briefcase, Building2, DollarSign, TrendingUp, Activity } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function AdminAnalytics() {
    const stats = [
        { label: "Total Users", value: "2,847", change: "+127 this month", positive: true, icon: Users },
        { label: "Active Jobs", value: "342", change: "+45 this week", positive: true, icon: Briefcase },
        { label: "Companies", value: "156", change: "+12 verified", positive: true, icon: Building2 },
        { label: "Revenue", value: "$48.2k", change: "+18% this month", positive: true, icon: DollarSign },
        { label: "Growth Rate", value: "24%", change: "+3% MoM", positive: true, icon: TrendingUp },
        { label: "Active Sessions", value: "1,234", change: "Live now", positive: true, icon: Activity },
    ];

    const topCompanies = [
        { name: "TechCorp AI", jobs: 8, applicants: 156, revenue: "$2,400" },
        { name: "DesignHub", jobs: 5, applicants: 98, revenue: "$1,500" },
        { name: "DataMinds", jobs: 6, applicants: 112, revenue: "$1,800" },
    ];

    return (
        <DashboardLayout role="admin" userName="Admin">
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                Platform Analytics
            </h2>

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
                            <div className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                                {stat.change}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Top Companies */}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Top Performing Companies</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Active Jobs</th>
                                <th>Total Applicants</th>
                                <th>Revenue Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topCompanies.map((company, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: "600" }}>{company.name}</td>
                                    <td>{company.jobs}</td>
                                    <td>{company.applicants}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.success}`}>
                                            {company.revenue}
                                        </span>
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
