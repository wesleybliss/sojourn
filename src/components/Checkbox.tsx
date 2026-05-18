import { Checkbox } from '@/components/ui/checkbox'

interface IndeterminateCheckboxProps {
    checked: boolean
    indeterminate: boolean
    onChange: (checked: boolean) => void
}

const IndeterminateCheckbox = ({
    checked,
    indeterminate,
    onChange,
    ...props
}: IndeterminateCheckboxProps) => {
    
    return (
        
        <Checkbox
            checked={indeterminate ? 'indeterminate' : checked}
            onCheckedChange={value => onChange(value === true)}
            {...props} />
        
    )
    
}

export default IndeterminateCheckbox
