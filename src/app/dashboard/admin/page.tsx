"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Users, Briefcase, Building2, DollarSign } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Users", value: "2,847", change: "+127 this month", positive: true, icon: Users },
        { label: "Active Jobs", value: "342", change: "+45 this week", positive: true, icon: Briefcase },
        { label: "Companies", value: "156", change: "+12 verified", positive: true, icon: Building2 },
        { label: "Revenue", value: "$48.2k", change: "+18% this month", positive: true, icon: DollarSign },
    ];

    const recentActivity = [
        { id: 1, action: "New company registered", entity: "TechCorp AI", type: "Company", time: "10 min ago" },
        { id: 2, action: "Job post approved", entity: "Senior Developer", type: "Job", time: "1 hour ago" },
        { id: 3, action: "User verification", entity: "john@example.com", type: "User", time: "2 hours ago" },
        { id: 4, action: "Subscription upgraded", entity: "DesignHub", type: "Billing", time: "5 hours ago" },
    ];

    const getTypeBadge = (type: string) => {
        const typeMap: Record<string, string> = {
            "Company": "success",
            "Job": "info",
            "User": "warning",
            "Billing": "success",
        };
        return typeMap[type] || "info";
    };

    return (
        <DashboardLayout role="admin" userName="Admin">
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

            {/* Recent Activity */}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Recent Platform Activity</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Entity</th>
                                <th>Type</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.action}</td>
                                    <td>{activity.entity}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[getTypeBadge(activity.type)]}`}>
                                            {activity.type}
                                        </span>
                                    </td>
                                    <td>{activity.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
