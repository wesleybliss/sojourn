
const pathA = 'M432,185H267.1l-24.3-25.7c-7.3-7.7-17.5-12.1-28.1-12.1H80c-22.1,0-40,17.9-40,40v214.4c0,35.1,'
const pathB = '28.4,63.6,63.5,63.6h294c32.7,0,60.1-24.8,63.6-57.3l23.5-216.4C488.5,206.5,464.3,185,432,185z'

// Example class:
// w-6 h-6 fill-current text-gray-500 hover:text-blue-500 transition-colors
// size-25 text-red-500

interface SadFolderIconProps {
    className?: string
}

const SadFolderIcon = ({
    className,
    ...props
}: SadFolderIconProps) => {
    
    return (
        
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`stroke-current ${className ?? ''}`}
            fill="none"
            {...props}>
            
            <path
                d={`${pathA}${pathB}`}
                stroke="currentColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"/>
            
            <path
                d="M416,147.2V120c0-22.1-17.9-40-40-40H120c-22.1,0-40,17.9-40,40v27.2"
                stroke="currentColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"/>
            
            <line x1="135" y1="260" x2="195" y2="320" stroke="currentColor" strokeWidth="24" strokeLinecap="round"/>
            <line x1="195" y1="260" x2="135" y2="320" stroke="currentColor" strokeWidth="24" strokeLinecap="round"/>
            
            <line x1="315" y1="260" x2="375" y2="320" stroke="currentColor" strokeWidth="24" strokeLinecap="round"/>
            <line x1="375" y1="260" x2="315" y2="320" stroke="currentColor" strokeWidth="24" strokeLinecap="round"/>
            
            <path d="M190,410 c40-40,90-40,130,0" fill="none" stroke="currentColor"
                strokeWidth="24" strokeLinecap="round"/>
            
            <line x1="420" y1="60" x2="440" y2="30" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
            <line x1="465" y1="85" x2="500" y2="75" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
            <line x1="460" y1="130" x2="495" y2="145" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
        
        </svg>
        
    )
    
}

export default SadFolderIcon
