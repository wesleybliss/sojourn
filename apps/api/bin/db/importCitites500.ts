#!/usr/bin/env node

import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import db from '@repo/shared/db'
import { geonamesCities } from '@repo/shared/db/schema'
import { sql } from 'drizzle-orm'
import yauzl from 'yauzl'

const fromBuffer = promisify(yauzl.fromBuffer)

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.resolve(__dirname, '../data/cities500.txt')
const BATCH_SIZE = 1000

const downloadCities500 = async (): Promise<NodeJS.ReadableStream> => {
    
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
        const entries = await new Promise<any[]>((resolve, reject) => {
            const entries: unknown[] = []
            zipFile.on('entry', (entry: unknown) => entries.push(entry))
            zipFile.on('end', () => resolve(entries))
            zipFile.on('error', reject)
            zipFile.readEntry()
        })
        
        const txtEntry = entries.find(e => e.fileName === 'cities500.txt')
        
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

const importGeonamesData = async (fileStream: NodeJS.ReadableStream) => {
    
    console.log('Importing data...')
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })
    
    let batch = []
    let count = 0
    const startTime = Date.now()
    
    for await (const line of rl) {
        
        if (!line.trim()) continue
        
        const fields = line.split('\t')
        const city = {
            geonameId: parseInt(fields[0]),
            name: fields[1] || null,
            asciiName: fields[2] || null,
            alternateNames: fields[3] || null,
            latitude: parseFloat(fields[4]),
            longitude: parseFloat(fields[5]),
            featureClass: fields[6] || null,
            featureCode: fields[7] || null,
            countryCode: fields[8] || null,
            cc2: fields[9] || null,
            admin1Code: fields[10] || null,
            admin2Code: fields[11] || null,
            admin3Code: fields[12] || null,
            admin4Code: fields[13] || null,
            population: fields[14] ? parseInt(fields[14]) : null,
            elevation: fields[15] ? parseInt(fields[15]) : null,
            dem: fields[16] ? parseInt(fields[16]) : null,
            timezone: fields[17] || null,
            modificationDate: fields[18] || null,
        }
        
        batch.push(city)
        count++
        
        if (batch.length === BATCH_SIZE) {
            await db.insert(geonamesCities).values(batch).onConflictDoNothing()
            const elapsed = (Date.now() - startTime) / 1000
            const rate = Math.round(count / elapsed)
            console.log(`Imported ${count.toLocaleString()} records... (${rate.toLocaleString()}/sec)`)
            batch = []
        }
        
    }
    
    if (batch.length > 0)
        await db.insert(geonamesCities).values(batch).onConflictDoNothing()
    
    const totalTime = (Date.now() - startTime) / 1000
    console.log('\n✓ Import complete!')
    console.log(`  Records imported: ${count.toLocaleString()}`)
    console.log(`  Time taken: ${totalTime.toFixed(2)} seconds`)
    
}

const main = async () => {
    
    try {
        
        let fileStream: NodeJS.ReadableStream
        
        // If a local cities500.txt exists, use it; otherwise download it
        if (fs.existsSync(DATA_FILE)) {
            console.log(`Using local file: ${DATA_FILE}`)
            fileStream = fs.createReadStream(DATA_FILE)
        } else {
            console.log('Downloading cities500.zip...')
            fileStream = await downloadCities500()
        }
        
        await importGeonamesData(fileStream)
        
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
