import { requireKeys } from '@repo/shared/utils'
import type { FirebaseInitConfig } from '@shared/types/firebase.types'
import { getApp,getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseEnv = requireKeys(
    {
        VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
        VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
    },
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
)

const firebaseConfig: FirebaseInitConfig = {
    apiKey: firebaseEnv.VITE_FIREBASE_API_KEY,
    authDomain: firebaseEnv.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: firebaseEnv.VITE_FIREBASE_PROJECT_ID,
    storageBucket: firebaseEnv.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: firebaseEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: firebaseEnv.VITE_FIREBASE_APP_ID,
    measurementId: '@todo',
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider()

export { app, auth, googleProvider }
