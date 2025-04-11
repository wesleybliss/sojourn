import { useRef, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

/**
 * @typedef {object} IndeterminateCheckboxProps
 * @property {boolean} checked - Whether the checkbox is checked.
 * @property {boolean} indeterminate - Whether the checkbox is in indeterminate state.
 * @property {function(boolean): void} onChange - Callback for when the checked state changes.
 */

/**
 * @param {IndeterminateCheckboxProps} props
 */
const IndeterminateCheckbox = ({
    checked,
    indeterminate,
    onChange,
    ...props
}) => {
    
    const ref = useRef(null)
    
    useEffect(() => {
        
        if (ref.current)
            ref.current.indeterminate = indeterminate
        
    }, [indeterminate])
    
    return (
        
        <Checkbox
            checked={checked}
            ref={ref}
            onCheckedChange={onChange}
            {...props} />
        
    )
}


export default IndeterminateCheckbox
