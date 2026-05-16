
export const coordsSchema = {
    type: 'object',
    properties: {
        lat: { anyOf: [{ type: 'number' }, { type: 'null' }] },
        lng: { anyOf: [{ type: 'number' }, { type: 'null' }] },
    },
    required: ['lat', 'lng'],
    additionalProperties: true,
}

export const segmentSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
        coords: coordsSchema,
        tripId: { type: 'string' },
        planId: { type: 'string' },
        createdAt: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        updatedAt: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        startDate: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        endDate: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        stayBooked: { type: 'boolean' },
        flightBooked: { type: 'boolean' },
        description: { type: 'string' },
    },
    additionalProperties: true,
}

export const planSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        tripId: { type: 'string' },
        createdAt: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        updatedAt: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        segments: { type: 'array', items: segmentSchema },
    },
    additionalProperties: true,
}

export const tripSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        coverImageUrl: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        createdAt: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        updatedAt: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        startDate: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        endDate: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        segments: { type: 'array', items: segmentSchema },
        plans: { type: 'array', items: planSchema },
    },
    additionalProperties: true,
}

export const tripsWithPlansSchema = {
    $id: 'trip-backup.jsonschema',
    type: 'object',
    properties: {
        type: { type: 'string' },
        trips: { type: 'array', items: tripSchema },
    },
    required: ['type', 'trips'],
    additionalProperties: true,
}

export default tripsWithPlansSchema
