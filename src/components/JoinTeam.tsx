"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./JoinTeam.module.css";
import Link from "next/link";

const OPEN_ROLES = [
    { title: "Senior React Engineer", type: "Remote", dept: "Engineering" },
    { title: "Product Marketing Manager", type: "Hybrid", dept: "Marketing" },
    { title: "Customer Success Lead", type: "London", dept: "Operations" },
];

export default function JoinTeam() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.glow}></div>

                <div className={styles.content}>
                    <div className="flex justify-center mb-4">
                        <span className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/20 flex items-center gap-2">
                            <Sparkles size={14} /> We are Hiring!
                        </span>
                    </div>

                    <h2 className={styles.title}>Join the PushGo Team</h2>
                    <p className={styles.description}>
                        We are building the future of recruitment. Come join a team of passionate builders, designers, and dreamers.
                    </p>

                    <div className={styles.grid}>
                        {OPEN_ROLES.map((role, i) => (
                            <div key={i} className={styles.card}>
                                <h3 className={styles.roleTitle}>{role.title}</h3>
                                <div className={styles.roleMeta}>{role.dept} • {role.type}</div>
                            </div>
                        ))}
                    </div>

                    <Link href="/companies">
                        <button className={styles.applyBtn}>View Internal Careers</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
