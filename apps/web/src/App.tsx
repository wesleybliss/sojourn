import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Route, Routes } from 'react-router'

import DebugMigrateTripsToPlans from '@/app/debug/migrate-trips-plans/page'
import DebugPage from '@/app/debug/page'
import DebugPlacesListPage from '@/app/debug/places/page'
import DebugUploadFileBlobStorage from '@/app/debug/storage/page'
import ErrorPage from '@/app/error/page'
import ImportTripsPage from '@/app/import-trips/page'
import LoginPage from '@/app/login/page'
import HomePage from '@/app/page'
import PlacesPage from '@/app/places/page'
import SignupPage from '@/app/signup/page'
import TripPage from '@/app/trips/[tripId]/page'
import PlanDetail from '@/app/trips/[tripId]/plans/[planId]/page'
import Plans from '@/app/trips/[tripId]/plans/page'
import TripsRoute from '@/app/trips/page'
import AppLayout from '@/layouts/AppLayout'
import DebugLayout from '@/layouts/DebugLayout'
import { Navigate } from '@/lib/router'

dayjs.extend(advancedFormat)

const App = () => {
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
                </Route>
                <Route path="*" element={<Navigate href="/" replace />} />
            </Route>
        </Routes>
    )
}

export default App
