"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, PenTool, TrendingUp, Cpu, Landmark, HeartHandshake, Box, Video } from "lucide-react";
import styles from "./JobCategories.module.css";

const categories = [
    { name: "Development", icon: <Code />, jobs: 1240 },
    { name: "Design & Creative", icon: <PenTool />, jobs: 850 },
    { name: "Marketing", icon: <TrendingUp />, jobs: 600 },
    { name: "AI & Machine Learning", icon: <Cpu />, jobs: 2100 },
    { name: "Finance & Crypto", icon: <Landmark />, jobs: 430 },
    { name: "Healthcare", icon: <HeartHandshake />, jobs: 900 },
    { name: "Product Management", icon: <Box />, jobs: 320 },
    { name: "Video & Animation", icon: <Video />, jobs: 280 },
];

export default function JobCategories() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>Explore Categories</h2>
                        <p className={styles.subtitle}>Find opportunities by industry</p>
                    </div>
                    <button className={styles.viewAllBtn}>View all categories &rarr;</button>
                </div>

                <div className={styles.grid}>
                    {categories.map((cat, i) => {
                        const slug = cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
                        return (
                            <Link href={`/jobs/category/${slug}`} key={i} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className={styles.card}
                                >
                                    <div className={styles.icon}>
                                        {cat.icon}
                                    </div>
                                    <h3 className={styles.cardName}>{cat.name}</h3>
                                    <span className={styles.jobCount}>{cat.jobs}+ Jobs</span>
                                </motion.div>
                            </Link>
                        )
                    })}
                </div>

                <div className={styles.mobileBtnContainer}>
                    <button className={styles.mobileViewAllBtn}>View all categories &rarr;</button>
                </div>
            </div>
        </section>
    );
}
