"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            // Not authenticated - redirect to login
            if (!user) {
                router.push("/login");
                return;
            }

            // Authenticated but wrong role - redirect to their dashboard
            if (userRole && userRole !== requiredRole) {
                const dashboardMap: Record<UserRole, string> = {
                    employee: "/dashboard/employee",
                    hr: "/dashboard/hr",
                    admin: "/dashboard/admin",
                    user: "/dashboard/user",
                };
                router.push(dashboardMap[userRole]);
            }
        }
    }, [user, userRole, loading, requiredRole, router]);

    // Show loading state
    if (loading) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0a0e1a 100%)",
                color: "#fff",
            }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        border: "4px solid rgba(6, 182, 212, 0.2)",
                        borderTop: "4px solid #06b6d4",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 1rem",
                    }}></div>
                    <p style={{ fontSize: "1.125rem", color: "#94a3b8" }}>Loading...</p>
                </div>
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Not authenticated or wrong role - don't render children
    if (!user || (userRole && userRole !== requiredRole)) {
        return null;
    }

    // Authenticated with correct role - render children
    return <>{children}</>;
}
