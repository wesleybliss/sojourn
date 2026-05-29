import { ShengenData } from '@repo/shared/types'

interface TripDetailComplianceCardProps {
    shengenData: ShengenData | null
}

const TripDetailComplianceCard = ({
    shengenData,
}: TripDetailComplianceCardProps) => {
    
    const schengenPercentage = Math.max(0, Math.min(100, ((shengenData?.totalDays || 0) / 90) * 100))
    const schengenCircumference = 2 * Math.PI * 44
    const schengenOffset = schengenCircumference * (1 - schengenPercentage / 100)
    
    return (
        
        <article data-testid="TripDetailComplianceCard" className="section-card p-5">
            <div className="eyebrow mb-4">Compliance</div>
            <div className="flex items-center gap-5">
                <div className="relative flex size-30 items-center justify-center">
                    <svg className="-rotate-90" height="112" width="112">
                        <circle
                            className="stroke-border"
                            cx="56"
                            cy="56"
                            fill="none"
                            r="44"
                            strokeWidth="10" />
                        <circle
                            className="stroke-primary"
                            cx="56"
                            cy="56"
                            fill="none"
                            r="44"
                            strokeDasharray={schengenCircumference}
                            strokeDashoffset={schengenOffset}
                            strokeLinecap="round"
                            strokeWidth="10" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-headline text-2xl font-semibold">
                            {Math.round(schengenPercentage)}%
                        </span>
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Used
                        </span>
                    </div>
                </div>
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-[-0.04em]">
                        Schengen Stay Tracker
                    </h2>
                    <div className="text-sm text-muted-foreground">
                        {shengenData
                            ? `${shengenData.totalDays} days logged in the current 90-day window.`
                            : 'No Schengen-tagged segments in this plan yet.'}
                    </div>
                    {shengenData && (
                        <div className="grid gap-2 text-sm">
                            <div className="rounded-2xl bg-surface-container-low px-3 py-2">
                                Window: {shengenData.startDate.format('MMM D')}
                                &nbsp;-&nbsp;
                                {shengenData.endDate.format('MMM D, YYYY')}
                            </div>
                            <div className="rounded-2xl bg-surface-container-low px-3 py-2">
                                Remaining: {shengenData.remainingDays} days
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
        
    )
    
}

export default TripDetailComplianceCard
