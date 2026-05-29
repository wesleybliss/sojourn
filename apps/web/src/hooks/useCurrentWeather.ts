import { weatherCodeMap } from '@repo/shared/constants'
import { Segment, WeatherSummary } from '@repo/shared/types'
import { useEffect, useState } from 'react'

const useCurrentWeather = (segment?: Segment): WeatherSummary | null => {
    
    const [weather, setWeather] = useState<WeatherSummary | null>(null)
    
    useEffect(() => {
        
        const latitude = segment?.coordsLat
        const longitude = segment?.coordsLng
        
        if (!latitude || !longitude) {
            setWeather(null)
            return
        }
        
        const controller = new AbortController()
        
        fetch(
            'https://api.open-meteo.com/v1/forecast?' +
            `latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
            { signal: controller.signal },
        )
            .then(async response => response.json())
            .then(data => {
                const current = data?.current
                
                if (!current)
                    return setWeather(null)
                
                setWeather({
                    temperature: Math.round(current.temperature_2m),
                    label: weatherCodeMap[current.weather_code] || 'Conditions',
                })
            })
            .catch(error => {
                if (error?.name !== 'AbortError')
                    console.error('TripDetail.useCurrentWeather', error)
                
                setWeather(null)
            })
        
        return () => controller.abort()
    }, [segment?.coordsLat, segment?.coordsLng])
    
    return weather
}

export default useCurrentWeather
