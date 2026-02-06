"use client";

import { motion } from "framer-motion";
import { Bot, BadgeCheck, Globe, Zap } from "lucide-react";
import styles from "./Features.module.css";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    delay: number;
}

function FeatureCard({ icon, title, desc, delay }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05 }}
            className={styles.card}
        >
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>
                {desc}
            </p>
        </motion.div>
    );
}

const features = [
    {
        icon: <Bot size={32} />,
        title: "AI Job Matching",
        desc: "Our proprietary AI analyzes your skills and matches you with roles that fit your career goals perfectly.",
    },
    {
        icon: <BadgeCheck size={32} />,
        title: "Verified Companies",
        desc: "Every company on our platform is vetted. Say goodbye to scams and ghost jobs.",
    },
    {
        icon: <Globe size={32} />,
        title: "Remote & Hybrid",
        desc: "Work from anywhere. We specialize in remote-first opportunities across the globe.",
    },
    {
        icon: <Zap size={32} />,
        title: "Fast Hiring",
        desc: "Streamlined application processes mean you get feedback in days, not weeks.",
    },
];

export default function Features() {
    return (
        <section className={styles.section}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.titleContainer}
                >
                    <h2 className={styles.title}>Why Top Talent Chooses <span className={styles.highlight}>FutureJob</span></h2>
                    <p className={styles.subtitle}>Experience the difference of a platform built for the modern workforce.</p>
                </motion.div>

                <div className={styles.grid}>
                    {features.map((f, i) => (
                        <FeatureCard key={i} {...f} delay={i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
