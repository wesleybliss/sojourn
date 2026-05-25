'use client'

import useDebugViewModel from '@/app/debug/useDebugViewModel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const DebugUploadFileBlobStorage = () => {
    
    const vm = useDebugViewModel()
    
    return (
        
        <div className="flex flex-col gap-2 w-90 mt-5 p-3 border rounded">
            
            <p>Upload a file to blob storage</p>
            
            <form className="flex flex-col gap-2" onSubmit={vm.uploadSampleImageBlob}>
                <Input name="file" type="file" />
                <Button type="submit">Upload File</Button>
            </form>
            
            {vm.sampleImageBlobUrl && (
                <img src={vm.sampleImageBlobUrl} width="800" height="auto" />
            )}
            
            {/*
                import Image from 'next/image'
                <Image
                    src="https://esorkirr926ujb53.public.blob.vercel-storage.com/avatar-1234.png"
                    width={200}
                    height={200}
                    alt="avatar" />
                */}
        
        </div>
        
    )
    
}

export default DebugUploadFileBlobStorage
