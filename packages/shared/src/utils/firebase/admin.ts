import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Initialize Firebase Admin
let app

if (getApps().length === 0) {
    // Initialize with service account credentials from environment variables
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined
    
    const credential = privateKey
        ? cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey,
        })
        : undefined
    
    app = initializeApp({
        credential,
        projectId: process.env.FIREBASE_PROJECT_ID,
    })
} else {
    app = getApps()[0]
}

const adminAuth = getAuth(app)

export { adminAuth }
