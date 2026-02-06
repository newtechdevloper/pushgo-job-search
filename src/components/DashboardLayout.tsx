"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    LogOut,
    LucideIcon
} from "lucide-react";
import styles from "@/styles/dashboard.module.css";

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface DashboardLayoutProps {
    children: ReactNode;
    role: "employee" | "hr" | "admin" | "user";
    userName: string;
}

const navigationByRole: Record<string, NavItem[]> = {
    employee: [
        { label: "Overview", href: "/dashboard/employee", icon: LayoutDashboard },
        { label: "Applied Jobs", href: "/dashboard/employee/applications", icon: Briefcase },
        { label: "Saved Jobs", href: "/dashboard/employee/saved", icon: Briefcase },
        { label: "Profile", href: "/dashboard/employee/profile", icon: Users },
        { label: "Settings", href: "/dashboard/employee/settings", icon: Settings },
    ],
    hr: [
        { label: "Overview", href: "/dashboard/hr", icon: LayoutDashboard },
        { label: "Posted Jobs", href: "/dashboard/hr/jobs", icon: Briefcase },
        { label: "Applicants", href: "/dashboard/hr/applicants", icon: Users },
        { label: "Analytics", href: "/dashboard/hr/analytics", icon: LayoutDashboard },
        { label: "Settings", href: "/dashboard/hr/settings", icon: Settings },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Companies", href: "/dashboard/admin/companies", icon: Briefcase },
        { label: "Analytics", href: "/dashboard/admin/analytics", icon: LayoutDashboard },
        { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
    user: [
        { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
        { label: "Activity", href: "/dashboard/user/activity", icon: Briefcase },
        { label: "Settings", href: "/dashboard/user/settings", icon: Settings },
    ],
};

export default function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
    const pathname = usePathname();
    const navigation = navigationByRole[role] || [];

    return (
        <div className={styles.dashboardLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <Link href="/" className={styles.logoText}>
                        Push<span className={styles.logoSpan}>Go</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <div className={styles.navSection}>
                        <div className={styles.navTitle}>Main Menu</div>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className={styles.navSection}>
                        <Link href="/" className={styles.navItem}>
                            <LogOut size={20} />
                            Logout
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.greeting}>Welcome back, {userName}!</h1>
                    <p className={styles.subtitle}>Here's what's happening with your account today.</p>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
