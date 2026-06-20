import type { ID } from '@shared/types/data.types'
import type { PlanSelect, SegmentSelect, TripSelect, UserSelect } from '@shared/types/database.types'
import type { DecodedIdToken } from 'firebase-admin/auth'

export type AuthContext = {
    user: UserSelect
    userId: ID
    firebaseToken: DecodedIdToken
    teamId?: ID | undefined
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
