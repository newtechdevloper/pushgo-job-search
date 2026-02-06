"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/jobs.module.css";
import { MapPin, Clock, DollarSign } from "lucide-react";

const MOCK_JOBS = [
    {
        id: 1,
        title: "Senior Full Stack Engineer",
        company: "TechFlow AI",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$140k - $220k",
        tags: ["React", "Node.js", "TypeScript"]
    },
    {
        id: 2,
        title: "Product Designer",
        company: "Creative Os",
        location: "Remote",
        type: "Contract",
        salary: "$100k - $150k",
        tags: ["Figma", "UI/UX", "Motion"]
    },
    {
        id: 3,
        title: "Machine Learning Engineer",
        company: "DataMinds",
        location: "New York, NY",
        type: "Full-time",
        salary: "$180k - $260k",
        tags: ["Python", "PyTorch", "AWS"]
    },
    {
        id: 4,
        title: "Frontend Developer",
        company: "WebScale",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$110k - $160k",
        tags: ["Next.js", "Tailwind", "CSS"]
    },
];

export default function JobsPage() {
    return (
        <main className={styles.container}>
            <Navbar />

            <div className={styles.header}>
                <h1 className={styles.title}>Find Your Next Role</h1>
                <p className={styles.subtitle}>
                    Discover opportunities at top tier tech companies and startups.
                </p>
            </div>

            <div className={styles.grid}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterTitle}>Job Type</span>
                        <label className={styles.checkbox}>
                            <input type="checkbox" defaultChecked /> Full-time
                        </label>
                        <label className={styles.checkbox}>
                            <input type="checkbox" /> Contract
                        </label>
                        <label className={styles.checkbox}>
                            <input type="checkbox" /> Remote
                        </label>
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterTitle}>Salary Range</span>
                        <label className={styles.checkbox}>
                            <input type="checkbox" /> $50k - $100k
                        </label>
                        <label className={styles.checkbox}>
                            <input type="checkbox" defaultChecked /> $100k - $150k
                        </label>
                        <label className={styles.checkbox}>
                            <input type="checkbox" /> $150k+
                        </label>
                    </div>
                </aside>

                {/* Job List */}
                <div className={styles.jobsList}>
                    {MOCK_JOBS.map((job) => (
                        <div key={job.id} className={styles.jobCard}>
                            <div className={styles.jobInfo}>
                                <span className={styles.companyName}>{job.company}</span>
                                <h3>{job.title}</h3>
                                <div className="flex gap-4 text-gray-400 text-sm mt-2 mb-3">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                    <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                                </div>
                                <div className={styles.tags}>
                                    {job.tags.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <button className={styles.applyBtn}>Apply</button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
