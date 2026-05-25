import type { User } from 'firebase/auth'

export type FirebaseInitConfig = {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
}

export type TAuthContext = {
    user: User | null
    loading: boolean
    isAdmin: boolean
    signInWithGoogle: () => Promise<User>
    signOut: () => Promise<void>
}
