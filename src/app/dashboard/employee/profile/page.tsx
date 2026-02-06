"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { User, Mail, Phone, MapPin, Briefcase, Award } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

export default function EmployeeProfile() {
    return (
        <DashboardLayout role="employee" userName="John">
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>My Profile</h2>
                </div>
                <div style={{ padding: "2rem" }}>
                    {/* Profile Info */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2rem",
                                fontWeight: "700",
                                color: "#fff"
                            }}>
                                JD
                            </div>
                            <div>
                                <h3 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>
                                    John Doe
                                </h3>
                                <p style={{ color: "#94a3b8" }}>Senior Frontend Developer</p>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1" }}>
                                <Mail size={20} color="#06b6d4" />
                                <span>john.doe@example.com</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1" }}>
                                <Phone size={20} color="#06b6d4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1" }}>
                                <MapPin size={20} color="#06b6d4" />
                                <span>San Francisco, CA</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#cbd5e1" }}>
                                <Briefcase size={20} color="#06b6d4" />
                                <span>5 years experience</span>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div style={{ marginBottom: "2rem" }}>
                        <h4 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Award size={20} color="#06b6d4" />
                            Skills
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                            {["React", "TypeScript", "Next.js", "Node.js", "CSS", "JavaScript", "Git", "Figma"].map((skill) => (
                                <span key={skill} className={`${styles.badge} ${styles.info}`} style={{ fontSize: "0.9rem" }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <h4 style={{ color: "#fff", fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
                            About
                        </h4>
                        <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
                            Passionate frontend developer with 5+ years of experience building modern web applications.
                            Specialized in React, TypeScript, and Next.js. Love creating beautiful, performant user interfaces
                            and solving complex problems.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
