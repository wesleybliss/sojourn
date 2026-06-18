#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import db from '@repo/shared/db'
import geonamesCitiesRepo from '@repo/shared/db/repos/geonamesCities'
import placesRepo from '@repo/shared/db/repos/places'
import * as schemas from '@repo/shared/db/schema'
import type { GeonamesCity, Place } from '@repo/shared/types'
import { omit } from '@repo/shared/utils'
import cliProgress, { SingleBar } from 'cli-progress'
import { asc } from 'drizzle-orm'

type PlaceMatches = {
    name: string
    place: Place
    match: GeonamesCity[] | undefined
}

type PlaceMatch = {
    name: string
    place: Place
    match: GeonamesCity
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMP_PLACES_FILE = path.resolve(__dirname, '../../../../backups/sojourn-places-temp.json')

const DEBUG_LIMIT: number | null = null
const DEBUG_SAVE_TEMP = false
const DEBUG_SHOW_FULL_MATCH = false
const DEBUG_SHOW_PROGRESS = true
const DEBUG_PRINT_RESULTS = true

const minimumPopulation = 50

const substitutions = [
    ['NYCBGA', 'New York City'],
    ['Cyprus', 'Republic of Cyprus'],
]

const findExistingPlaces = async (): Promise<Place[]> => {
    
    const query = db
        .select()
        .from(schemas.places)
        .orderBy(asc(schemas.places.name))
    
    if (DEBUG_LIMIT)
        query.limit(DEBUG_LIMIT)
    
    return query as unknown as Promise<Place[]>
    
}

const savePlacesTemp = async (places: Place[]) => {
    
    const json = JSON.stringify(places, null, 4)
    
    return fs.writeFile(TEMP_PLACES_FILE, json, 'utf8' as BufferEncoding)
    
}

const findPlaceMatch = async (
    name: string,
    countryCode?: string | null,
) => {
    
    // console.log('findPlaceMatch', name, countryCode)
    
    // return geonamesCitiesRepo.searchCities(name, minimumPopulation)
    // return geonamesCitiesRepo.searchCitiesFuzzy(name, minimumPopulation)
    return geonamesCitiesRepo.searchCitiesGIN(name, minimumPopulation, countryCode)
    
}

const substituteName = (name: string) => {
    
    const substitute = substitutions.find(([src]) => src === name)
    
    return substitute?.[1] ?? name
    
}

const matchPlace = async (
    place: Place,
    overrideName?: string,
    countryCode?: string | null,
): Promise<PlaceMatches> => {
    
    const name = substituteName(overrideName ?? place.name as string)
    const res = await findPlaceMatch(name, countryCode)
    
    // console.log('matchPlace', { place: name /*match: res*/ })
    
    return { place, name, match: res } as PlaceMatches
    
}

const matchPlaceTokens = async (place: Place) => {
    
    const name = place.name as string
    const tokens = name.split(' ')
        .map((it: string) => it.replace(/[^A-Za-z]/g, '').trim())
        .filter(Boolean)
    
    const query = tokens[0]
    const countryCode = tokens.length === 2 && tokens[1].length === 2
        ? tokens[1]
        : null
    
    // console.log('matchPlaceTokens: search', query, countryCode, tokens)
    
    return [await matchPlace(place, query, countryCode)]
    
}

const cleanMatches = (name: string, matches: GeonamesCity[]) => {
    
    if (!matches?.length) {
        console.warn('No matches for:', name, matches)
        return []
    }
    
    if (DEBUG_SHOW_FULL_MATCH)
        return matches
    
    return matches.map(it => ({
        id: it.id,
        name: it.name,
        countryCode: it.countryCode,
        timezone: it.timezone,
    }))
    
}

const prettyPrintMatches = (
    matches: PlaceMatch[],
) => {
    
    /*const items = matches.map(it => (
        `${it.place} -> ${it.match?.name}, ${it.match?.countryCode} (${it.match?.id})`
    ))
    
    items.forEach(it => console.log(it))*/
    
    const items = matches.map(it => ({
        'Query': it.name,
        'Match': it.match?.name as string ?? '',
        'Country Code': it.match?.countryCode as string ?? '',
        'Timezone': it.match?.timezone as string ?? '',
        'Geonames ID': it.match?.id as string ?? '',
    }))
    
    console.table(items)
    
}

const createPlacesWithGeoname = async (matches: PlaceMatch[]) => {
    
    try {
        
        const data: Omit<Place, 'id'>[] = matches.map(it => omit({
            ...it.place,
            teamId: 1,
            geonamesCityId: it.match.id,
        }, ['id']))
        
        // return console.log(data)
        
        let completed = 0
        const bar = DEBUG_SHOW_PROGRESS
            ? new cliProgress.SingleBar({
                format: '  Creating |{bar}| {percentage}% | {value}/{total} places | {place}',
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
                hideCursor: true,
            })
            : null
        
        bar?.start(data.length, 0, { place: '(initializing)' })
        
        for (const payload of data) {
            await placesRepo.create(payload)
            bar?.update(++completed, { place: payload.name })
        }
        
        bar?.stop()
        
    } catch (e) {
        
        console.error('createPlaceWithGeoname', e)
        throw new Error('createPlaceWithGeoname failed', { cause: e })
        
    }
    
}

const main = async () => {
    
    try {
        
        const existingPlaces = await findExistingPlaces()
        
        if (DEBUG_SAVE_TEMP)
            await savePlacesTemp(existingPlaces)
        
        // console.log('Existing places:', existingPlaces)
        
        const bar = DEBUG_SHOW_PROGRESS
            ? new cliProgress.SingleBar({
                format: '  Matching |{bar}| {percentage}% | {value}/{total} places | {place}',
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
                hideCursor: true,
            })
            : null
        
        bar?.start(existingPlaces.length, 0, { place: '(initializing)' })
        
        let completed = 0
        const matchesRes = await Promise.all(
            existingPlaces.map(async it => {
                const result = await matchPlaceTokens(it)
                completed++
                bar?.update(completed, { place: it.name })
                return result
            }),
        )
        
        bar?.stop()
        
        const matchesRaw: PlaceMatch[] = matchesRes
            .flat()
            .map((it: PlaceMatches) => {
                return {
                    name: it.name,
                    place: it.place,
                    match: cleanMatches(it.name, it.match || [])?.[0],
                } as PlaceMatch
            })
        
        const matchesCache = matchesRaw.reduce(
            (acc: Record<string, PlaceMatch>, it: PlaceMatch) => {
                if (!acc[it.name])
                    acc[it.name] = it
                return acc
            },
            {} as Record<string, PlaceMatch>,
        )
        
        const matches: PlaceMatch[] = Object.values(matchesCache)
        
        // console.log(JSON.stringify(matches, null, 4))
        if (DEBUG_PRINT_RESULTS)
            prettyPrintMatches(matches)
        
        console.log('\nCreating new places with geonames IDs')
        await createPlacesWithGeoname(matches)
        
    } catch (e) {
        
        console.error(e)
        process.exit(1)
        
    }
    
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error('\n', e)
        process.exit(1)
    })
