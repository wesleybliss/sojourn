import { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'

const EditableTextField = ({
    value = '',
    onChange,
    as: Element = 'h2',
    elementProps = {},
    children,
    ...props
} = {}) => {
    
    const [isEditing, setIsEditing] = useState(false)
    const [pendingValue, setPendingValue] = useState(value)
    
    const handleChange = useCallback(() => {
        
        onChange(pendingValue)
        setIsEditing(false)
        
    }, [pendingValue])
    
    return isEditing ? (
        <Input
            type="text"
            {...props}
            value={pendingValue || ''}
            onChange={e => setPendingValue(e.target.value)}
            onBlur={handleChange}
            onFocus={e => e.target.select()}
            onKeyUp={e => e.key === 'Enter' && handleChange()}
            autoFocus />
    ) : (
        <div className="flex items-center gap-4">
            <Element
                {...elementProps}
                onDoubleClick={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}>
                {value}
            </Element>
            {children}
        </div>
    )
    
}

export default EditableTextField
