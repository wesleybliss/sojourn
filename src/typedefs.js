/**
 * @typedef {object} Trip
 * @property {string} id - The unique identifier for the trip.
 * @property {Date} createdAt - The date the trip was created in ISO format.
 * @property {Date} updatedAt - The date the trip was last updated in ISO format.
 * @property {string} name - The name of the trip.
 * @property {string} description - A description of the trip.
 * @property {Date} startDate - The start date of the trip in ISO format.
 * @property {Date} endDate - The end date of the trip in ISO format.
 * @property {Segment[]} segments - An array of segments associated with the trip.
 */

/**
 * @typedef {object} Segment
 * @property {string} id - The unique identifier for the segment.
 * @property {Date} createdAt - The date the segment was created in ISO format.
 * @property {Date} updatedAt - The date the segment was last updated in ISO format.
 * @property {string} tripId - The unique identifier of the trip to which the segment belongs.
 * @property {string} name - The name of the segment.
 * @property {string} description - A description of the segment.
 * @property {Date} startDate - The start date of the segment in ISO format.
 * @property {Date} endDate - The end date of the segment in ISO format.
 * @property {LatLng} location - The location of the segment.
 */

/**
 * @typedef {object} LatLng
 * @property {number} lat - The latitude of the location.
 * @property {number} lng - The longitude of the location.
 */
