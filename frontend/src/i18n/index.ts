import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


// Import tłumaczeń
import en from '../data/translation/en.json'
import pl from '../data/translation/pl.json'
import es from '../data/translation/es.json'
import it from '../data/translation/it.json'
import de from '../data/translation/de.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pl: { translation: pl },
            es: { translation: es },
            it: { translation: it },
            de: { translation: de },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n