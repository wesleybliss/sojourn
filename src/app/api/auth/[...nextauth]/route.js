// import NextAuthImport from 'next-auth'
import NextAuthImport from 'next-auth'
import CredentialsProviderImport from 'next-auth/providers/credentials'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { eq } from 'drizzle-orm'
import { checkPassword } from '@/lib/utils.js'

const NextAuth = NextAuthImport.default || NextAuthImport
const CredentialsProvider = CredentialsProviderImport.default || CredentialsProviderImport

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                
                if (!credentials?.email || !credentials?.password)
                    return null
                
                try {
                    
                    const [user] = await db
                        .select()
                        .from(schemas.users)
                        .where(eq(schemas.users.email, credentials.email))
                    
                    if (!user) return null
                    const valid = await checkPassword(credentials.password, user.password)
                    
                    if (!valid) return null
                    // Remove sensitive fields
                    delete user.password
                    
                    return user
                    
                } catch (error) {
                    
                    console.error('Authorize error:', error)
                    return null
                    
                }
                
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        error: '/error',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.sub = String(user.id)
            return token
        },
        async session({ session, token }) {
            session.user = { id: Number(token.sub), email: session.user.email }
            return session
        },
        async redirect({ url, baseUrl }) {
            // Log for debugging
            console.log('Redirect called with:', { url, baseUrl })
            
            try {
                // Handle error page redirects specifically
                if (url.includes('/api/auth/error')) {
                    console.log('Redirecting to /error page')
                    return '/error'
                }
                
                // Parse the URL to work with it
                const parsedUrl = new URL(url, baseUrl)
                
                // If it's a relative path, return it as is
                if (url.startsWith('/')) {
                    return url
                }
                
                // For absolute URLs, return the parsed URL
                return parsedUrl.toString()
            } catch (error) {
                console.error('Error in redirect callback:', error)
                // Fallback to baseUrl if URL parsing fails
                return baseUrl
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    debug: true,
}

// Log the authOptions to debug
console.log('Auth options:', authOptions)

const nextAuth = NextAuth(authOptions)

// Add additional logging to debug the issue
console.log('NextAuth type:', typeof nextAuth)
console.log('NextAuth keys:', Object.keys(nextAuth))

// Check if handlers exist and export them properly
let GET, POST, PUT, DELETE, PATCH, OPTIONS

if (nextAuth.handlers) {
    console.log('Handlers type:', typeof nextAuth.handlers)
    console.log('Handlers keys:', Object.keys(nextAuth.handlers))
    
    // Assign handlers
    GET = nextAuth.handlers.GET
    POST = nextAuth.handlers.POST
    PUT = nextAuth.handlers.PUT
    DELETE = nextAuth.handlers.DELETE
    PATCH = nextAuth.handlers.PATCH
    OPTIONS = nextAuth.handlers.OPTIONS
} else {
    // Fallback to the old way
    GET = nextAuth
    POST = nextAuth
    PUT = nextAuth
    DELETE = nextAuth
    PATCH = nextAuth
    OPTIONS = nextAuth
}

// Export with fallbacks
export { 
    GET, 
    POST, 
    PUT, 
    DELETE, 
    PATCH, 
    OPTIONS,
}
