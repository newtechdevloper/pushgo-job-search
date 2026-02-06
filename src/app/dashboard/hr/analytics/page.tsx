"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function HRAnalytics() {
    const stats = [
        { label: "Total Applicants", value: "156", change: "+24 this week", positive: true, icon: Users },
        { label: "Avg. Time to Hire", value: "18d", change: "-3 days", positive: true, icon: Clock },
        { label: "Interview Rate", value: "32%", change: "+5%", positive: true, icon: TrendingUp },
        { label: "Offer Acceptance", value: "85%", change: "+2%", positive: true, icon: CheckCircle },
    ];

    const topJobs = [
        { title: "Senior Developer", applicants: 24, interviews: 8, hires: 2 },
        { title: "Product Designer", applicants: 18, interviews: 6, hires: 1 },
        { title: "Marketing Manager", applicants: 31, interviews: 10, hires: 3 },
    ];

    return (
        <DashboardLayout role="hr" userName="Sarah">
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                Hiring Analytics
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

            {/* Top Performing Jobs */}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Top Performing Jobs</h2>
                </div>
                <div className={styles.tableContent}>
                    <table className={styles.tableElement}>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Applicants</th>
                                <th>Interviews</th>
                                <th>Hires</th>
                                <th>Conversion Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topJobs.map((job, index) => {
                                const conversionRate = ((job.hires / job.applicants) * 100).toFixed(1);
                                return (
                                    <tr key={index}>
                                        <td>{job.title}</td>
                                        <td>{job.applicants}</td>
                                        <td>{job.interviews}</td>
                                        <td>{job.hires}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles.success}`}>
                                                {conversionRate}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
