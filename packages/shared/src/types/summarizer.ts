export {}

interface SummarizerMonitor {
    ondownloadprogress?(event: ProgressEvent): void
}

export interface SummarizerOptions {
    type?: 'key-points' | 'tldr' | 'teaser' | 'headline'
    length?: 'short' | 'medium' | 'long'
    format?: 'plain-text' | 'markdown'
    monitor?: SummarizerMonitor
}

export type SummarizerAvailability =
    | 'unavailable'
    | 'downloadable'
    | 'ready'

export interface SummarizerInstance {
    summarize(text: string): Promise<string>
}

export interface SummarizerStatic {
    create(options?: SummarizerOptions): Promise<SummarizerInstance>
    availability(): Promise<SummarizerAvailability>
}

declare global {
    
    interface Window {
        Summarizer?: SummarizerStatic
    }
    
    var Summarizer: SummarizerStatic | undefined
    
}
