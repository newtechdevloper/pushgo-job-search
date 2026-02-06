"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/category.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data generator based on category
const getJobs = (category: string) => {
    const catName = category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        title: `${catName} ${i % 2 === 0 ? "Senior" : "Junior"} Specialist`,
        company: `FutureTech ${String.fromCharCode(65 + i)}`,
        location: i % 3 === 0 ? "Remote" : "San Francisco, CA",
        salary: "$120k - $180k",
        type: "Full-time"
    }));
};

export default function CategoryPage() {
    const params = useParams();
    const category = typeof params?.category === "string" ? params.category : "jobs";
    const formattedTitle = category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const jobs = getJobs(category);

    return (
        <main className={styles.container}>
            <Navbar />

            <div className={styles.header}>
                <div className={styles.breadcrumbs}>
                    <Link href="/" className={styles.breadcrumbLink}>Home</Link> / <Link href="/jobs" className={styles.breadcrumbLink}>Jobs</Link> / {formattedTitle}
                </div>
                <h1 className={styles.title}>{formattedTitle} Jobs</h1>
                <p style={{ color: "#94a3b8" }}>Found {jobs.length} open positions in {formattedTitle}</p>
            </div>

            <div className={styles.grid}>
                {jobs.map((job) => (
                    <div key={job.id} className={styles.jobCard}>
                        <span className={styles.company}>{job.company}</span>
                        <h3 className={styles.jobTitle}>{job.title}</h3>
                        <div className={styles.details}>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.salary}</span>
                        </div>
                        <button className={styles.applyBtn}>Apply Now</button>
                    </div>
                ))}
            </div>

            <Footer />
        </main>
    );
}
