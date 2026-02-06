"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Activity, Bookmark, Bell, User } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function UserDashboard() {
    const stats = [
        { label: "Profile Completion", value: "85%", change: "Complete your profile", positive: true, icon: User },
        { label: "Saved Searches", value: "5", change: "2 new matches", positive: true, icon: Bookmark },
        { label: "Notifications", value: "12", change: "3 unread", positive: true, icon: Bell },
        { label: "Account Age", value: "6mo", change: "Member since Jan", positive: true, icon: Activity },
    ];

    const recentActivity = [
        { id: 1, action: "Saved job", detail: "Senior Developer at TechCorp", time: "2 hours ago" },
        { id: 2, action: "Updated profile", detail: "Added new skills", time: "1 day ago" },
        { id: 3, action: "Created search alert", detail: "Remote React jobs", time: "3 days ago" },
        { id: 4, action: "Viewed company", detail: "DesignHub profile", time: "1 week ago" },
    ];

    return (
        <DashboardLayout role="user" userName="Alex">
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
                                    <Icon size={24} color="#8b5cf6" />
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
                    <h2 className={styles.tableTitle}>Your Recent Activity</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Details</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.action}</td>
                                    <td>{activity.detail}</td>
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
