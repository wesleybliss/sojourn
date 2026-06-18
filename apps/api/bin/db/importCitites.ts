#!/usr/bin/env node

import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import db from '@repo/shared/db'
import { geonamesCities } from '@repo/shared/db/schema'
import cliProgress from 'cli-progress'
import { sql } from 'drizzle-orm'
import yauzl, { Entry } from 'yauzl'

// last run made it to 1090999

const args = process.argv.slice(2)

const validSources = ['all', '500']
const [source] = args

if (!validSources.includes(source))
    throw new Error(`Invalid source: ${source}. Valid sources: ${validSources.join(', ')}`)

const fromBuffer = promisify(yauzl.fromBuffer)

const __dirname = dirname(fileURLToPath(import.meta.url))
const FILE_NAME = source === 'all' ? 'populatedCountries.txt' : 'cities500.txt'
const DATA_FILE = path.resolve(__dirname, `../data/${FILE_NAME}`)
const BATCH_SIZE = 1_000

const downloadCities500 = async (): Promise<NodeJS.ReadableStream> => {
    
    if (source === 'all')
        throw new Error('Download of all countries not implemented yet')
    
    try {
        
        const url = 'https://download.geonames.org/export/dump/cities500.zip'
        
        // Download the zip file using fetch (native in Node 18+)
        const response = await fetch(url)
        
        if (!response.ok)
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        
        // Get the zip as an ArrayBuffer and convert to Buffer
        const arrayBuffer = await response.arrayBuffer()
        const zipBuffer = Buffer.from(arrayBuffer)
        
        // Open zip from buffer using yauzl
        const zipFile = await fromBuffer(zipBuffer)
        
        // Find cities500.txt entry
        const entries = await new Promise<Entry[]>((resolve, reject) => {
            const entries: Entry[] = []
            zipFile.on('entry', (entry: Entry) => entries.push(entry))
            zipFile.on('end', () => resolve(entries))
            zipFile.on('error', reject)
            zipFile.readEntry()
        })
        
        const txtEntry = entries.find((e: Entry) => e.fileName === 'cities500.txt')
        
        if (!txtEntry)
            throw new Error('cities500.txt not found in zip')
        
        // Return a readable stream for the entry content
        return await new Promise<NodeJS.ReadableStream>((resolve, reject) => {
            zipFile.openReadStream(txtEntry, (err, readStream) => {
                return err ? reject(err) : resolve(readStream)
            })
        })
        
    } catch (e) {
        
        console.error('Download failed:', e)
        throw e
        
    }
    
}

const countLines = (fileStream: NodeJS.ReadableStream): Promise<number> => {
    
    return new Promise((resolve, reject) => {
        
        let lines = 0
        
        fileStream.on('data', (chunk: Buffer) => {
            for (let i = 0; i < chunk.length; i++) {
                if (chunk[i] === 10) lines++ // newline byte
            }
        })
        
        fileStream.on('end', () => resolve(lines))
        fileStream.on('error', reject)
        
    })
    
}

const importGeonamesData = async (fileStream: NodeJS.ReadableStream, totalLines?: number) => {
    
    const bar = new cliProgress.SingleBar({
        format: '  Importing |{bar}| {percentage}% | {value}/{total} records | {rate} | {city}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
    })
    
    let batch = []
    let count = 0
    const startTime = Date.now()
    
    bar.start(totalLines ?? 0, 0, { rate: '0 rec/sec', city: '(initializing)' })
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })
    
    for await (const line of rl) {
        
        if (!line.trim()) continue
        
        const fields = line.split('\t')
        const city = {
            geonameId: parseInt(fields[0], 10),
            name: fields[1] || null,
            asciiName: fields[2] || null,
            alternateNames: fields[3] || null,
            latitude: parseFloat(fields[4]),
            longitude: parseFloat(fields[5]),
            featureClass: fields[6] || null,
            featureCode: fields[7] || null,
            countryCode: fields[8] || null,
            /*cc2: fields[9] || null,
            admin1Code: fields[10] || null,
            admin2Code: fields[11] || null,
            admin3Code: fields[12] || null,
            admin4Code: fields[13] || null,*/
            population: fields[14] ? parseInt(fields[14], 10) : null,
            /*elevation: fields[15] ? parseInt(fields[15], 10) : null,
            dem: fields[16] ? parseInt(fields[16], 10) : null,*/
            timezone: fields[17] || null,
            /*modificationDate: fields[18] || null,*/
        }
        
        batch.push(city)
        count++
        
        if (batch.length === BATCH_SIZE) {
            await db.insert(geonamesCities).values(batch).onConflictDoNothing()
            batch = []
        }
        
        const elapsed = (Date.now() - startTime) / BATCH_SIZE
        const rate = `${Math.round(count / elapsed).toLocaleString()} rec/sec`
        bar.update(count, { rate, city: city.name })
        
    }
    
    if (batch.length > 0)
        await db.insert(geonamesCities).values(batch).onConflictDoNothing()
    
    bar.update(count, { rate: '', city: '' })
    bar.stop()
    
    const totalTime = (Date.now() - startTime) / BATCH_SIZE
    console.log(`\n  Records imported: ${count.toLocaleString()}`)
    console.log(`  Time taken: ${totalTime.toFixed(2)} seconds`)
    
}

const main = async () => {
    
    try {
        
        let fileStream: NodeJS.ReadableStream
        let totalLines: number | undefined
        
        // If a local cities500.txt exists, use it; otherwise download it
        if (fs.existsSync(DATA_FILE)) {
            console.log(`Using local file: ${DATA_FILE}`)
            console.log('Counting lines...')
            const countStream = fs.createReadStream(DATA_FILE)
            totalLines = await countLines(countStream)
            console.log(`> ${totalLines.toLocaleString()} lines found`)
            fileStream = fs.createReadStream(DATA_FILE)
        } else {
            console.log('Downloading cities500.zip...')
            fileStream = await downloadCities500()
        }
        
        await importGeonamesData(fileStream, totalLines)
        
        const result = await db.select({ count: sql < number > `count(*)` }).from(geonamesCities)
        console.log(`\n✓ Verification: ${result[0].count.toLocaleString()} total records`)
        process.exit(0)
        
    } catch (e) {
        
        console.error('Error:', e)
        process.exit(1)
        
    }
    
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
