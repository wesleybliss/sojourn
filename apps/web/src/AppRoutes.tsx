import { Outlet, Route, Routes } from 'react-router'

import AppLayout from '@/layouts/AppLayout'
import AutoTeamLayout from '@/layouts/AutoTeamLayout'
import DebugLayout from '@/layouts/DebugLayout'
import TeamsLayout from '@/layouts/TeamsLayout'
import TeamsProtectedLayout from '@/layouts/TeamsProtectedLayout'
import { Navigate } from '@/lib/router'
import DebugCitySearch from '@/routes/debug/city-search/page'
import DebugGeocodeTool from '@/routes/debug/geocode-tool/page'
import DebugMigrateTripsToPlans from '@/routes/debug/migrate-trips-plans/page'
import DebugPage from '@/routes/debug/page'
import DebugPlacesListPage from '@/routes/debug/places/page'
import DebugUploadFileBlobStorage from '@/routes/debug/storage/page'
import ErrorPage from '@/routes/error/page'
import ImportTripsPage from '@/routes/import-trips/page'
import LoginPage from '@/routes/login/page'
import HomePage from '@/routes/page'
import PlacesPage from '@/routes/places/PlacesPage'
import SignupPage from '@/routes/signup/page'
import CreateTeamPage from '@/routes/teams/CreateTeamPage'
import TeamsPage from '@/routes/teams/TeamsPage'
import TripPage from '@/routes/trips/[tripId]/page'
import PlanDetail from '@/routes/trips/[tripId]/plans/[planId]/page'
import Plans from '@/routes/trips/[tripId]/plans/page'
import TripsRoute from '@/routes/trips/page'

const ToDo = ({ msg }: { msg: string }) => (
    <p>ToDo: @todo {msg}</p>
)

const TempOutlet = () => <Outlet />

const AppRoutes = () => {
    
    return (
        
        <Routes>
            
            <Route element={<AutoTeamLayout />}>
                
                <Route element={<AppLayout />}>
                    
                    <Route index element={<ToDo msg="1" />} />
                    
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    
                    <Route path="error" element={<ErrorPage />} />
                    
                    <Route path="teams" element={<TeamsLayout />}>
                        <Route index element={<TeamsPage />} />
                        <Route path="create" element={<CreateTeamPage />} />
                    </Route>
                    
                    <Route element={<TeamsProtectedLayout />}>
                        
                        <Route index element={<ToDo msg="2" />} />
                        
                        <Route path=":teamId" element={<TempOutlet />}>
                            
                            {/*<Route index element={<TeamPage />} />*/}
                            <Route index element={<HomePage />} />
                            
                            <Route path="trips" element={<TripsRoute />} />
                            <Route path="trips/:tripId" element={<TripPage />} />
                            <Route path="trips/:tripId/plans" element={<Plans />} />
                            <Route path="trips/:tripId/plans/:planId" element={<PlanDetail />} />
                            <Route path="trips/import" element={<ImportTripsPage />} />
                            <Route path="places" element={<PlacesPage />} />
                            
                            <Route path="debug" element={<DebugLayout />}>
                                <Route index element={<DebugPage />} />
                                <Route path="places" element={<DebugPlacesListPage />} />
                                <Route path="storage" element={<DebugUploadFileBlobStorage />} />
                                <Route path="migrate-trips-plans" element={<DebugMigrateTripsToPlans />} />
                                <Route path="geocode-tool" element={<DebugGeocodeTool />} />
                                <Route path="city-search" element={<DebugCitySearch />} />
                            </Route>
                        
                        </Route>
                    
                    </Route>
                    
                    <Route path="*" element={<Navigate href="/" replace />} />
                
                </Route>
            
            </Route>
        
        </Routes>
        
    )
    
}

export default AppRoutes
