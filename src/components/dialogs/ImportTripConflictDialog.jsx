import { useMemo } from 'react'
import ConfirmDialog from '@/components/ConfirmDialog'
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const ImportTripConflictDialog = ({
    overwriteTripDialogOpen,
    onConflictAction,
    setOnConflictAction,
    pendingImportData,
    setPendingImportData,
    setOverwriteTripDialogOpen,
    continueRestoreTrip,
}) => {
    
    const confirmProps = useMemo(() => ({
        label: onConflictAction === 'overwrite'
            ? 'Overwrite'
            : onConflictAction === 'duplicate'
                ? 'Duplicate'
                : 'Select',
        disabled: !onConflictAction || onConflictAction === 'ask',
    }), [onConflictAction])
    
    return (
        
        <ConfirmDialog
            open={overwriteTripDialogOpen}
            title="Overwrite Trip"
            message={<>
                
                <p>
                    Trip <i>{pendingImportData?.trip?.name}</i> or it's segments
                    already exist. Do you want to overwrite or duplicate?
                </p>
                
                <div className="my-4">
                    
                    <RadioGroup defaultValue={onConflictAction}>
                        
                        <div className="flex items-center gap-3">
                            <RadioGroupItem
                                id="r1"
                                value="duplicate"
                                onClick={() => setOnConflictAction('duplicate')} />
                            <Label htmlFor="r1">Duplicate</Label>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <RadioGroupItem
                                id="r2"
                                value="overwrite"
                                onClick={() => setOnConflictAction('overwrite')} />
                            <Label htmlFor="r2">Overwrite</Label>
                        </div>
                    
                    </RadioGroup>
                
                </div>
            
            </>}
            cancelLabel="Cancel"
            onCancel={() => {
                setPendingImportData(null)
                setOverwriteTripDialogOpen(false)
            }}
            confirmLabel={confirmProps.label}
            confirmProps={{
                disabled: confirmProps.disabled,
            }}
            onConfirm={continueRestoreTrip} />
        
    )
    
}

export default ImportTripConflictDialog
