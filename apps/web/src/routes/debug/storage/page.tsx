import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useDebugViewModel from '@/routes/debug/useDebugViewModel'

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
        
        </div>
        
    )
    
}

export default DebugUploadFileBlobStorage
