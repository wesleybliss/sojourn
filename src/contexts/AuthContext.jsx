'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    
    useEffect(() => {
        // Check if user is logged in (in a real app, you would validate a token)
        const storedUser = localStorage.getItem('user')
        
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                setUser(null)
                console.error('Failed to parse user from localStorage', e)
            }
        }
        
        setLoading(false)
    }, [])
    
    const login = userData => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }
    
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        router.replace('/login')
    }
    
    const value = {
        user,
        login,
        logout,
        loading,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
