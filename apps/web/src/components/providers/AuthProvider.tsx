import { User } from '@repo/shared/types/database'
import { auth, googleProvider } from '@repo/shared/utils/firebase/client'
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    User as FirebaseUser,
    UserCredential,
} from 'firebase/auth'
import { createContext, JSX, ReactNode, useContext, useEffect, useState } from 'react'

interface TAuthContext {
    user: User | null
    firebaseUser: FirebaseUser | null
    loading: boolean
    needsInviteCode: boolean
    signInWithGoogle: () => Promise<UserCredential>
    signOut: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<TAuthContext>({
    user: null,
    firebaseUser: null,
    loading: true,
    needsInviteCode: false,
    signInWithGoogle: async () => {
        throw new Error('Not implemented')
    },
    signOut: async () => {},
    refreshUser: async () => {},
})

interface AuthProviderProps {
    children: ReactNode | JSX.Element
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [needsInviteCode, setNeedsInviteCode] = useState<boolean>(false)
    
    // Fetch internal user data from our API
    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch('auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            
            if (response.ok) {
                const data = await response.json()
                
                setUser(data.user)
                setNeedsInviteCode(data.needsInviteCode || false)
            } else {
                setUser(null)
                setNeedsInviteCode(false)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            setUser(null)
            setNeedsInviteCode(false)
        }
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
            setFirebaseUser(firebaseUser)
            
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken()
                
                await fetchUserData(token)
            } else {
                setUser(null)
                setNeedsInviteCode(false)
            }
            
            setLoading(false)
        })
        
        return () => unsubscribe()
    }, [])
    
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const token = await result.user.getIdToken()
            
            await fetchUserData(token)
            return result
        } catch (error) {
            console.error('Error signing in with Google:', error)
            throw error
        }
    }
    
    const signOut = async () => {
        try {
            await firebaseSignOut(auth)
            setUser(null)
            setFirebaseUser(null)
            setNeedsInviteCode(false)
        } catch (error) {
            console.error('Error signing out:', error)
            throw error
        }
    }
    
    const refreshUser = async () => {
        if (firebaseUser) {
            const token = await firebaseUser.getIdToken(true)
            
            await fetchUserData(token)
        }
    }
    
    const value: TAuthContext = {
        user,
        firebaseUser,
        loading,
        needsInviteCode,
        signInWithGoogle,
        signOut,
        refreshUser,
    }
    
    return (
        
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        
    )
    
}

export function useAuth() {
    
    const context = useContext(AuthContext)
    
    if (context === undefined)
        throw new Error('useAuth must be used within an AuthProvider')
    
    return context
    
}
