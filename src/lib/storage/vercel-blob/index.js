import { put } from '@vercel/blob'

/**
 * 
 * @param {string} filePath - relative file path (e.g. 'articles/blob.txt')
 * @param {*} data - data to store (e.g. 'Hello World!')
 * @param {object} options - options
 * @param {string} [options.access='public'] - 'public' or 'private'
 * @param {string} [options.contentType='text/plain'] - content type of the blob
 * @param {boolean} [options.allowOverwrite=false] - allow overwriting existing blobs
 * @returns {Promise<string>} - the url of the stored blob
 */
export const putBlob = async (filePath, data, {
    access = 'public',
    contentType = 'text/plain',
    allowOverwrite = false,
} = {}) => {
    
    const res = await put(filePath, data, {
        access,
        contentType,
        allowOverwrite,
    })
    
    return res
    
}

export const toBase64 = file => new Promise((resolve, reject) => {
    
    const reader = new FileReader()
    
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    
})

export const putPlaceImage = async (name, contentType, blob) => {
    
    return await putBlob(`places/${name}`, blob, {
        contentType,
        allowOverwrite: true,
    })
    
}

export const putPlaceImageFile = async file => await putPlaceImage(
    file.name,
    file.type,
    new Blob([file], { type: file.type }))

export const putPlaceImageBuffer = async (name, contentType, buffer) => await putPlaceImage(
    name,
    contentType,
    buffer)
