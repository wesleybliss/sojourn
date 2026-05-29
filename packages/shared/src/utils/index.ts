import type { Plan } from '@repo/shared/types'
import type { Segment } from '@repo/shared/types'
import bcrypt from 'bcryptjs'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { nanoid } from 'nanoid'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export const requireKeys = (
    source: NodeJS.ProcessEnv | ImportMetaEnv | Record<string, string | undefined>,
    ...keys: Array<string>
): Record<string, string> => {
    
    if (source === undefined)
        throw new Error('utils/index: requireKeys source was undefined')
    
    return keys.reduce((acc: Record<string, string>, it: string) => {
        
        const value: string | undefined = source[it]
        
        if (!value?.length) {
            console.error('utils/index: requireKeys', source)
            throw new Error(`${it} must be set`)
        }
        
        acc[it] = value
        
        return acc
        
    }, {} as Record<string, string>)
    
}

export const isLocalhost = typeof window !== 'undefined' && Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
)

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

export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs.filter(it => it !== undefined)))
}

export const noop = () => {
    // NOOP
}

export const generateSlug = (title: string) => title
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
 */
export const createSyntheticDownload = (
    data: Blob | string,
    type: string,
    fileName: string,
) => {
    
    // Automatically wrap data as a blob, if it's not already
    const blob = data instanceof Blob ? data : new Blob([data], { type })
    
    const url = window.URL.createObjectURL(blob)
    
    
    const link = document.createElement('a')
    
    link.href = url
    link.setAttribute('download', fileName)
    
    
    document.body.appendChild(link)
    link.click()
    
    link.parentNode?.removeChild(link)
    
}

export const getRandomUnsplashImageUrl = async (topic: string) => {
    
    const accessKey = process.env.UNSPLASH_ACCESS_KEY
    
    if (!accessKey?.length)
        throw new Error('Missing UNSPLASH_ACCESS_KEY')
    
    // Only include alpha characters
    const cleanTopic = encodeURIComponent(topic.replace(/[^a-zA-Z]/g, ' '))
    
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${cleanTopic}`
    
    try {
        
        const res = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        })
        
        const data = await res.json()
        
        return data.urls.regular
        
    } catch (e) {
        
        console.error('getRandomUnsplashImageUrl', e)
        
        return null
        
    }
    
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const geocodeNomatim = async (locationName: string) => {
    
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

export const geocodeGeoapify = async (locationName: string) => {
    
    const base = 'https://api.geoapify.com/v1/geocode/search'
    const url = `${base}?text=${locationName}&apiKey=${process.env.VITE_GEOAPIFY_KEY}`
    
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

export const calculateTotalDays = (
    initialStartDate: Date | unknown,
    initialEndDate: Date | unknown,
) => {
    
    const startDate =  dayjs(initialStartDate as Date)
    const endDate = dayjs(initialEndDate as Date)
    const totalDays = endDate.diff(startDate, 'day')
    
    return {
        startDate,
        endDate,
        totalDays,
    }
    
}

export const hashPassword = async (password: string) => {
    
    const salt = await bcrypt.genSalt(10)
    
    return await bcrypt.hash(password, salt)
    
}

export const checkPassword = async (
    password: string,
    hashedPassword: string,
) => {
    
    return await bcrypt.compare(password, hashedPassword)
    
}

export const omit = <T extends Record<string, unknown>>(
    obj: T,
    keys: Array<keyof T> = [],
) => {
    
    return Object.keys(obj).reduce((acc: T, it: keyof T) => {
        
        if (!keys.includes(it))
            acc[it] = obj[it]
        
        return acc
        
    }, {} as T)
    
}

export const keep = <T extends Record<string, unknown>>(
    obj: T,
    keys: Array<keyof T> = [],
) => {
    
    return Object.keys(obj).reduce((acc: T, it: keyof T) => {
        
        if (keys.includes(it))
            acc[it] = obj[it]
        
        return acc
        
    }, {} as T)
    
}

export const getUpdatePayload = <T extends Record<string, unknown>>(
    control: T,
    data: T,
    omitKeys: Array<keyof T> = [],
) => {
    
    const keys = Object.keys(omit(control, omitKeys))
    
    // payload
    return keep(data, keys)
    
}

export const convertStringDates = <
    T extends Record<string, string | number | Date | Dayjs | null | undefined>,
>(
    obj: T,
    keys: Array<keyof T> = [],
) => {
    
    const clone: T = { ...obj }
    
    keys.forEach(key => {
        
        if (clone[key]) {
            
            const date = dayjs(clone[key])
            
            if (date.isValid())
                (clone as Record<keyof T, Date>)[key] = date.toDate()
            else
                throw new Error(`convertStringDates: Invalid date format for key ${key.toString()}`)
            
        }
        
    })
    
    return clone
    
}

export const copyToClipboard = async (text: string) => {
    
    if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return
    }
    
    // Fallback for older browsers
    
    const textarea = document.createElement('textarea')
    
    textarea.value = text
    
    
    document.body.appendChild(textarea)
    textarea.select()
    
    
    document.execCommand('copy')
    
    
    document.body.removeChild(textarea)
    
}

export const sortArrByUpdatedAt = <T extends { updatedAt: Date }>(
    arr: T[],
    ascending: boolean = false,
): T[] => {
    
    return [...arr].sort((a, b) => {
        return ascending
            ? dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf()
            : dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf()
    }) as T[]
    
}

export const getTripSegmentNames = async (plan: Plan | null | undefined) => {
    
    if (!plan?.segments?.length)
        return alert('No segments found or no plan selected')
    
    const names = plan.segments.map((it: Segment) => it.name)
    
    await copyToClipboard(names.join('\n'))
    
}

/**
 * Asynchronously loads an image from a given URL.
 */
export const loadImageAsync = async (
    url: string,
    headers?: HeadersInit | undefined,
    anonymousCors: boolean = true,
) => {
    
    const img = new Image()
    
    if (anonymousCors)
        img.crossOrigin = 'Anonymous'
    
    const opts: RequestInit = {
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

export const setAbortableTimeout = (
    callback: () => void | Promise<void>,
    delayInMilliseconds: number,
    customAbortController: AbortController,
) => {
    
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

export const formatDate = (date = new Date(), customFormat = 'ddd MMM D, YYYY') =>
    dayjs(date).format(customFormat)

export const parseFormData = <T extends string>(
    e: SubmitEvent | ChangeEvent<HTMLFormElement> | SyntheticEvent<HTMLFormElement, SubmitEvent>,
    fields: T[] = [],
): Record<T, FormDataEntryValue | string | null> => {
    
    const form = 'nativeEvent' in e
        ? e.currentTarget  // React events: currentTarget is HTMLFormElement
        : e.currentTarget as HTMLFormElement // Native SubmitEvent: cast from EventTarget | null
    
    const formData = new FormData(form)
    
    return fields.reduce((acc, it) => ({
        ...acc,
        [it]: formData.get(it),
    }), {} as Record<T, FormDataEntryValue | string | null>)
    
}



export const abortableFetch = (url: string, opts: Record<string, unknown> = {}) => {
    
    const controller = new AbortController()
    
    const promise = fetch(url, {
        ...opts,
        signal: controller.signal,
    })
    
    return {
        promise,
        abort: () => controller.abort(),
    }
    
}

export const fakeAbortableFetch = (url: string) => {
    
    const id = nanoid()
    const promise = new Promise(x => setTimeout(x, 700))
    
    return {
        promise,
        abort: () => console.warn('aborted', id, url),
    }
    
}
