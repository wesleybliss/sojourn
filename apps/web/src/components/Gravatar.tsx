import { User } from '@repo/shared/types/database'
import { loadImageAsync } from '@repo/shared/utils'
import { cn } from '@repo/shared/utils'
import md5 from 'md5'
import { CSSProperties, JSX, ReactNode, useMemo, useState } from 'react'

import useAbortableFetch from '@/hooks/useAbortableFetch'

type CSSVars = CSSProperties & {
    '--size'?: string
}

interface GravatarProps {
    className?: string | undefined
    user: User
    imageClassName?: string | undefined
    size?: number
    children?: ReactNode | JSX.Element
}

const Gravatar = ({
    className,
    user,
    imageClassName,
    size = 30,
    children,
}: GravatarProps) => {
    
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [userInitials, setUserInitials] = useState<string>('')
    
    const url = useMemo(() => {
        
        // Allow passing an email directly, otherwise default to the user's email
        const value = user?.email ?? null
        const hash = value ? md5(value.toLowerCase()) : null
        
        return hash ? `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404` : null
        
    }, [size, user?.email])
    
    useAbortableFetch(() => {
        
        if (!url?.length) return
        
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
            style={{ '--size': `${size}px` } as CSSVars}>
            
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
