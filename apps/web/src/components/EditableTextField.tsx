import { useState, useCallback, JSX, ReactNode } from 'react'
import { Input } from '@/components/ui/input'

interface EditableTextFieldProps {
    value?: string
    onChange: (value: string) => void
    as?: keyof JSX.IntrinsicElements
    elementProps?: Record<string, unknown>
    placeholder?: string
    children?: ReactNode
}

const EditableTextField = ({
    value = '',
    onChange,
    as: Element = 'h2',
    elementProps = {},
    placeholder,
    children,
    ...props
}: EditableTextFieldProps) => {
    
    const [isEditing, setIsEditing] = useState(false)
    const [pendingValue, setPendingValue] = useState(value)
    
    const handleChange = useCallback(() => {
        
        onChange(pendingValue)
        setIsEditing(false)
        
    }, [pendingValue, onChange])
    
    return isEditing ? (
        <Input
            type="text"
            {...props}
            value={pendingValue || ''}
            placeholder={placeholder || undefined}
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
