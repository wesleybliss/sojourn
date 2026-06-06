import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { Database, GeonamesCity } from '@shared/types/database.types'
import { and, desc,eq, gt, like, or } from 'drizzle-orm'

export class GeonamesCitiesRepository extends Repository<GeonamesCity, typeof schemas.geonamesCities> {
    
    constructor(db?: Database) {
        
        super('geonameCity', 'geonameCities', schemas.geonamesCities, db)
        
    }
    
    tx(transaction: Database): GeonamesCitiesRepository {
        
        return new GeonamesCitiesRepository(transaction)
        
    }
    
    async searchCities(searchTerm: string) {
        
        return this.db
            .select({
                name: this.schema.name,
                countryCode: this.schema.countryCode,
                population: this.schema.population,
                latitude: this.schema.latitude,
                longitude: this.schema.longitude,
            })
            .from(this.schema)
            .where(
                and(
                    eq(this.schema.featureClass, 'P'),
                    gt(this.schema.population, 10000),
                    or(
                        like(this.schema.name, `%${searchTerm}%`), 
                        like(this.schema.alternateNames, `%${searchTerm}%`),
                    ),
                ),
            )
            .orderBy(desc(this.schema.population))
            .limit(10)
        
    }
    
}

export default new GeonamesCitiesRepository()
