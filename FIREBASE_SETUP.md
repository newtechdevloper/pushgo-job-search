# Firebase Authentication Setup

## Prerequisites
You need a Firebase project with Authentication enabled.

## Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Enable Authentication
1. In your Firebase project, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider
4. Add your domain to authorized domains (for production)

### 3. Get Firebase Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Copy the Firebase configuration object

### 4. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

### 5. Add Authorized Domains (for production)
1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your production domain (e.g., `your-app.vercel.app`)

## Features Implemented

### Login Page (`/login`)
- ✅ Email/Password authentication
- ✅ Google Sign-In
- ✅ Password visibility toggle
- ✅ Error handling with user-friendly messages
- ✅ Loading states
- ✅ Remember me checkbox
- ✅ Forgot password link

### Signup Page (`/signup`)
- ✅ Email/Password registration
- ✅ Google Sign-Up
- ✅ Full name field (saved to Firebase profile)
- ✅ Password confirmation validation
- ✅ Terms & Privacy Policy acceptance
- ✅ Error handling
- ✅ Loading states

## Testing Locally

1. Make sure `.env.local` is configured
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:3000/login` or `http://localhost:3000/signup`
4. Test authentication flows

## Security Notes

- ⚠️ Never commit `.env.local` to version control
- ⚠️ `.env.local` is already in `.gitignore`
- ✅ Firebase config is safe to expose in client-side code
- ✅ All authentication is handled securely by Firebase

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure `.env.local` exists and has all required variables
- Restart the dev server after creating/updating `.env.local`

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### Google Sign-In popup blocked
- Check browser popup blocker settings
- Make sure you're using HTTPS in production
