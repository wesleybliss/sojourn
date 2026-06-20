import { useWireState } from '@forminator/react-wire'
import { GeonamesCity } from '@repo/shared/types'
import { useState } from 'react'

import SearchItemsDialog from '@/components/dialogs/SearchItemsDialog'
import { useCitiesSearchQuery } from '@/lib/queries/cities'
import * as store from '@/store'

export interface CreatePlaceDialogProps {
    onConfirm: (item: GeonamesCity) => Promise<void>
}

type CreatePlaceDialogFilters = {
    minimumPopulation: number | undefined
    countryCode: string | undefined
}

const useCitiesSearch = (filters: CreatePlaceDialogFilters) => (query: string) => {
    return useCitiesSearchQuery({
        query,
        ...filters,
    })
}

const DEBUG = true

const CreatePlaceDialog = ({
    onConfirm,
}: CreatePlaceDialogProps) => {
    
    const [createPlaceDialogOpen, setCreatePlaceDialogOpen] = useWireState(store.createPlaceDialogOpen)
    
    const [filters/*, setFilters*/] = useState<CreatePlaceDialogFilters>({
        minimumPopulation: 5000,
        countryCode: undefined,
    })
    
    const queryFn = useCitiesSearch(filters)
    
    return (
        
        <SearchItemsDialog
            open={createPlaceDialogOpen}
            setOpen={setCreatePlaceDialogOpen}
            title="Create Place"
            description="Create a saved place card with a generated cover image and planning notes scaffold."
            queryFn={queryFn}
            submitLabel="Create Place"
            onSubmit={async (item: GeonamesCity) => {
                if (DEBUG) console.log('@todo handle create place', item)
                else await onConfirm(item)
            }}
            renderItem={(item: GeonamesCity) => (
                <div className="px-2 py-1">
                    <div className="">
                        {item.name}
                    </div>
                    <div className="text-xs">
                        {item.timezone}
                    </div>
                </div>
            )} />
        
    )
    
}

export default CreatePlaceDialog
