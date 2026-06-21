import '@/routes/globals.css'
import '@/lib/styles/gantt.css'
import '@/lib/i18n'

import { NS } from '@repo/shared/constants'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import * as rwp from 'react-wire-persisted'

import App from '@/App'

rwp.setNamespace(NS)
rwp.setOptions({
    logging: {
        enabled: false, //!import.meta.env.PROD,
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
