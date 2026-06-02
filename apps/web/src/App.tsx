import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Route, Routes } from 'react-router'
import * as rwp from 'react-wire-persisted'

import useDebug from '@/hooks/useDebug'
import AppLayout from '@/layouts/AppLayout'
import DebugLayout from '@/layouts/DebugLayout'
import { Navigate } from '@/lib/router'
import DebugGeocodeTool from '@/routes/debug/geocode-tool/page'
import DebugMigrateTripsToPlans from '@/routes/debug/migrate-trips-plans/page'
import DebugPage from '@/routes/debug/page'
import DebugPlacesListPage from '@/routes/debug/places/page'
import DebugUploadFileBlobStorage from '@/routes/debug/storage/page'
import ErrorPage from '@/routes/error/page'
import ImportTripsPage from '@/routes/import-trips/page'
import LoginPage from '@/routes/login/page'
import HomePage from '@/routes/page'
import PlacesPage from '@/routes/places/page'
import SignupPage from '@/routes/signup/page'
import TripPage from '@/routes/trips/[tripId]/page'
import PlanDetail from '@/routes/trips/[tripId]/plans/[planId]/page'
import Plans from '@/routes/trips/[tripId]/plans/page'
import TripsRoute from '@/routes/trips/page'

dayjs.extend(advancedFormat)

const App = () => {
    
    rwp.useHydration()
    
    useDebug()
    
    return (
        
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="trips" element={<TripsRoute />} />
                <Route path="trips/:tripId" element={<TripPage />} />
                <Route path="trips/:tripId/plans" element={<Plans />} />
                <Route path="trips/:tripId/plans/:planId" element={<PlanDetail />} />
                <Route path="places" element={<PlacesPage />} />
                <Route path="import-trips" element={<ImportTripsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="error" element={<ErrorPage />} />
                <Route path="debug" element={<DebugLayout />}>
                    <Route index element={<DebugPage />} />
                    <Route path="places" element={<DebugPlacesListPage />} />
                    <Route path="storage" element={<DebugUploadFileBlobStorage />} />
                    <Route path="migrate-trips-plans" element={<DebugMigrateTripsToPlans />} />
                    <Route path="geocode-tool" element={<DebugGeocodeTool />} />
                </Route>
                <Route path="*" element={<Navigate href="/" replace />} />
            </Route>
        </Routes>
        
    )
    
}

export default App
