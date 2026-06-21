import { ItemWithId } from '@repo/shared/types/data.types'
import { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { cn } from '@/utils'

interface SearchItemsDialogProps<T extends ItemWithId> {
    className?: string
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    description?: string
    queryFn: (query: string) => UseQueryResult<T[] | null | undefined>
    placeholder?: string
    submitLabel?: string
    onSubmit?: (value: T) => Promise<void>
    getItemKey?: (item: T) => string | number
    renderItem: (item: T) => React.ReactNode
}

const SearchItemsDialog = <T extends ItemWithId,>({
    className = '',
    open = false,
    setOpen = () => {},
    title = '',
    description = '',
    queryFn,
    placeholder = '',
    submitLabel = 'submit',
    onSubmit = async (_value: T) => {},
    getItemKey = (item: T) => item.id,
    renderItem,
}: SearchItemsDialogProps<T>) => {
    
    const [query, setQuery] = useState<string>('')
    const [value, setValue] = useState<T | null>(null)
    
    const debouncedQuery = useDebounce(query, 300)
    
    const {
        data,
        isPending,
        isError,
        error,
    } = queryFn(debouncedQuery)
    
    useEffect(() => {
        
        if (open) return
        
        setQuery('')
        setValue(null)
        
    }, [open])
    
    return (
        
        <Dialog open={open} onOpenChange={setOpen}>
            
            <DialogContent
                className={`sm:max-w-5/12 ${className}`}
                onClick={e => e.stopPropagation()}>
                
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                
                <div className="space-y-3">
                    
                    <div className="">
                        <Input
                            id="searchItemsDialogQueryInput"
                            name="searchItemsDialogQueryInput"
                            type="text"
                            placeholder={placeholder}
                            value={query}
                            autoComplete="off"
                            onChange={e => setQuery(e.target.value)} />
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto border rounded-md">
                        {isPending && (
                            <div className="p-4 text-center text-muted-foreground">
                                Loading...
                            </div>
                        )}
                        
                        {isError && (
                            <div className="p-4 text-center text-destructive">
                                Error: {error?.message || 'Failed to load results'}
                            </div>
                        )}
                        
                        {data && data.length === 0 && query && (
                            <div className="p-4 text-center text-muted-foreground">
                                No results found
                            </div>
                        )}
                        
                        {data && data.length > 0 && (
                            <ul className="divide-y">
                                {data.map((item: T) => {
                                    
                                    const itemKey = getItemKey(item)
                                    const valueKey = value ? getItemKey(value) : null
                                    
                                    return (
                                        <li
                                            key={getItemKey(item)}
                                            className={cn(
                                                'flex items-center justify-between p-2',
                                                'cursor-pointer hover:bg-accent transition-colors',
                                                {
                                                    'bg-accent': itemKey === valueKey,
                                                },
                                            )}
                                            onClick={() => onSubmit(item)}>
                                            {renderItem(item)}
                                        </li>
                                    )
                                    
                                })}
                            </ul>
                        )}
                        
                        {!query && (
                            <div className="p-4 text-center text-muted-foreground">
                                Type to search...
                            </div>
                        )}
                    </div>
                </div>
                
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={async () => {
                        
                        if (!value) return
                        
                        await onSubmit(value)
                        
                        setOpen(false)
                        
                    }}>
                        {submitLabel ?? 'Submit'}
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        
        </Dialog>
        
    )
    
}

export default SearchItemsDialog
