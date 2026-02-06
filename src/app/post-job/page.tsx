"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/post-job.module.css";
import { Check } from "lucide-react";

export default function PostJobPage() {
    return (
        <main className={styles.container}>
            <Navbar />

            <div className={styles.header}>
                <h1 className={styles.title}>Post a Job Opening</h1>
                <p className={styles.subtitle}>
                    Reach thousands of qualified candidates. Fill out the form below to get your job listing live within 24 hours.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.formCard}>

                    {/* Job Details Section */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Job Details</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Job Title <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. Senior Product Designer"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Job Type <span className={styles.required}>*</span>
                                </label>
                                <select className={styles.select}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Location <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g. San Francisco, CA or Remote"
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Salary Range</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g. $120k - $180k"
                                />
                                <p className={styles.hint}>Optional but recommended for better applications</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Category <span className={styles.required}>*</span>
                                </label>
                                <select className={styles.select}>
                                    <option>Development</option>
                                    <option>Design & Creative</option>
                                    <option>Marketing</option>
                                    <option>AI & Machine Learning</option>
                                    <option>Finance & Crypto</option>
                                    <option>Healthcare</option>
                                    <option>Product Management</option>
                                    <option>Video & Animation</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Job Description <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
                            ></textarea>
                            <p className={styles.hint}>Minimum 200 characters recommended</p>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Company Information</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Company Name <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. Acme Corp"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Company Email <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="hiring@company.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Company Website</label>
                                <input
                                    type="url"
                                    className={styles.input}
                                    placeholder="https://company.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Pricing & Publish</h2>

                        <div className={styles.pricingBox}>
                            <div className={styles.pricingTitle}>Professional Plan</div>
                            <div className={styles.pricingAmount}>$299</div>
                            <ul className={styles.pricingFeatures}>
                                <li><Check size={16} className={styles.checkIcon} /> 60-day job listing</li>
                                <li><Check size={16} className={styles.checkIcon} /> Featured placement on homepage</li>
                                <li><Check size={16} className={styles.checkIcon} /> Social media promotion</li>
                                <li><Check size={16} className={styles.checkIcon} /> Advanced applicant tracking</li>
                            </ul>
                        </div>

                        <button className={styles.submitBtn}>
                            Continue to Payment
                        </button>

                        <p className={styles.footer}>
                            By posting, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    )
}
