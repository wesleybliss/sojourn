import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { Database, GeonamesCity, Transaction } from '@shared/types/database.types'
import { and, desc,eq, gt, like, or, sql } from 'drizzle-orm'

export class GeonamesCitiesRepository extends Repository<GeonamesCity, typeof schemas.geonamesCities> {
    
    constructor(db?: Database | Transaction) {
        
        super('geonameCity', 'geonameCities', schemas.geonamesCities, db)
        
    }
    
    tx(transaction: Transaction): GeonamesCitiesRepository {
        
        return new GeonamesCitiesRepository(transaction)
        
    }
    
    async searchCities(
        searchTerm: string,
        minimumPopulation: number = 5_000,
        interpolateQuery: boolean = true,
    ): Promise<Partial<GeonamesCity>[]> {
        
        const query = interpolateQuery
            ? searchTerm.replace(/\s+/g, '%')
            : searchTerm
        
        const results: Partial<GeonamesCity>[] = await this.db
            .select({
                id: this.schema.id,
                name: this.schema.name,
                alternateNames: this.schema.alternateNames,
                countryCode: this.schema.countryCode,
                population: this.schema.population,
                latitude: this.schema.latitude,
                longitude: this.schema.longitude,
            })
            .from(this.schema)
            .where(
                and(
                    eq(this.schema.featureClass, 'P'),
                    gt(this.schema.population, minimumPopulation),
                    or(
                        like(this.schema.name, `%${query}%`), 
                        like(this.schema.alternateNames, `%${query}%`),
                    ),
                ),
            )
            .orderBy(
                sql`
                    CASE
                        WHEN lower(${this.schema.name}) = lower(${searchTerm}) THEN 0
                        WHEN lower(${this.schema.name}) LIKE lower(${searchTerm + '%'}) THEN 1
                        WHEN lower(${this.schema.alternateNames}) LIKE lower(${'%,' + searchTerm + ',%'}) THEN 2
                        ELSE 3
                    END
                `,
                desc(this.schema.population),
            )
            .limit(10)
        
        const hasExactMatch = results.find((it: Partial<GeonamesCity>) => {
            return it?.name?.toLowerCase() === query.toLowerCase()
        })
        
        if (hasExactMatch)
            return results
        
        const exactAltNameMatch = results.reduce((acc: Partial<GeonamesCity> | null, it: Partial<GeonamesCity>) => {
            
            const match = it?.alternateNames?.split(',')
                ?.find(altName => altName.toLowerCase() === query.toLowerCase())
            
            if (!match?.length) return acc
            
            return {
                ...it,
                name: match,
                alternateNames: `${it.name},${it.alternateNames}`,
            } as Partial<GeonamesCity>
            
        }, null as Partial<GeonamesCity> | null)
        
        if (exactAltNameMatch)
            results.unshift(exactAltNameMatch)
        
        return results
        
    }
    
}

export default new GeonamesCitiesRepository()
