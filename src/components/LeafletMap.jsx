import { MapContainer, TileLayer, Marker } from 'react-leaflet'

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">' +
    'OpenStreetMap</a> contributors'

const LeafletMap = () => {
    
    return (
        
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ width: '100%', height: '100%' }}>
            
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution={attribution} />
            
            <Marker position={[51.505, -0.09]} />
        
        </MapContainer>
    )
    
}

export default LeafletMap
