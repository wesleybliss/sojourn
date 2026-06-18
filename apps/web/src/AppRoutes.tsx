import { Outlet, Route, Routes } from 'react-router'

import ProtectedLayout from '@/components/ProtectedLayout'
import AppLayout from '@/layouts/AppLayout'
import AutoTeamLayout from '@/layouts/AutoTeamLayout'
import DebugLayout from '@/layouts/DebugLayout'
import PlansLayout from '@/layouts/PlansLayout'
import TeamsLayout from '@/layouts/TeamsLayout'
import TeamsProtectedLayout from '@/layouts/TeamsProtectedLayout'
import TripLayout from '@/layouts/TripLayout'
import TripsLayout from '@/layouts/TripsLayout'
import { Navigate } from '@/lib/router'
import CitiesBrowserPage from '@/routes/debug/cities-browser/CitiesBrowserPage'
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
            
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            
            <Route path="error" element={<ErrorPage />} />
            
            <Route element={<AppLayout />}>
                <Route path="debug" element={<DebugLayout />}>
                    <Route index element={<DebugPage />} />
                    <Route path="places" element={<DebugPlacesListPage />} />
                    <Route path="storage" element={<DebugUploadFileBlobStorage />} />
                    <Route path="migrate-trips-plans" element={<DebugMigrateTripsToPlans />} />
                    <Route path="geocode-tool" element={<DebugGeocodeTool />} />
                    <Route path="cities-browser" element={<CitiesBrowserPage />} />
                    <Route path="city-search" element={<DebugCitySearch />} />
                </Route>
            </Route>
            
            <Route element={<ProtectedLayout />}>
                <Route path="teams/create" element={<CreateTeamPage />} />
            </Route>
            
            <Route element={<AppLayout />}>
                <Route path="teams" element={<TeamsLayout />}>
                    <Route index element={<TeamsPage />} />
                    {/*<Route path="create" element={<CreateTeamPage />} />*/}
                </Route>
            </Route>
            
            <Route element={<AutoTeamLayout />}>
                
                <Route element={<AppLayout />}>
                    
                    <Route index element={<ToDo msg="1" />} />
                    
                    <Route element={<TeamsProtectedLayout />}>
                        
                        <Route index element={<ToDo msg="2" />} />
                        
                        {/*<Route path="teams" element={<TeamsLayout />}>*/}
                        {/*    <Route index element={<TeamsPage />} />*/}
                        {/*    /!*<Route path="create" element={<CreateTeamPage />} />*!/*/}
                        {/*</Route>*/}
                        
                        <Route path=":teamId" element={<TempOutlet />}>
                            
                            {/*<Route index element={<TeamPage />} />*/}
                            <Route index element={<HomePage />} />
                            
                            <Route path="trips" element={<TripsLayout />}>
                                
                                <Route index element={<TripsRoute />} />
                                
                                <Route path="import" element={<ImportTripsPage />} />
                                
                                <Route path=":tripId" element={<TripLayout />}>
                                    
                                    <Route index element={<TripPage />} />
                                    
                                    <Route path="plans" element={<PlansLayout />}>
                                        
                                        <Route index element={<Plans />} />
                                        
                                        <Route path=":planId" element={<PlanDetail />} />
                                    
                                    </Route>
                                
                                </Route>
                            
                            </Route>
                            
                            <Route path="places" element={<PlacesPage />} />
                        
                        </Route>
                    
                    </Route>
                
                </Route>
            
            </Route>
            
            <Route path="*" element={<Navigate href="/" replace />} />
        
        </Routes>
        
    )
    
}

export default AppRoutes
