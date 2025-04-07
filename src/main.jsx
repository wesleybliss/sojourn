import { createRoot } from 'react-dom/client'
import { NS } from '@/constants'
import { setNamespace } from 'react-wire-persisted'
import App from '@/components/App'
import '@/styles/index.css'

const useStrictMode = false

setNamespace(NS)

// eslint-disable-next-line no-restricted-globals
const container = document.getElementById('root')
const root = createRoot(container)

root.render(useStrictMode ? (
    <React.StrictMode>
        <App />
    </React.StrictMode>
) : (
    <App />
))
