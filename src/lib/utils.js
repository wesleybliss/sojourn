import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import bcrypt from 'bcryptjs'
import { keys } from '@/constants.js'

export const gridColumnsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
}

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const noop = () => {
    // NOOP
}

export const generateSlug = title => title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric, non-space, non-hyphen chars
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')         // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '')     // Trim leading/trailing hyphens

/**
 * Creates a synthetic download of a file
 * 
 * @see https://www.npmjs.com/package/file-saver#supported-browsers
 * Related but overkill for our use case
 * 
 * @param {Blob} data - The data to download
 * @param {string} type - The MIME type of the data
 * @param {string} fileName - The name of the file to download
 * @returns {void}
 */
export const createSyntheticDownload = (data, type, fileName) => {
    
    // Automatically wrap data as a blob, if it's not already
    const blob = data instanceof Blob ? data : new Blob([data], { type })
    
    const url = window.URL.createObjectURL(blob)
    
    // eslint-disable-next-line no-restricted-globals
    const link = document.createElement('a')
    
    link.href = url
    link.setAttribute('download', fileName)
    
    // eslint-disable-next-line no-restricted-globals
    document.body.appendChild(link)
    link.click()
    
    link.parentNode.removeChild(link)
    
}

export const getRandomUnsplashImageUrl = async topic => {
    
    // Only include alpha characters
    const cleanTopic = topic.replace(/[^a-zA-Z]/g, '')
    
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${cleanTopic}`
    
    try {
        
        const res = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        })
        
        const data = await res.json()
        
        return data.urls.regular
        
    } catch (e) {
        
        console.error('getRandomUnsplashImageUrl', e)
        
        return null
        
    }
    
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const geocodeNomatim = async locationName => {
    
    const endpoint = 'https://nominatim.openstreetmap.org/search'
    const format = 'json'
    const url = `${endpoint}?q=${encodeURIComponent(locationName)}&format=${format}&limit=1`
    
    // Don't get rate limited
    await sleep(1500)
    
    try {
        
        const response = await fetch(url, {
            headers: {
                // IMPORTANT: Change this to something descriptive for your app
                'User-Agent': 'TripPlannerBasic/1.0 (gammagammaco@gmail.com)',
            },
        })
        
        if (!response.ok)
            throw new Error(`HTTP error status: ${response.status}`)
        
        const data = await response.json()
        
        if (data && data.length > 0) {
            
            const { lat, lon } = data[0]
            
            console.log(`Location: ${locationName}, Lat: ${lat}, Lon: ${lon}`)
            
            return {
                lng: parseFloat(lon),
                lat: parseFloat(lat),
            }
            
        } else {
            
            console.warn(`No results found for ${locationName}`)
            return null
            
        }
        
    } catch (e) {
        
        console.error('Geocoding failed:', e)
        return null
        
    }
    
}

export const geocodeGeoapify = async locationName => {
    
    const base = 'https://api.geoapify.com/v1/geocode/search'
    const url = `${base}?text=${locationName}&apiKey=${process.env.GEOAPIFY_KEY}`
    
    // Don't get rate limited
    await sleep(1500)
    
    try {
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'TripPlannerBasic/1.0 (gammagammaco@gmail.com)',
            },
        })
        
        if (!response.ok)
            throw new Error(`HTTP error status: ${response.status}`)
        
        const data = await response.json()
        
        const [lng, lat] = data.features[0].geometry.coordinates
        
        return {
            lng: parseFloat(lng),
            lat: parseFloat(lat),
        }
        
    } catch (e) {
        
        console.error('Geocoding failed:', e)
        return null
        
    }
    
}

export const geocode = geocodeGeoapify

export const calculateTotalDays = (initialStartDate, initialEndDate) => {
    
    const startDate =  dayjs(initialStartDate)
    const endDate = dayjs(initialEndDate)
    const totalDays = endDate.diff(startDate, 'day')
    
    return {
        startDate,
        endDate,
        totalDays,
    }
    
}

export const hashPassword = async password => {
    
    const salt = await bcrypt.genSalt(10)
    
    return await bcrypt.hash(password, salt)
    
}

export const checkPassword = async (password, hashedPassword) => {
    
    return await bcrypt.compare(password, hashedPassword)
    
}

export const omit = (obj, keys = []) => {
    
    return Object.keys(obj).reduce((acc, it) => {
        
        if (!keys.includes(it))
            acc[it] = obj[it]
        
        return acc
        
    }, {})
    
}

export const keep = (obj, keys = []) => {
    
    return Object.keys(obj).reduce((acc, it) => {
        
        if (keys.includes(it))
            acc[it] = obj[it]
        
        return acc
        
    }, {})
    
}

export const getUpdatePayload = (control, data, omitKeys = []) => {
    
    const keys = Object.keys(omit(control, omitKeys))
    const payload = keep(data, keys)
    
    return payload
    
}

export const convertStringDates = (obj, keys = []) => {
    
    const clone = { ...obj }
    
    keys.forEach(key => {
        
        if (clone[key]) {
            
            const date = dayjs(clone[key])
            
            if (date.isValid())
                clone[key] = date.toDate()
            else
                throw new Error(`convertStringDates: Invalid date format for key ${key}`)
            
        }
        
    })
    
    return clone
    
}
