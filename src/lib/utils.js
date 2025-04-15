import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
