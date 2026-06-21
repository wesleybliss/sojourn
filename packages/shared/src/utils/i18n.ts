import countries from 'i18n-iso-countries'
import localeEn from 'i18n-iso-countries/langs/en.json'
import localeEs from 'i18n-iso-countries/langs/es.json'
import i18n from 'i18next'

export const registerLocales = () => {
    
    countries.registerLocale(localeEn)
    countries.registerLocale(localeEs)
    
}

export const getLanguageCode = (locale: string) => {
    
    try {
        return i18n.services.languageUtils.getLanguagePartFromCode(locale)
    } catch (e) {
        console.warn('getLanguageCode: i18n.services failed; falling back to Intl.Locale')
        try {
            return new Intl.Locale(locale).language
        } catch {
            console.warn('getLanguageCode: Intl.Locale also failed; falling back to naive string parsing')
            // Fallback for older browsers
            return locale.split('-')[0]
        }
    }
    
}

export const getCountryNameFromCode = (countryCode: string, lang: string) => {
    
    const languageCode = lang.length > 2
        ? getLanguageCode(lang)
        : lang
    
    return countries.getName(countryCode, languageCode)
    
}
