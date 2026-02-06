"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/post-job.module.css";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { createJob } from "@/lib/firestore-schema";

export default function PostJobPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Full-time");
    const [location, setLocation] = useState("");
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [category, setCategory] = useState("Development");
    const [description, setDescription] = useState("");

    // Company State
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!user) {
            setError("You must be logged in to post a job.");
            setLoading(false);
            router.push("/login?redirect=/post-job");
            return;
        }

        if (!title || !location || !description || !companyName || !companyEmail) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            // 1. Find or Create Company
            let companyId = "";
            const companiesRef = collection(db, "companies");
            const q = query(companiesRef, where("name", "==", companyName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Use existing company
                companyId = querySnapshot.docs[0].id;
            } else {
                // Create new company
                const newCompanyRef = await addDoc(companiesRef, {
                    name: companyName,
                    website: companyWebsite,
                    email: companyEmail,
                    hrUsers: [user.uid],
                    verified: false,
                    activeJobs: 1,
                    totalApplications: 0,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                companyId = newCompanyRef.id;
            }

            // 2. Create Job
            const jobData: any = {
                title,
                type: type.toLowerCase().replace(" ", "-"),
                location,
                salary: {
                    min: parseInt(salaryMin) || 0,
                    max: parseInt(salaryMax) || 0,
                    currency: "USD"
                },
                category,
                description,
                requirements: [], // Simplify for now
                company: companyName,
                companyId: companyId,
                postedBy: user.uid,
                status: "active",
                applicants: 0
            };

            await createJob(jobData);

            // 3. Redirect
            router.push("/jobs");

        } catch (err: any) {
            console.error("Error posting job:", err);
            setError("Failed to post job: " + err.message);
        } finally {
            setLoading(false);
        }
    };

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
                    {error && (
                        <div style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#ef4444",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            marginBottom: "1.5rem"
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Job Type <span className={styles.required}>*</span>
                                    </label>
                                    <select
                                        className={styles.select}
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
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
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Salary Min</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        placeholder="e.g. 120000"
                                        value={salaryMin}
                                        onChange={(e) => setSalaryMin(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Salary Max</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        placeholder="e.g. 180000"
                                        value={salaryMax}
                                        onChange={(e) => setSalaryMax(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Category <span className={styles.required}>*</span>
                                </label>
                                <select
                                    className={styles.select}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
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

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Job Description <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Describe the role, responsibilities, and unique opportunities..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
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
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
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
                                        value={companyEmail}
                                        onChange={(e) => setCompanyEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Company Website</label>
                                    <input
                                        type="url"
                                        className={styles.input}
                                        placeholder="https://company.com"
                                        value={companyWebsite}
                                        onChange={(e) => setCompanyWebsite(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className={styles.section}>
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} style={{ marginRight: "0.5rem" }} />
                                        Publishing...
                                    </>
                                ) : (
                                    "Post Job Opening"
                                )}
                            </button>

                            <p className={styles.footer}>
                                By posting, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </form>

                </div>
            </div>

            <Footer />
        </main>
    )
}
