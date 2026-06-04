import type { ID } from '@shared/types/data'
import type { UserSelect } from '@shared/types/database'
import type { DecodedIdToken } from 'firebase-admin/auth'

export type AuthContext = {
    user: UserSelect
    firebaseToken: DecodedIdToken
    userId: ID
}

declare global {
    
    namespace Express {
        
        interface Request {
            auth: AuthContext
        }
        
    }
    
}


