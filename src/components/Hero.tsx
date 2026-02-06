"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.heroSection}>
            {/* Background Decor */}
            <div className={styles.heroBackground}>
                <div className={styles.blobPurple} />
                <div className={styles.blobCyan} />
            </div>

            <div className={styles.heroContent}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.badge}
                >
                    <Sparkles size={16} />
                    <span>PushGo -  Job Search</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={styles.heading}
                >
                    Find Your <span className={styles.textGradient}>Dream Job</span> with <br className="hidden md:block" /> AI Intelligence
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.subText}
                >
                    PushGo uses AI to match you with opportunities that align with your skills and career goals. Smart recommendations, instant insights.
                </motion.p>

                {/* Search Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={styles.searchContainer}
                >
                    <div className={styles.searchInputWrapper}>
                        <Search className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Job title, keywords..."
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.searchInputWrapper}>
                        <MapPin className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Location or 'Remote'"
                            className={styles.searchInput}
                        />
                    </div>

                    <button className={styles.searchBtn}>
                        <span>Search</span>
                        <ArrowRight size={18} />
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className={styles.stats}
                >
                    <div className={styles.statItem}>
                        <div className={styles.dot} style={{ background: "var(--neon-cyan)" }}></div>
                        12,000+ Active Jobs
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.dot} style={{ background: "var(--neon-purple)" }}></div>
                        Used by Top Startups
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.dot} style={{ background: "#22c55e" }}></div>
                        Verified Recruiters
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
