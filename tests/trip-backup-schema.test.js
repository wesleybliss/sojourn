import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Ajv from 'ajv'
import schema from '../src/lib/json-schemas/trip-backup.jsonschema.js'

test('sample backup JSON validates against schema', () => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const samplePath = path.resolve(__dirname, '../src/lib/json-schemas/trip-backup-schema-sample.json')
    const raw = fs.readFileSync(samplePath, 'utf8')
    const data = JSON.parse(raw)
    
    const ajv = new Ajv({ allErrors: true, allowUnionTypes: true })
    const validate = ajv.compile(schema)
    const valid = validate(data)
    
    if (!valid) {
        throw new Error('Schema validation failed: ' + JSON.stringify(validate.errors, null, 2))
    }
})
