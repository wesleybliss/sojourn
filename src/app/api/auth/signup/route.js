import { NextResponse } from 'next/server'
import db from '@/db/index.js'
import * as schemas from '@/db/schema.js'
import { hashPassword } from '@/lib/utils.js'
import { eq } from 'drizzle-orm'

// Define the global invite code (in a real app, this would be stored in the database or environment variables)
const INVITE_CODE = process.env.INVITE_CODE || 'TRIPPLANNER2025'

/**
 * POST /api/auth/signup
 * Creates a new user account with email and password
 */
export async function POST(request) {
    
    try {
        
        const { email, password, inviteCode } = await request.json()
        
        // Validate input
        if (!email || !email.includes('@'))
            return NextResponse.json(
                { success: false, error: 'Invalid email address' },
                { status: 400 },
            )
        
        if (!password || password.length < 8)
            return NextResponse.json(
                { success: false, error: 'Password must be at least 8 characters' },
                { status: 400 },
            )
        
        if (!inviteCode || inviteCode !== INVITE_CODE)
            return NextResponse.json(
                { success: false, error: 'Invalid or missing invite code' },
                { status: 400 },
            )
        
        // Check if user already exists
        const existingUser = await db
            .select()
            .from(schemas.users)
            .where(eq(schemas.users.email, email))
        
        if (existingUser.length > 0)
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 409 },
            )
        
        // Hash password
        const hashedPassword = await hashPassword(password)
        
        // Create user
        const [newUser] = await db
            .insert(schemas.users)
            .values({
                email,
                password: hashedPassword,
            })
            .returning()
        
        // Remove password from response
        delete newUser.password
        
        return NextResponse.json(
            {
                success: true,
                data: newUser,
                message: 'User created successfully',
            },
            { status: 201 },
        )
        
    } catch (e) {
        
        console.error('Error creating user:', e)
        
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 },
        )
        
    }
    
}
