import { Team, User } from '@shared/types/database.types'

export type TeamWithMembers = Team & {
    members: Pick<User, 'id' | 'name' | 'email' | 'photoUrl'>[]
}
