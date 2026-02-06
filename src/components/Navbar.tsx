"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    PushGo<span className={styles.logoSpan}>WEB</span>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/jobs" className={styles.navLink}>
                        Find Jobs <span style={{ fontSize: "0.7em" }}>▼</span>
                    </Link>
                    <Link href="/companies" className={styles.navLink}>
                        Companies
                    </Link>
                    <Link href="/post-job" className={styles.navLink}>
                        Post a Job
                    </Link>
                </div>

                {/* Right Actions */}
                <div className={styles.actions}>
                    <Link href="/jobs">
                        <button className={styles.joinBtn}>Join Now</button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.mobileMenu}
                    >
                        {["Find Jobs", "Companies", "Post a Job"].map((item) => {
                            const path = item === "Find Jobs" ? "/jobs" : item === "Companies" ? "/companies" : "/post-job";
                            return (
                                <Link
                                    key={item}
                                    href={path}
                                    className={styles.navLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            )
                        })}
                        <button className={styles.mobileBtn}>Join Now</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
