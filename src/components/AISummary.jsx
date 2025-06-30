import { useState, useEffect } from 'react'

const AISummary = ({
    context,
    text,
}) => {
    
    const [summarizer, setSummarizer] = useState('')
    const [summary, setSummary] = useState('')
    
    useEffect(() => {
        
        console.log('AISummary#hook summarizer creating Summarizer instance')
        
        if (!text?.length) return
        
        // eslint-disable-next-line no-undef
        if (!Summarizer)
            return console.warn('AISummary#hook summarizer Summarizer not found')
        
        // eslint-disable-next-line no-undef
        Summarizer.create({
            sharedContext: context,
            type: 'tldr',
            length: 'short',
            format: 'text', //'markdown',
            expectedInputLanguages: ['en-US'],
            outputLanguage: 'en-US',
        }).then(it => setSummarizer(it))
            .catch(e => console.error('AISummary#hook summarizer', e))
        
    }, [context])
    
    useEffect(() => {
        
        console.log('AISummary#hook summary creating summary', summarizer, text)
        
        if (!text?.length) return
        if (!summarizer) return
        
        summarizer.summarize(text)
            .then(it => setSummary(it))
            .catch(e => console.error('AISummary#hook summary', e))
        
    }, [text, summarizer])
    
    return (
        
        <div>
            {summary}
        </div>
        
    )
    
}

export default AISummary
