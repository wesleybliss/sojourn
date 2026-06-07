import { Outlet } from 'react-router'

import useRequireTeam from '@/hooks/useRequireTeam'

const AutoTeamLayout = () => {
    
    const { error, currentTeamId } = useRequireTeam()
    
    if (error) return (
        <div>Error: {error.message}</div>
    )
    
    if (!currentTeamId) return (
        <div>Loading2...</div>
    )
    
    return <Outlet />
    
}

export default AutoTeamLayout
