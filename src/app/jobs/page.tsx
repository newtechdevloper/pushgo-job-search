"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_JOBS, JOB_TYPES, SALARY_RANGES } from "@/data/jobs";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import styles from "@/styles/jobs.module.css";

function JobsContent() {
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState<any[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Search Filters
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedSalary, setSelectedSalary] = useState("");

    // Load Mock Jobs
    useEffect(() => {
        // Simulate network delay
        const timer = setTimeout(() => {
            setJobs(MOCK_JOBS);
            setFilteredJobs(MOCK_JOBS);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Filter Logic (Client Side)
    useEffect(() => {
        let results = [...jobs];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(job =>
                job.title?.toLowerCase().includes(query) ||
                job.company?.toLowerCase().includes(query) ||
                job.description?.toLowerCase().includes(query)
            );
        }

        if (selectedLocation) {
            results = results.filter(job =>
                job.location?.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        if (selectedTypes.length > 0) {
            results = results.filter(job =>
                selectedTypes.some(t => t.toLowerCase() === job.type?.toLowerCase())
            );
        }

        // Salary Filter (String based for Mock Data)
        if (selectedSalary) {
            results = results.filter(job => {
                // Mock data salary format: "$150k - $200k" or "$80k"
                // Extract numbers
                const salaryStr = job.salary.toLowerCase();
                const numbers = salaryStr.match(/\d+/g);
                if (!numbers) return false;

                const minSalary = parseInt(numbers[0]) * 1000; // Assume k

                switch (selectedSalary) {
                    case "Under $50k": return minSalary < 50000;
                    case "$50k - $100k": return minSalary >= 50000 && minSalary < 100000;
                    case "$100k - $150k": return minSalary >= 100000 && minSalary < 150000;
                    case "$150k - $200k": return minSalary >= 150000 && minSalary < 200000;
                    case "Over $200k": return minSalary >= 200000;
                    default: return true;
                }
            });
        }

        setFilteredJobs(results);
    }, [jobs, searchQuery, selectedLocation, selectedTypes, selectedSalary]);

    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h1 className={styles.title}>Find Your Dream Job</h1>
                <p className={styles.subtitle}>
                    {filteredJobs.length} active roles found
                </p>
            </div>

            <div className={styles.layout}>
                {/* Filter Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Search</h3>
                        <input
                            type="text"
                            placeholder="Job title or keyword..."
                            className={styles.filterInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Location</h3>
                        <input
                            type="text"
                            placeholder="City or Remote..."
                            className={styles.filterInput}
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        />
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Job Type</h3>
                        {JOB_TYPES.map(type => (
                            <label key={type} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => handleTypeToggle(type)}
                                    className={styles.checkbox}
                                />
                                {type}
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Salary Range</h3>
                        <select
                            className={styles.filterSelect}
                            value={selectedSalary}
                            onChange={(e) => setSelectedSalary(e.target.value)}
                        >
                            <option value="">All Salaries</option>
                            {SALARY_RANGES.map(range => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className={styles.clearBtn}
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedLocation("");
                            setSelectedTypes([]);
                            setSelectedSalary("");
                        }}
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Job Listings */}
                <div className={styles.jobList}>
                    {loading ? (
                        <div className={styles.loading}>Loading jobs...</div>
                    ) : filteredJobs.length === 0 ? (
                        <div className={styles.noResults}>
                            <p>No active jobs found.</p>
                            <p>Be the first to <a href="/post-job" style={{ color: "var(--neon-cyan)" }}>post a job</a>!</p>
                        </div>
                    ) : (
                        filteredJobs.map(job => (
                            <div key={job.id} className={styles.jobCard}>
                                <div className={styles.jobHeader}>
                                    <h3 className={styles.jobTitle}>
                                        <Link href={`/jobs/${job.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {job.title}
                                        </Link>
                                    </h3>
                                    <span className={styles.jobType} style={{ textTransform: 'capitalize' }}>
                                        {job.type?.replace("-", " ")}
                                    </span>
                                </div>
                                <p className={styles.company}>{job.company}</p>
                                <p className={styles.description}>{job.description?.substring(0, 150)}...</p>
                                <div className={styles.jobMeta}>
                                    <span className={styles.metaItem}>
                                        <MapPin size={16} />
                                        {job.location}
                                    </span>
                                    <span className={styles.metaItem}>
                                        <DollarSign size={16} />
                                        {job.salary}
                                    </span>
                                    <span className={styles.metaItem}>
                                        <Clock size={16} />
                                        {job.posted}
                                    </span>
                                </div>
                                <div style={{ marginTop: '1rem' }}>
                                    <Link href={`/jobs/${job.id}`} className={styles.applyBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
                                        View Details & Apply
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default function JobsPage() {
    return (
        <main className={styles.container}>
            <Navbar />
            <Suspense fallback={<div className={styles.loading}>Loading jobs...</div>}>
                <JobsContent />
            </Suspense>
            <Footer />
        </main>
    );
}
