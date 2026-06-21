import { useWireState } from '@forminator/react-wire'
import { Clock,Globe, MapPin, Users } from 'lucide-react'
import { useEffect } from 'react'

import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Badge } from '@/components/ui/badge'
import { useCityQuery } from '@/lib/queries/cities'
import * as store from '@/store'

const CityDetailsDialog = () => {
    
    const [cityDetailsDialogCityId, setCityDetailsDialogCityId] = useWireState(store.cityDetailsDialogCityId)
    
    const {
        data: city,
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
            cancelLabel={null}
            onCancel={() => setCityDetailsDialogCityId(null)}
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
            
            {city && (<>
                <header className="mt-6 pb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-2xl">{city.name}</h3>
                            
                            {city.asciiName !== city.name && (
                                <p className="text-muted-foreground mt-1 text-sm">
                                    {city.asciiName}
                                </p>
                            )}
                        </div>
                        
                        <Badge variant="secondary">{city.countryCode}</Badge>
                    </div>
                </header>
                
                <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4" />
                                Population
                            </div>
                            
                            <div className="text-2xl font-semibold">
                                {city.population.toLocaleString()}
                            </div>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                Timezone
                            </div>
                            
                            <div className="font-medium">{city.timezone}</div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Location</h3>
                        
                        <div className="flex items-start gap-3">
                            <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                            
                            <div className="text-sm">
                                <div>
                                    {city.latitude.toFixed(5)}, {city.longitude.toFixed(5)}
                                </div>
                                
                                <a
                                    href={`https://www.google.com/maps?q=${city.latitude},${city.longitude}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:underline">
                                    View on map
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t pt-4">
                        <div className="grid gap-4 text-sm sm:grid-cols-3">
                            <div>
                                <div className="text-muted-foreground">GeoNames ID</div>
                                <div className="font-medium">{city.geonameId}</div>
                            </div>
                            
                            <div>
                                <div className="text-muted-foreground">Feature Class</div>
                                <div className="font-medium">{city.featureClass}</div>
                            </div>
                            
                            <div>
                                <div className="text-muted-foreground">Feature Code</div>
                                <div className="font-medium">{city.featureCode}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-muted/30 flex items-center gap-2 rounded-lg p-3 text-sm">
                        <Globe className="text-muted-foreground h-4 w-4" />
                        Capital city of Colombia
                    </div>
                </div>
            </>)}
        
        </ConfirmDialog>
        
    )
    
}

export default CityDetailsDialog
