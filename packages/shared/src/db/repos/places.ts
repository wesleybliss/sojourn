import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { ID, PlaceSelect } from '@shared/types'
import type { Database, Place, PlaceNoteSelect, Transaction } from '@shared/types/database.types'
import { desc, eq, inArray } from 'drizzle-orm'

export abstract class APlacesRepository extends Repository<Place, typeof schemas.places> {}

export class PlacesRepository extends APlacesRepository {
    
    constructor(db?: Database | Transaction) {
        
        super('place', 'places', schemas.places, db)
        
    }
    
    tx(transaction: Transaction) {
        
        return new PlacesRepository(transaction)
        
    }
    
    async findAllByTeamId(teamId: ID): Promise<PlaceSelect[]> {
        
        try {
            
            const places = await this.db
                .select()
                .from(this.schema)
                .where(eq(this.schema.teamId, teamId))
                .orderBy(desc(this.schema.updatedAt))
            
            if (places.length === 0) return []
            
            // Get all notes for these places in one query
            const placeIds = places.map(p => p.id)
            const notes = await this.db
                .select()
                .from(schemas.placeNotes)
                .where(inArray(schemas.placeNotes.placeId, placeIds))
                .orderBy(desc(schemas.placeNotes.updatedAt))
            
            // Group notes by placeId
            const notesByPlaceId = new Map<number, PlaceNoteSelect[]>()
            notes.forEach(note => {
                if (!notesByPlaceId.has(note.placeId)) {
                    notesByPlaceId.set(note.placeId, [])
                }
                notesByPlaceId.get(note.placeId)!.push(note)
            })
            
            // Attach notes to places
            return places.map(place => ({
                ...place,
                notes: notesByPlaceId.get(place.id) || [],
            }))
            
        } catch (e) {
            
            console.error(`Error fetching ${this.plural} for team ${teamId}:`, e)
            throw new Error(`Failed to fetch ${this.plural}`)
            
        }
        
    }
    
}

export default new PlacesRepository()
