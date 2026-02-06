"use client";

import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { loading } = useAuth();

    // Since auth is disabled/mocked, we always allow access.
    // We keep the component wrapper to avoid breaking existing usage.

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
                    <p style={{ fontSize: "1.125rem", color: "#94a3b8" }}>Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
