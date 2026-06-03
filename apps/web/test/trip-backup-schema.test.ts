import schema from '@repo/shared/utils/json-schemas/trip-backup.jsonschema'
import Ajv from 'ajv'
import fs from 'fs'
import path from 'path'
import { test } from 'vitest'

test('sample backup JSON validates against schema', () => {
    
    const samplePath = path.resolve(
        __dirname,
        '../../../packages/shared/src/utils/json-schemas/trip-backup-schema-sample.json',
    )
    const raw = fs.readFileSync(samplePath, 'utf8')
    const data = JSON.parse(raw)
    
    const ajv = new Ajv({ allErrors: true, allowUnionTypes: true })
    const validate = ajv.compile(schema)
    const valid = validate(data)
    
    if (!valid)
        throw new Error('Schema validation failed: ' + JSON.stringify(validate.errors, null, 2))
    
    // const sampleSegment = data.trips[0].plans[0].segments[0]
    
    /* const dateInputExpectPairs = [
        [dayjs(sampleSegment.startDate).format('YYYY-MM-DD hh:mm:ss')],
    ] */
    
})
