import Repository from '@repo/shared/db/repos/repo'
import * as schemas from '@repo/shared/db/schema'
import type { GeonamesCity } from '@shared/types'
import type { Database, Transaction } from '@shared/types/database.types'
import { and, desc, eq, gte, ilike, like, or, sql } from 'drizzle-orm'
import { SQL } from 'drizzle-orm/sql/sql'

export class GeonamesCitiesRepository extends Repository<GeonamesCity, typeof schemas.geonamesCities> {
    
    constructor(db?: Database | Transaction) {
        
        super('geonameCity', 'geonameCities', schemas.geonamesCities, db)
        
    }
    
    tx(transaction: Transaction): GeonamesCitiesRepository {
        
        return new GeonamesCitiesRepository(transaction)
        
    }
    
    /** @deprecated Use fuzzy or GIN search for faster queries */
    async searchCities(
        searchTerm: string,
        minimumPopulation: number = 5_000,
        interpolateQuery: boolean = true,
    ): Promise<GeonamesCity[]> {
        
        const query = interpolateQuery
            ? searchTerm.replace(/\s+/g, '%')
            : searchTerm
        
        const results = await this.db
            .select()
            .from(this.schema)
            .where(
                and(
                    or(
                        eq(this.schema.featureClass, 'A'),
                        eq(this.schema.featureClass, 'P'),
                    ),
                    gte(this.schema.population, minimumPopulation),
                    or(
                        like(this.schema.name, `%${query}%`),
                        like(this.schema.alternateNames, `%${query}%`),
                    ),
                ),
            )
            .orderBy(
                sql`
                    CASE
                        WHEN LOWER(${this.schema.name}) = LOWER(${query}) THEN 0
                        WHEN LOWER(${this.schema.name}) LIKE LOWER(${query || '%'}) THEN 1
                        WHEN LOWER(${this.schema.alternateNames}) LIKE LOWER(${'%,' + query + ',%'}) THEN 2
                        ELSE 3
                    END,
                    ${this.schema.population} DESC
                `,
                desc(this.schema.population),
            )
            .limit(10)
        
        const hasExactMatch = results.find(it => {
            return it.name?.toLowerCase() === query.toLowerCase()
        })
        
        if (hasExactMatch)
            return results
        
        const exactAltNameMatch = results.reduce<GeonamesCity | null>((acc, it) => {
            
            const match = it.alternateNames?.split(',')
                ?.find(altName => altName.toLowerCase() === query.toLowerCase())
            
            if (!match?.length) return acc
            
            return {
                ...it,
                name: match,
                alternateNames: `${it.name},${it.alternateNames}`,
            }
            
        }, null)
        
        if (exactAltNameMatch)
            results.unshift(exactAltNameMatch)
        
        return results
        
    }
    
    async searchCitiesFuzzy(
        searchTerm: string,
        minimumPopulation: number = 5_000,
        interpolateQuery: boolean = true,
    ): Promise<GeonamesCity[]> {
        
        const query = interpolateQuery
            ? searchTerm.replace(/\s+/g, '%')
            : searchTerm
        
        const results = await this.db
            .select()
            .from(this.schema)
            .where(and(
                or(
                    eq(this.schema.featureClass, 'A'),
                    eq(this.schema.featureClass, 'P'),
                ),
                gte(this.schema.population, minimumPopulation),
                sql`${this.schema.name} % ${sql.param(query)}`,
            ))  // % = similarity operator
            .orderBy(sql`${this.schema.name} <-> ${sql.param(query)}`)  // <-> = distance operator
            .limit(10)
        
        return results
        
    }
    
    async searchCitiesGIN(
        searchTerm: string,
        minimumPopulation: number = 5_000,
        countryCode?: string | null,
        interpolateQuery: boolean = true,
    ): Promise<GeonamesCity[]> {
        
        const query = (
            interpolateQuery
                ? searchTerm.replace(/\s+/g, '%')
                : searchTerm
        )
        
        const pattern = `%${query}%`
        
        const conditions: (SQL<unknown> | undefined)[] = [
            or(
                eq(this.schema.featureClass, 'A'),
                eq(this.schema.featureClass, 'P'),
            ),
            gte(this.schema.population, minimumPopulation),
            or(
                ilike(this.schema.name, pattern),
                ilike(this.schema.asciiName, pattern),
                // Match against alternate names so e.g. searching "Venice" finds
                // "Venezia". Backed by idx_geonames_alternate_names_gin.
                ilike(this.schema.alternateNames, pattern),
            ),
        ]
        
        if (countryCode?.length) {
            // countryCode is varchar(2); use eq so the BTree / partial composite
            // index on (countryCode, population) can be used. Wrapping in
            // ILIKE '%US%' would defeat the index and force a seq scan.
            conditions.push(eq(this.schema.countryCode, countryCode.toUpperCase()))
        }
        
        return this.db
            .select()
            .from(this.schema)
            .where(and(...conditions)) // % = similarity operator
            .orderBy(sql`${this.schema.name} <-> ${sql.param(query)}`)  // <-> = distance operator
            .limit(10)
        
    }
    
}

export default new GeonamesCitiesRepository()
