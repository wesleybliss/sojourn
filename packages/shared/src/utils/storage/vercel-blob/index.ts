import { BlobAccessType, put, PutBlobResult } from '@vercel/blob'
import { Readable } from 'stream'

type PutBody = string | Readable | Buffer | Blob | ArrayBuffer | ReadableStream | File

export const putBlob = async (filePath: string, data: PutBody, {
    access = 'public',
    contentType = 'text/plain',
    allowOverwrite = false,
}: { access?: BlobAccessType; contentType?: string; allowOverwrite?: boolean } = {}): Promise<PutBlobResult> => {
    
    return await put(filePath, data, {
        access,
        contentType,
        allowOverwrite,
    })
    
}

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    
    const reader = new FileReader()
    
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error: unknown) => reject(error)
    
})

export const putPlaceImage = async (
    name: string,
    contentType: string,
    blob: Blob | Buffer,
) => {
    
    return await putBlob(`places/${name}`, blob, {
        contentType,
        allowOverwrite: true,
    })
    
}

export const putPlaceImageFile = async (file: File) => await putPlaceImage(
    file.name,
    file.type,
    new Blob([file], { type: file.type }))

export const putPlaceImageBuffer = async (
    name: string,
    contentType: string,
    buffer: Buffer,
) => await putPlaceImage(
    name,
    contentType,
    buffer,
)
