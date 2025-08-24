'use client'

import { SessionProvider } from 'next-auth/react'

/**
 * Wraps the application to provide NextAuth session context.
 */
export default function NextAuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>
}