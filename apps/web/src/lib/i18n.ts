import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
    .use(HttpBackend)        // loads translations from /public/locales
    .use(LanguageDetector)   // detects user language
    .use(initReactI18next)   // passes i18n instance to react-i18next
    .init({
        fallbackLng: 'en',   // default language if detection fails
        debug: true,         // shows helpful logs in dev (turn off in production)
        interpolation: {
            escapeValue: false,  // React already safes from XSS
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        enableSelector: true,
    })

export default i18n
