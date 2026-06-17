import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Dispatch, MouseEvent, SetStateAction, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export interface CitiesBrowserPaginationProps {
    total: number
    pageIndex: number
    setPageIndex: Dispatch<SetStateAction<number>>
    rowsPerPage: number
    setRowsPerPage: Dispatch<SetStateAction<number>>
}

const VISIBLE_PAGES = 50
const HALF_WINDOW = Math.floor(VISIBLE_PAGES / 2)

const CitiesBrowserPagination = ({
    total,
    pageIndex,
    setPageIndex,
    rowsPerPage,
    setRowsPerPage,
}: CitiesBrowserPaginationProps) => {
    
    const totalPages = useMemo(() => (
        Math.ceil(total / rowsPerPage) || 0
    ), [total, rowsPerPage])
    
    const currentPage = useMemo(() => pageIndex + 1, [pageIndex])
    
    /*const pageNumbers = useMemo(() => Array.from(
        { length: Math.ceil(totalPages) },
        (_, i) => i + 1,
    ).slice(0, 100), [totalPages])*/
    
    const pageNumbers = useMemo(() => {
        
        if (totalPages <= VISIBLE_PAGES)
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        
        // Calculate window start, keeping current page near middle when possible
        let start = currentPage - HALF_WINDOW
        let end = start + VISIBLE_PAGES - 1
        
        // Adjust if window goes past start
        if (start < 1) {
            start = 1
            end = VISIBLE_PAGES
        }
        
        // Adjust if window goes past end
        if (end > totalPages) {
            end = totalPages
            start = totalPages - VISIBLE_PAGES + 1
        }
        
        return Array.from({
            length: end - start + 1,
        }, (_, i) => start + i)
        
    }, [totalPages, currentPage])
    
    const prevPage = (increment: number = 1) => (e: MouseEvent) => {
        e.preventDefault()
        setPageIndex(prev => prev - increment)
    }
    
    const nextPage = (increment: number = 1) => (e: MouseEvent) => {
        e.preventDefault()
        setPageIndex(prev => prev + increment)
    }
    
    const updateRowsPerPage = (value: string) => {
        setRowsPerPage(parseInt(value, 10))
    }
    
    const updateCurrentPage = (value: string) => {
        setPageIndex(parseInt(value, 10) - 1)
    }
    
    return (
        
        <div className="w-auto max-w-fit flex items-center justify-between gap-4">
            
            <Field orientation="horizontal" className="w-fit">
                
                <FieldLabel htmlFor="select-rows-per-page">
                    Rows per page
                </FieldLabel>
                
                <Select defaultValue={rowsPerPage.toString()} onValueChange={updateRowsPerPage}>
                    <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            
            </Field>
            
            <Pagination className="mx-0 w-auto">
                
                <PaginationContent>
                    
                    <PaginationItem>
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={prevPage(500)}>
                            <ChevronsLeft />
                            <code>500</code>
                        </Button>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={prevPage(100)}>
                            <ChevronsLeft />
                            <code>100</code>
                        </Button>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={prevPage()} />
                    </PaginationItem>
                    
                    <Select value={currentPage.toString()} onValueChange={updateCurrentPage}>
                        <SelectTrigger className="w-20" id="select-page-index">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                {pageNumbers.map(it => (
                                    <SelectItem key={`CitiesBrowserPagination-pages-${it}`} value={it.toString()}>
                                        {it}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    
                    <PaginationItem>
                        <PaginationNext href="#" onClick={nextPage()} />
                    </PaginationItem>
                    
                    <PaginationItem>
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={nextPage(100)}>
                            <code>100</code>
                            <ChevronsRight />
                        </Button>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={nextPage(500)}>
                            <code>500</code>
                            <ChevronsRight />
                        </Button>
                    </PaginationItem>
                
                </PaginationContent>
            
            </Pagination>
        
        </div>
        
    )
    
}

export default CitiesBrowserPagination
