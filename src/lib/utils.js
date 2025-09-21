import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import bcrypt from 'bcryptjs'

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
    const url = `${base}?text=${locationName}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
    
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

export const copyToClipboard = async text => {
    
    if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return
    }
    
    // Fallback for older browsers
    // eslint-disable-next-line no-restricted-globals
    const textarea = document.createElement('textarea')
    
    textarea.value = text
    
    // eslint-disable-next-line no-restricted-globals
    document.body.appendChild(textarea)
    textarea.select()
    
    // eslint-disable-next-line no-restricted-globals
    document.execCommand('copy')
    
    // eslint-disable-next-line no-restricted-globals
    document.body.removeChild(textarea)
    
}

export const sortArrByUpdatedAt = (arr, ascending = false) => [...arr]
    .sort((a, b) => ascending
        ? dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf()
        : dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf())

export const getTripSegmentNames = async plan => {
    
    if (!plan?.segments?.length)
        return alert('No segments found or no plan selected')
    
    const names = plan.segments.map(it => it.name)
    
    await copyToClipboard(names.join('\n'))
    
}

/**
 * Asynchronously loads an image from a given URL.
 *
 * @async
 * @function loadImageAsync
 * @param {string} url - The URL of the image to load.
 * @param {Object} [headers={}] - An optional object containing any headers to include with the request.
 * Defaults to an empty object.
 * @param {boolean} [anonymousCors=true] - An optional boolean indicating whether to set the crossOrigin property
 * of the image to 'Anonymous'. Defaults to true.
 * @throws {Error} Will throw an error if the image fails to load.
 * @returns {Promise<{blob: Blob, dataUrl: string}>} Returns a promise that resolves to an
 * object containing the loaded image's blob and data URL.
 */
export const loadImageAsync = async (url, headers = {}, anonymousCors = true) => {
    
    const img = new Image()
    
    if (anonymousCors)
        img.crossOrigin = 'Anonymous'
    
    const opts = {
        headers,
    }
    
    const res = await fetch(url, opts)
    
    if (!res.ok)
        throw new Error('Failed to load image')
    
    const blob = await res.blob()
    
    return {
        blob,
        dataUrl: URL.createObjectURL(blob),
    }
    
}

export const setAbortableTimeout = (callback, delayInMilliseconds, customAbortController) => {
    
    const controller = customAbortController || new AbortController()
    const signal = controller.signal
    
    const internalCallback = () => {
        signal.removeEventListener('abort', handleAbort)
        callback()
    }
    
    // Set up our internal timer that we can clear-on-abort.
    const t = setTimeout(internalCallback, delayInMilliseconds)
    
    const handleAbort = () => {
        // console.warn('Canceling timer (%s) via signal abort.', t)
        clearTimeout(t)
    }
    
    // When the calling context triggers an abort, we need to listen to for it so
    // that we can turn around and clear the internal timer.
    // --
    // NOTE: We're creating a proxy callback to remove this event-listener once
    // the timer executes. This way, our event-handler never gets invoked if
    // there's nothing for it to actually do. Also note that the 'abort' event
    // will only ever get emitted once, regardless of how many times the calling
    // context tries to invoke .abort() on its AbortController.
    signal.addEventListener('abort', handleAbort)
    
    return controller
    
}
