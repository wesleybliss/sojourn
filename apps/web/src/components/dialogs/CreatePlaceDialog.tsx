import { useWireState } from '@forminator/react-wire'
import { GeonamesCity, ToNumber } from '@repo/shared/types'
import { getCountryNameFromCode } from '@shared/utils/i18n'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

import SearchItemsDialog from '@/components/dialogs/SearchItemsDialog'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCitiesSearchQuery } from '@/lib/queries/cities'
import * as store from '@/store'

const PopulationCounts = [
    '0', '500', '1000', '5000', '10000', '50000', '100000', '500000', '1000000', 'N/A',
] as const

type PopulationCountString = typeof PopulationCounts[number]
type PopulationCount = ToNumber<Exclude<PopulationCountString, 'N/A'>>

type CreatePlaceDialogFilters = {
    countryCode: string | undefined
    minimumPopulation: PopulationCount | undefined
}

export interface CreatePlaceDialogProps {
    onConfirm: (item: GeonamesCity) => Promise<void>
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
    
    const [filters, setFilters] = useState<CreatePlaceDialogFilters>({
        countryCode: undefined,
        minimumPopulation: 5000,
    })
    
    const { t, i18n } = useTranslation()
    
    const queryFn = useCitiesSearch(filters)
    
    const formatQuery = (query: string) => {
        
        const parts = query.split(' ')
        
        if (parts.length === 2 && parts[1].length === 2 && filters.countryCode !== parts[1])
            setFilters(prev => ({
                ...prev,
                countryCode: parts[1],
            }))
        
        return query
        
    }
    
    const renderInput = (inputField: ReactElement) => (
        <div className="flex items-center gap-2">
            {inputField}
            <Select
                value={filters.minimumPopulation?.toString()}
                onValueChange={(value: string) => setFilters(prev => ({
                    ...prev,
                    minimumPopulation: parseInt(value, 10) as PopulationCount,
                }))}>
                <SelectTrigger className="w-fit shrink max-w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Count</SelectLabel>
                        {PopulationCounts.map(it => (
                            <SelectItem
                                key={`CreatePlaceDialog-population-count-${it}`}
                                value={it}>
                                {it}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
    
    return (
        
        <SearchItemsDialog
            open={createPlaceDialogOpen}
            setOpen={setCreatePlaceDialogOpen}
            title={t('places.components.CreatePlaceDialog.title')}
            description={t('places.components.CreatePlaceDialog.description')}
            queryFn={queryFn}
            placeholder={t('places.components.CreatePlaceDialog.inputPlaceholder')}
            submitLabel={t('places.components.CreatePlaceDialog.submitLabel')}
            onSubmit={async (item: GeonamesCity) => {
                if (DEBUG) console.log('@todo handle create place', item)
                else await onConfirm(item)
            }}
            formatQuery={formatQuery}
            renderInput={renderInput}
            renderItem={(item: GeonamesCity) => (
                <div className="flex items-center justify-between gap-2 w-full px-2 py-1">
                    <div className="">
                        {item.name}
                    </div>
                    {/*<div className="text-xs text-end">
                        {item.countryCode && (<>
                            {getCountryNameFromCode(item.countryCode, i18n.language)}
                            <br />
                        </>)}
                        {item.timezone}
                    </div>*/}
                    <div className="flex flex-col gap-1 text-end">
                        {item.countryCode && (
                            <span className="text-sm">
                                {getCountryNameFromCode(item.countryCode, i18n.language)}
                                <br />
                            </span>
                        )}
                        <span className="text-xs">{item.timezone}</span>
                    </div>
                </div>
            )} />
        
    )
    
}

export default CreatePlaceDialog
