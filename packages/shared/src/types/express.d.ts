import type { ID } from '@shared/types/data'
import type { PlanSelect, SegmentSelect, TripSelect, UserSelect } from '@shared/types/database'
import type { DecodedIdToken } from 'firebase-admin/auth'

export type AuthContext = {
    user: UserSelect
    firebaseToken: DecodedIdToken
    userId: ID
}

type AuthorizeOptions = {
    requireTrip?: boolean
    requirePlan?: boolean
    requireSegment?: boolean
}

declare global {
    
    namespace Express {
        
        interface Request {
            
            auth: AuthContext
            
            validatedData?: {
                tripId: number
                planId?: number
                segmentId?: number
                trip?: TripSelect
                plan?: PlanSelect
                segment?: SegmentSelect
            }
            
        }
        
    }
    
}
