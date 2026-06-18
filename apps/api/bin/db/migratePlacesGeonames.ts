#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import db from '@repo/shared/db/db-postgres'
import geonamesCitiesRepo from '@repo/shared/db/repos/geonamesCities'
import * as schemas from '@repo/shared/db/schema-postgres'
import type { GeonamesCity, Place } from '@repo/shared/types'

type PlaceMatch = {
    place: string
    match: Partial<GeonamesCity> | undefined
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMP_PLACES_FILE = path.resolve(__dirname, '../../../../backups/sojourn-places-temp.json')

const DEBUG_LIMIT: number | null = null
const DEBUG_SAVE_TEMP = false
const DEBUG_SHOW_FULL_MATCH = false

const minimumPopulation = 500

const findExistingPlaces = async () => {
    
    const query = db
        .select()
        .from(schemas.places)
    
    if (DEBUG_LIMIT)
        query.limit(DEBUG_LIMIT)
    
    return query
    
}

const savePlacesTemp = async (places: Place[]) => {
    
    const json = JSON.stringify(places, null, 4)
    
    return fs.writeFile(TEMP_PLACES_FILE, json, 'utf8' as BufferEncoding)
    
}

const findPlaceMatch = async (name: string) => {
    
    return geonamesCitiesRepo.searchCities(name, minimumPopulation)
}

const matchPlace = async (place: Place, overrideName?: string) => {
    const foo = place.name
    const res = await findPlaceMatch(overrideName ?? place.name)
    
    return { place: place.name, match: res }
    
}

const matchPlaceTokens = async (place: Place) => {
    
    const tokens = place.name.split(' ')
        .map(it => it.replace(/[^A-Za-z]/g, ''))
    
    // console.log('matchPlaceTokens: search', tokens[0])
    
    if (tokens.length > 1 && tokens[1].length <= 2) {
        return [await matchPlace(place, tokens[0])]
    }
    
    return Promise.all(tokens.map(it => matchPlace(place, it)))
    
}

const cleanMatches = (name: string, matches: Partial<GeonamesCity>[]) => {
    
    if (!matches?.length) {
        console.warn('No matches for:', name)
        return []
    }
    
    if (DEBUG_SHOW_FULL_MATCH)
        return matches
    
    return matches.map(it => ({
        id: it.id,
        name: it.name,
        countryCode: it.countryCode,
    }))
    
}

const prettyPrintMatches = (matches: PlaceMatch[]) => {
    
    const items = matches.map(it => (
        `${it.place} -> ${it.match?.name}, ${it.match?.countryCode}`
    ))
    
    items.forEach(it => console.log(it))
    
}

const main = async () => {
    
    try {
        
        const existingPlaces = await findExistingPlaces()
        
        if (DEBUG_SAVE_TEMP)
            await savePlacesTemp(existingPlaces)
        
        // console.log('Existing places:', existingPlaces)
        
        const matchesRes = await Promise.all(
            existingPlaces.map(async it => {
                return matchPlaceTokens(it)
            }),
        )
        
        const matches = matchesRes
            .flat()
            .map(it => ({
                place: it.place,
                match: cleanMatches(it.place, it.match)?.[0],
            }))
        
        // console.log(JSON.stringify(matches, null, 4))
        prettyPrintMatches(matches)
        
    } catch (e) {
        
        console.error(e)
        process.exit(1)
        
    }
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
