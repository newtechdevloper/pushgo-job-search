"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/pricing.module.css";
import { Check } from "lucide-react";
import Link from "next/link";

const PRICING_PLANS = [
    {
        name: "Starter",
        price: "$99",
        period: "per job post",
        description: "Perfect for small teams and startups",
        features: [
            "30-day job listing",
            "Basic applicant tracking",
            "Email notifications",
            "Standard support",
            "Job post on main board"
        ],
        buttonText: "Get Started",
        popular: false
    },
    {
        name: "Professional",
        price: "$299",
        period: "per job post",
        description: "Most popular for growing companies",
        features: [
            "60-day job listing",
            "Featured placement",
            "Advanced applicant tracking",
            "Priority support",
            "Social media promotion",
            "Company profile page",
            "Analytics dashboard"
        ],
        buttonText: "Get Started",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        description: "For large organizations with high-volume hiring",
        features: [
            "Unlimited job listings",
            "Dedicated account manager",
            "Custom integrations",
            "White-label options",
            "API access",
            "Advanced analytics",
            "Bulk posting tools",
            "Premium support 24/7"
        ],
        buttonText: "Contact Sales",
        popular: false
    }
];

export default function PricingPage() {
    return (
        <main className={styles.container}>
            <Navbar />

            <div className={styles.header}>
                <h1 className={styles.title}>Simple, Transparent Pricing</h1>
                <p className={styles.subtitle}>
                    Choose the plan that fits your hiring needs. No hidden fees.
                </p>
            </div>

            <div className={styles.grid}>
                {PRICING_PLANS.map((plan, i) => (
                    <div key={i} className={`${styles.card} ${plan.popular ? styles.popular : ''}`}>
                        {plan.popular && <span className={styles.badge}>Most Popular</span>}

                        <h3 className={styles.planName}>{plan.name}</h3>
                        <div className={styles.price}>
                            {plan.price} <span>/ {plan.period}</span>
                        </div>
                        <p className={styles.description}>{plan.description}</p>

                        <ul className={styles.features}>
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className={styles.feature}>
                                    <Check size={18} className={styles.checkIcon} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link href="/post-job">
                            <button className={`${styles.button} ${plan.popular ? styles.primaryButton : ''}`}>
                                {plan.buttonText}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            <Footer />
        </main>
    );
}
