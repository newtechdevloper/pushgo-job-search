"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    <div>
                        <span className={styles.brand}>Push<span className={styles.brandSpan}>Go</span></span>
                        <p className={styles.brandDesc}>
                            AI-powered job search platform connecting talent with opportunities in tech, AI, and emerging industries.
                        </p>
                        <div className={styles.socialIcons}>
                            <div className={styles.socialIcon}><Twitter size={16} /></div>
                            <div className={styles.socialIcon}><Linkedin size={16} /></div>
                            <div className={styles.socialIcon}><Github size={16} /></div>
                        </div>
                    </div>
                    <div>
                        <h4 className={styles.footerColTitle}>Platform</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/jobs" className={styles.footerLink}>Browse Jobs</Link></li>
                            <li><Link href="/companies" className={styles.footerLink}>Companies</Link></li>
                            <li><Link href="/jobs" className={styles.footerLink}>Salaries</Link></li>
                            <li><Link href="/pricing" className={styles.footerLink}>Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.footerColTitle}>Support</h4>
                        <ul className={styles.footerLinks}>
                            {['Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(item => (
                                <li key={item}><Link href="#" className={styles.footerLink}>{item}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.footerColTitle}>Subscribe</h4>
                        <p className={styles.brandDesc}>Get the latest jobs sent to your inbox.</p>
                        <div className={styles.subscribeGroup}>
                            <input type="email" placeholder="Email" className={styles.subscribeInput} />
                            <button className={styles.subscribeBtn}>Go</button>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>&copy; 2026 PushGo Inc. All rights reserved.</span>
                    <span>Made with ❤️ for the future.</span>
                </div>
            </div>
        </footer>
    )
}
