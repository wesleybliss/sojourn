import { useMemo, useState } from 'react'
import { loadImageAsync } from '@/lib/utils'
import useAbortableFetch from '@/lib/hooks/useAbortableFetch'
import { cn } from '@/lib/utils'
import md5 from 'md5'

const Gravatar = ({
    className,
    user,
    imageClassName,
    size = 30,
    children,
}) => {
    
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [userInitials, setUserInitials] = useState('')
    
    const url = useMemo(() => {
        
        // Allow passing an email directly, otherwise default to the user's email
        const value = user?.email ?? null
        const hash = value ? md5(value.toLowerCase()) : null
        
        return hash ? `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404` : null
        
    }, [size])
    
    useAbortableFetch(() => {
        
        setLoading(true)
        
        loadImageAsync(url)
            .then(it => setImageUrl(it.dataUrl))
            .catch(() => setUserInitials(user?.email?.substring(0, 1) ?? '??'))
            .finally(() => setLoading(false))
        
    }, [url], 500)
    
    return (
        
        <div
            className={cn('Gravatar rounded-full outline-none transition-all ease-in-out duration-500', className, {
                'bg-base-200': !loading && !imageUrl,
            })}
            style={{ '--size': `${size}px` }}>
            
            {imageUrl ? (
                <img className={imageClassName} src={imageUrl} alt={userInitials} />
            ) : (
                <span className="text-xs">{userInitials}</span>
            )}
            
            {children}
        
        </div>
        
    )
    
}

export default Gravatar
