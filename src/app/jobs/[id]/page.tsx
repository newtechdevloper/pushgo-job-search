"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/jobs.module.css";
import { MapPin, DollarSign, Clock, Building, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { MOCK_JOBS } from "@/data/jobs";

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const jobId = params.id as string;

    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle");

    // Application Form State
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeLink, setResumeLink] = useState("");
    const [showApplyForm, setShowApplyForm] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            // Find job from MOCK_JOBS
            const foundJob = MOCK_JOBS.find(j => j.id.toString() === jobId);

            if (foundJob) {
                // Determine salary display (since mock data is string, use it directly)
                setJob({
                    ...foundJob,
                    salaryDisplay: foundJob.salary,
                    postedAt: new Date(), // Mock date
                    requirements: ["Experience with React", "Knowledge of TypeScript", "Team player", "Good communication skills"] // Mock requirements
                });
            } else {
                setJob(null);
            }
            setLoading(false);
        };

        if (jobId) {
            fetchJob();
        }
    }, [jobId]);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setApplying(true);

        // Mock Apply Process
        setTimeout(() => {
            setApplicationStatus("success");
            setShowApplyForm(false);
            setApplying(false);
        }, 1500);
    };

    if (loading) {
        return (
            <main className={styles.container}>
                <Navbar />
                <div className={styles.loading}>Loading job details...</div>
                <Footer />
            </main>
        );
    }

    if (!job) {
        return (
            <main className={styles.container}>
                <Navbar />
                <div className={styles.errorState}>
                    <h2>Job Not Found</h2>
                    <p>The job posting you are looking for may have been removed or does not exist.</p>
                    <Link href="/jobs" className={styles.backLink}>Browse Jobs</Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <Navbar />

            <div className={styles.detailsContent}>
                <Link href="/jobs" className={styles.backLinkWrapper}>
                    <ArrowLeft size={16} /> Back to Jobs
                </Link>

                <div className={styles.detailsHeader}>
                    <div>
                        <h1 className={styles.detailsTitle}>{job.title}</h1>
                        <div className={styles.detailsMeta}>
                            <span className={styles.jobType}>{job.type}</span>
                            <span className={styles.metaDivider}>•</span>
                            <span>{job.category}</span>
                        </div>
                    </div>

                    {!showApplyForm && applicationStatus !== "success" && (
                        <button
                            className={styles.applyBtnPrimary}
                            onClick={() => setShowApplyForm(true)}
                        >
                            Apply for this Job
                        </button>
                    )}
                </div>

                <div className={styles.detailsGrid}>
                    <div className={styles.detailsMain}>
                        {/* Application Success Message */}
                        {applicationStatus === "success" && (
                            <div className={styles.successMessage}>
                                <CheckCircle size={24} color="#10b981" />
                                <div>
                                    <h3>Application Sent!</h3>
                                    <p>Your application for {job.title} has been submitted successfully.</p>
                                </div>
                            </div>
                        )}

                        {/* Application Form */}
                        {showApplyForm && (
                            <div className={styles.applyFormCard}>
                                <h3>Apply for {job.title}</h3>
                                <form onSubmit={handleApply}>
                                    <div className={styles.formGroup}>
                                        <label>Resume / Portfolio Link</label>
                                        <input
                                            type="url"
                                            placeholder="https://linkedin.com/in/you"
                                            value={resumeLink}
                                            onChange={e => setResumeLink(e.target.value)}
                                            required
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Cover Letter</label>
                                        <textarea
                                            placeholder="Why are you a good fit?"
                                            value={coverLetter}
                                            onChange={e => setCoverLetter(e.target.value)}
                                            rows={5}
                                            className={styles.textarea}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className={styles.formActions}>
                                        <button
                                            type="button"
                                            className={styles.cancelBtn}
                                            onClick={() => setShowApplyForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={styles.submitApplyBtn}
                                            disabled={applying}
                                        >
                                            {applying ? "Sending..." : "Submit Application"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className={styles.section}>
                            <h2>Job Description</h2>
                            <p className={styles.descriptionText}>{job.description}</p>
                        </div>

                        {job.requirements && job.requirements.length > 0 && (
                            <div className={styles.section}>
                                <h2>Requirements</h2>
                                <ul className={styles.requirementsList}>
                                    {job.requirements.map((req: string, i: number) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className={styles.detailsSidebar}>
                        <div className={styles.sidebarCard}>
                            <h3>Job Overview</h3>
                            <div className={styles.overviewItem}>
                                <Building size={20} className={styles.icon} />
                                <div>
                                    <label>Company</label>
                                    <p>{job.company}</p>
                                </div>
                            </div>
                            <div className={styles.overviewItem}>
                                <MapPin size={20} className={styles.icon} />
                                <div>
                                    <label>Location</label>
                                    <p>{job.location}</p>
                                </div>
                            </div>
                            <div className={styles.overviewItem}>
                                <DollarSign size={20} className={styles.icon} />
                                <div>
                                    <label>Salary</label>
                                    <p>{job.salaryDisplay}</p>
                                </div>
                            </div>
                            <div className={styles.overviewItem}>
                                <Clock size={20} className={styles.icon} />
                                <div>
                                    <label>Posted Date</label>
                                    <p>{job.posted}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
