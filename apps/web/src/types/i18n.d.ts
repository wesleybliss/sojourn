import type enTranslation from '../../public/locales/en/translation.json'

// Declare the type of your resources
declare module 'i18next' {

    interface CustomTypeOptions {
        defaultNS: 'translation'
        resources: {
            translation: typeof enTranslation
        }
        enableSelector: true
    }

}
