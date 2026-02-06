// Firestore Collections Structure for PushGo Platform

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// ============================================
// COLLECTION: jobs
// ============================================
export interface Job {
    id?: string;
    title: string;
    company: string;
    companyId: string;
    location: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    category: string;
    description: string;
    requirements: string[];
    salary: {
        min: number;
        max: number;
        currency: string;
    };
    postedBy: string; // HR user ID
    status: "active" | "closed" | "draft";
    applicants: number;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// COLLECTION: applications
// ============================================
export interface Application {
    id?: string;
    jobId: string;
    jobTitle: string;
    applicantId: string; // Employee user ID
    applicantName: string;
    applicantEmail: string;
    resume: string; // URL to resume file
    coverLetter: string;
    status: "applied" | "reviewing" | "interview" | "rejected" | "accepted";
    rating?: number; // 1-5 stars
    notes?: string; // HR notes
    appliedAt: Date;
    updatedAt: Date;
}

// ============================================
// COLLECTION: companies
// ============================================
export interface Company {
    id?: string;
    name: string;
    logo: string; // URL to logo
    description: string;
    industry: string;
    size: string; // e.g., "1-10", "11-50", "51-200", etc.
    website: string;
    location: string;
    verified: boolean;
    hrUsers: string[]; // Array of HR user IDs
    activeJobs: number;
    totalApplications: number;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// COLLECTION: users (already exists)
// ============================================
export interface User {
    id?: string;
    email: string;
    displayName: string;
    role: "employee" | "hr" | "admin" | "user";
    avatar?: string;
    phone?: string;
    location?: string;
    companyId?: string; // For HR users
    createdAt: Date;
    updatedAt?: Date;
}

// ============================================
// COLLECTION: savedJobs (subcollection under users)
// ============================================
export interface SavedJob {
    id?: string;
    jobId: string;
    jobTitle: string;
    company: string;
    savedAt: Date;
}

// ============================================
// COLLECTION: analytics
// ============================================
export interface Analytics {
    id?: string;
    type: "platform" | "company" | "job";
    entityId?: string; // companyId or jobId
    metrics: {
        views: number;
        applications: number;
        hires: number;
        conversionRate: number;
    };
    period: "daily" | "weekly" | "monthly";
    date: Date;
}

// ============================================
// Helper Functions to Create Documents
// ============================================

export const createJob = async (jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
    const jobsRef = collection(db, "jobs");
    return await addDoc(jobsRef, {
        ...jobData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

export const createApplication = async (applicationData: Omit<Application, "id" | "appliedAt" | "updatedAt">) => {
    const applicationsRef = collection(db, "applications");
    return await addDoc(applicationsRef, {
        ...applicationData,
        appliedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

export const createCompany = async (companyData: Omit<Company, "id" | "createdAt" | "updatedAt">) => {
    const companiesRef = collection(db, "companies");
    return await addDoc(companiesRef, {
        ...companyData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

// ============================================
// Firestore Security Rules (to be added in Firebase Console)
// ============================================
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Jobs collection
    match /jobs/{jobId} {
      allow read: if true; // Public read
      allow create: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['hr', 'admin'];
      allow update, delete: if request.auth != null && 
                              (resource.data.postedBy == request.auth.uid || 
                               get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Applications collection
    match /applications/{applicationId} {
      allow read: if request.auth != null && 
                    (resource.data.applicantId == request.auth.uid || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['hr', 'admin']);
      allow create: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'employee';
      allow update: if request.auth != null && 
                      (resource.data.applicantId == request.auth.uid || 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['hr', 'admin']);
    }
    
    // Companies collection
    match /companies/{companyId} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Analytics collection
    match /analytics/{analyticsId} {
      allow read: if request.auth != null && 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['hr', 'admin'];
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
*/
