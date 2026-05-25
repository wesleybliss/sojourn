import 'maplibre-gl/dist/maplibre-gl.css'

import maplibregl, { Marker, Popup } from 'maplibre-gl'
import { useEffect,useRef } from 'react'

const tileUrls = {
    demo: 'https://demotiles.maplibre.org/styleon',
    openMapTilesBright: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdnon',
    mapTilerBasic: `https://api.maptiler.com/maps/basic-v2/styleon?key=${process.env.NEXT_PUBLIC_MAP_TILER_KEY}`,
}

interface MapLibreMapProps {
    latLng?: [number, number]
    points?: { coords: [number, number]; name?: string }[]
}

const MapLibreMap = ({
    latLng = [-74.006, 40.7128],
    points = [],
}: MapLibreMapProps) => {
    
    const mapRef = useRef<maplibregl.Map | null>(null) // Ref for the map instance
    const mapContainerRef = useRef<HTMLDivElement | null>(null) // Ref for the container div
    const markersRef = useRef<Marker[]>([])
    
    useEffect(() => {
        
        // Prevent re-initialization
        if (mapRef.current || !mapContainerRef.current) return
        
        mapRef.current = new maplibregl.Map({
            // container: 'map',
            container: mapContainerRef.current,
            style: tileUrls.mapTilerBasic,
            center: latLng,
            zoom: 12,
        })
        
        return () => {
            mapRef.current?.remove()
            mapRef.current = null
        }
        
    }, [latLng, points])
    
    // Update center when latLng changes
    useEffect(() => {
        
        // Ensure map instance exists
        if (!mapRef.current) return
        
        // Use flyTo for smooth animation or setCenter for instant jump
        mapRef.current.flyTo({
            center: latLng,
            essential: true, // If using flyTo
            zoom: 12, // Optional: reset zoom or adjust as needed
        })
        // Or: mapRef.current.setCenter(latLng)
        
    }, [latLng])
    
    useEffect(() => {
        
        if (!mapRef.current) return
        
        // Clear existing markers from the map and the ref
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []
        
        // Add new markers based on the points prop
        points.forEach(point => {
            
            // Basic validation: ensure coords is an array [lon, lat]
            if (point?.coords && Array.isArray(point.coords) && point.coords.length === 2) {
                
                const marker = new Marker()
                    .setLngLat(point.coords) // Remember: [lon, lat] or { lon, lat }
                    .addTo(mapRef.current!)
                
                // Optional: Add a popup if the point has a name/label
                if (point.name) {
                    
                    const popup = new Popup({ offset: 25 }).setText(point.name)
                    
                    marker.setPopup(popup)
                    
                }
                
                // Store the marker instance so we can remove it later
                markersRef.current.push(marker)
                
            } else {
                
                console.warn('Skipping invalid point:', point)
                
            }
            
        })
        
    }, [points])
    
    return (
        
        <div
            ref={mapContainerRef}
            style={{
                width: '100%',
                height: '100vh',
            }} />
        
    )
    
}

export default MapLibreMap
