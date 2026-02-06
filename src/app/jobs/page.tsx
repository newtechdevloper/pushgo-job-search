"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_JOBS, JOB_TYPES, SALARY_RANGES } from "@/data/jobs";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import styles from "@/styles/jobs.module.css";

function JobsContent() {
    const searchParams = useSearchParams();
    const [filteredJobs, setFilteredJobs] = useState(MOCK_JOBS);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedSalary, setSelectedSalary] = useState("");

    useEffect(() => {
        let results = [...MOCK_JOBS];

        // Filter by search query
        if (searchQuery) {
            results = results.filter(job =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by location
        if (selectedLocation) {
            results = results.filter(job =>
                job.location.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        // Filter by job types
        if (selectedTypes.length > 0) {
            results = results.filter(job => selectedTypes.includes(job.type));
        }

        // Filter by salary range
        if (selectedSalary) {
            results = results.filter(job => {
                const salary = job.salary.toLowerCase();
                switch (selectedSalary) {
                    case "Under $50k":
                        return salary.includes("40k") || salary.includes("30k");
                    case "$50k - $100k":
                        return salary.includes("50k") || salary.includes("60k") ||
                            salary.includes("70k") || salary.includes("80k") ||
                            salary.includes("90k") || salary.includes("100k");
                    case "$100k - $150k":
                        return salary.includes("100k") || salary.includes("110k") ||
                            salary.includes("120k") || salary.includes("130k") ||
                            salary.includes("140k");
                    case "$150k - $200k":
                        return salary.includes("150k") || salary.includes("160k") ||
                            salary.includes("170k") || salary.includes("180k") ||
                            salary.includes("190k") || salary.includes("200k");
                    case "Over $200k":
                        return salary.includes("200k") || salary.includes("220k") ||
                            salary.includes("250k") || salary.includes("300k");
                    default:
                        return true;
                }
            });
        }

        setFilteredJobs(results);
    }, [searchQuery, selectedLocation, selectedTypes, selectedSalary]);

    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    return (
        <>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Find Your Dream Job</h1>
                    <p className={styles.subtitle}>
                        {filteredJobs.length} jobs found
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
                        {filteredJobs.length === 0 ? (
                            <div className={styles.noResults}>
                                <p>No jobs found matching your criteria.</p>
                                <p>Try adjusting your filters.</p>
                            </div>
                        ) : (
                            filteredJobs.map(job => (
                                <div key={job.id} className={styles.jobCard}>
                                    <div className={styles.jobHeader}>
                                        <h3 className={styles.jobTitle}>{job.title}</h3>
                                        <span className={styles.jobType}>{job.type}</span>
                                    </div>
                                    <p className={styles.company}>{job.company}</p>
                                    <p className={styles.description}>{job.description}</p>
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
                                    <button className={styles.applyBtn}>Apply Now</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
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
