"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

export default function CTA() {
    return (
        <section className={styles.ctaSection}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={styles.ctaCard}
                >
                    <div className={styles.ctaBgGlow}></div>
                    <div className={styles.ctaBlurCircle}></div>

                    <h2 className={styles.ctaTitle}>Start Your Career Journey Today</h2>
                    <p className={styles.ctaText}>
                        Join the community of 50,000+ professionals building the future.
                    </p>

                    <div className={styles.ctaButtons}>
                        <Link href="/jobs">
                            <button className={styles.ctaPrimaryBtn}>
                                Browse Jobs <ArrowRight size={20} />
                            </button>
                        </Link>
                        <Link href="/post-job">
                            <button className={styles.ctaSecondaryBtn}>
                                Post a Open Role
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
