"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/companies.module.css";

const COMPANIES = [
    { name: "TechFlow AI", industry: "Artificial Intelligence", desc: "Building the next generation of autonomous agents for enterprise." },
    { name: "Creative Os", industry: "Design Tools", desc: "Collaborative design platform for remote teams." },
    { name: "DataMinds", industry: "Big Data", desc: "Processing petabytes of data for cleaner insights." },
    { name: "WebScale", industry: "Cloud Infrastructure", desc: "Serverless scaling solutions for startups." },
    { name: "BlockChainX", industry: "FinTech", desc: "Decentralized finance for the masses." },
    { name: "GreenEnergy", industry: "Climate Tech", desc: "Optimizing solar grids with machine learning." }
];

export default function CompaniesPage() {
    return (
        <main className={styles.container}>
            <Navbar />
            <div className={styles.header}>
                <h1 className={styles.title}>Top Hiring Companies</h1>
                <p className={styles.subtitle}>Meet the teams shaping the future.</p>
            </div>

            <div className={styles.grid}>
                {COMPANIES.map((company, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.logoBox}></div>
                        <h3>{company.name}</h3>
                        <p className={styles.industry}>{company.industry}</p>
                        <p className={styles.desc}>{company.desc}</p>
                        <button className={styles.btn}>View Open Roles</button>
                    </div>
                ))}
            </div>
            <Footer />
        </main>
    )
}
