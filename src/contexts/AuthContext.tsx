"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// Removed Firebase Auth imports to disable real login

export type UserRole = "employee" | "hr" | "admin" | "user";

interface UserData {
    uid: string;
    email: string;
    displayName: string;
    role: UserRole;
}

interface AuthContextType {
    user: UserData | null;
    userRole: UserRole | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userRole: null,
    loading: false,
    signOut: async () => { },
    refreshUserRole: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    // MOCK USER DATA - Always logged in as Admin
    const [user, setUser] = useState<UserData | null>({
        uid: "mock-admin-user",
        email: "admin@pushgo.com",
        displayName: "Admin User",
        role: "admin"
    });
    const [userRole, setUserRole] = useState<UserRole | null>("admin");
    const [loading, setLoading] = useState(false);

    // Mock functions
    const signOut = async () => {
        alert("Authentication is disabled. You are always logged in as Admin.");
    };

    const refreshUserRole = async () => {
        // No-op for mock
    };

    const value = {
        user,
        userRole,
        loading,
        signOut,
        refreshUserRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
