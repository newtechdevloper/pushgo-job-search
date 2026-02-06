"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export type UserRole = "employee" | "hr" | "admin" | "user";

interface UserData {
    email: string;
    displayName: string;
    role: UserRole;
    createdAt: Date;
}

interface AuthContextType {
    user: User | null;
    userRole: UserRole | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userRole: null,
    loading: true,
    signOut: async () => { },
    refreshUserRole: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserRole = async (uid: string): Promise<UserRole> => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                return userDoc.data().role as UserRole;
            }
            // Default role for new users
            return "user";
        } catch (error) {
            console.error("Error fetching user role:", error);
            return "user";
        }
    };

    const createUserDocument = async (user: User, role: UserRole = "user") => {
        try {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                const userData: UserData = {
                    email: user.email || "",
                    displayName: user.displayName || "",
                    role: role,
                    createdAt: new Date(),
                };
                await setDoc(userRef, userData);
            }
        } catch (error) {
            console.error("Error creating user document:", error);
        }
    };

    const refreshUserRole = async () => {
        if (user) {
            const role = await fetchUserRole(user.uid);
            setUserRole(role);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                // Create user document if it doesn't exist
                await createUserDocument(user);

                // Fetch user role
                const role = await fetchUserRole(user.uid);
                setUserRole(role);
            } else {
                setUserRole(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            setUserRole(null);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
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
