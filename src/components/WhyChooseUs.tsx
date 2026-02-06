"use client";

import { ShieldCheck, Rocket, Users } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
    return (
        <section className={styles.section}>
            {/* Decor */}
            <div className={styles.divider}></div>

            <div className="container">
                <div className={styles.grid}>

                    <div className="space-y-8">
                        <h2 className={styles.heading}>
                            The <span className={styles.textGradient}>Fastest Way</span> to <br /> Get Hired.
                        </h2>
                        <p className={styles.description}>
                            We've stripped away the noise. No more ghosting, no more outdated listings. Just direct connections to verified teams.
                        </p>

                        <div className={styles.list}>
                            {[
                                { icon: <Rocket />, title: "Accelerated Hiring", text: "Average time-to-hire is 7 days." },
                                { icon: <ShieldCheck />, title: "Verified Badges", text: "Skill verification via blockchain credentials." },
                                { icon: <Users />, title: "Direct Chat", text: "Speak directly with hiring managers." }
                            ].map((item, i) => (
                                <div key={i} className={styles.listItem}>
                                    <div className={styles.iconBox}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className={styles.itemTitle}>{item.title}</h4>
                                        <p className={styles.itemText}>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.testimonialWrapper}>
                        <div className={styles.glowBg}></div>
                        <div className={styles.testimonialCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.userProfile}>
                                    <div className={styles.avatar}></div>
                                    <div>
                                        <p className={styles.userName}>Sarah Jenkins</p>
                                        <p className={styles.userRole}>Product Designer</p>
                                    </div>
                                </div>
                                <span className={styles.hiredBadge}>Hired in 3 days</span>
                            </div>
                            <p className={styles.quote}>"I uploaded my portfolio and within 24 hours I had 3 interview requests from top AI startups. The process was seamless."</p>
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
