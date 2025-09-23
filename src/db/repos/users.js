import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async email => {
    
    try {
        
        const user = await db.select({
            id: schemas.users.id,
            email: schemas.users.email,
        })
            .from(schemas.users)
            .where(eq(schemas.users.email, email))
            .limit(1)
        
        return user[0]
        
    } catch (e) {
        
        console.error(`Error fetching user with email ${email}:`, e)
        throw new Error('Failed to fetch user')
        
    }
    
}
