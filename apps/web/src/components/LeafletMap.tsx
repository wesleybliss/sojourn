import { MapContainer, Marker,TileLayer } from 'react-leaflet'

/*const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">' +
    'OpenStreetMap</a> contributors'*/

const LeafletMap = () => {
    
    return (
        
        <MapContainer
            bounds={[51.505, -0.09]}
            boundsOptions={{
                zoomScale: 13,
            }}
            style={{ width: '100%', height: '100%' }}>
            
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <Marker position={[51.505, -0.09]} />
        
        </MapContainer>
    )
    
}

export default LeafletMap
