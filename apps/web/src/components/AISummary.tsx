import { useCallback, useMemo, useState } from 'react'
import { SummarizerOptions } from '@repo/shared/types/summarizer'

interface AISummaryProps extends SummarizerOptions {
    text: string
    format?: 'markdown' | 'plain-text'
    className?: string
}

type SummaryState =
    | 'idle'
    | 'checking'
    | 'downloading'
    | 'ready'
    | 'summarizing'
    | 'done'
    | 'error'
    | 'unsupported'

export function AISummary({
    text,
    type = 'tldr',
    length = 'short',
    format = 'markdown',
    className,
}: AISummaryProps) {
    
    const [summary, setSummary] = useState('')
    const [state, setState] = useState<SummaryState>('idle')
    const [error, setError] = useState<string | null>(null)
    const [downloadProgress, setDownloadProgress] = useState(0)
    
    const supported = useMemo(() => {
        return typeof window !== 'undefined'
            && 'Summarizer' in window
    }, [])
    
    const summarize = useCallback(async () => {
        
        if (!supported) {
            setState('unsupported')
            return
        }
        
        try {
            
            setError(null)
            setState('checking')
            
            const availability = await Summarizer!.availability()
            
            if (availability === 'unavailable') {
                setState('unsupported')
                return
            }
            
            setState(
                availability === 'downloadable'
                    ? 'downloading'
                    : 'ready'
            )
            
            const summarizer = await Summarizer!.create({
                type,
                length,
                format,
                
                monitor: {
                    ondownloadprogress(e: { loaded: number }) {
                        setDownloadProgress(
                            Math.round(e.loaded * 100),
                        )
                    },
                },
            })
            
            setState('summarizing')
            
            const result = await summarizer.summarize(text)
            
            setSummary(result)
            setState('done')
            
        } catch (err) {
            
            console.error(err)
            
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to summarize text',
            )
            
            setState('error')
            
        }
        
    }, [format, length, supported, text, type])
    
    if (!supported)
        return (
            <div className={className}>
                Browser does not support the AI Summarizer API.
            </div>
        )
    
    return (
        
        <div className={className}>
            
            <button
                type="button"
                onClick={summarize}
                disabled={
                    state === 'summarizing'
                    || state === 'downloading'
                }>
                Summarize
            </button>
            
            {state === 'downloading' && (
                <div>
                    Downloading AI model... {downloadProgress}%
                </div>
            )}
            
            {state === 'summarizing' && (
                <div>
                    Summarizing...
                </div>
            )}
            
            {error && (
                <div>
                    {error}
                </div>
            )}
            
            {summary && (
                format === 'markdown'
                    ? (
                        <pre>
                            {summary}
                        </pre>
                    )
                    : (
                        <p>
                            {summary}
                        </p>
                    )
            )}
        
        </div>
        
    )
    
}
