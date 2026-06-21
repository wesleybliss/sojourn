import { useWireState } from '@forminator/react-wire'
import { useEffect } from 'react'

import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useCityQuery } from '@/lib/queries/cities'
import * as store from '@/store'

const CityDetailsDialog = ({
    
}) => {
    
    const [cityDetailsDialogCityId, setCityDetailsDialogCityId] = useWireState(store.cityDetailsDialogCityId)
    
    const {
        data,
        isPending,
        isError,
        error,
    } = useCityQuery(cityDetailsDialogCityId)
    
    useEffect(() => {
        if (isError)
            console.error('CityDetailsDialog', error)
    }, [isError, error])
    
    useEffect(() => {
        if (cityDetailsDialogCityId)
            console.log('@debug cityDetailsDialogCityId', cityDetailsDialogCityId)
    }, [cityDetailsDialogCityId])
    
    return (
        
        <ConfirmDialog
            open={!!cityDetailsDialogCityId}
            title="City Details"
            confirmLabel="OK"
            onConfirm={() => setCityDetailsDialogCityId(null)}>
            
            {isError && (
                <div className="flex items-center justify-center">
                    Failed to load city data.
                </div>
            )}
            
            {isPending && (
                <div className="flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}
            
            {data && (
                <pre><code>{JSON.stringify(data, null, 4)}</code></pre>
            )}
        
        </ConfirmDialog>
        
    )
    
}

export default CityDetailsDialog
