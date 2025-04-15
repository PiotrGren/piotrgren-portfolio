import { createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation()

  const language = {
    code: i18n.language,
    name: getLanguageName(i18n.language), // funkcja pomocnicza
    flag: getLanguageFlag(i18n.language),
    changeLanguage: i18n.changeLanguage,
  }

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

// pomocnicze funkcje
function getLanguageName(code: string) {
  const map: Record<string, string> = {
    pl: 'Polski', en: 'English', es: 'Español', it: 'Italiano', de: 'Deutsch'
  }
  return map[code] || code
}

function getLanguageFlag(code: string) {
  const map: Record<string, string> = {
    pl: 'https://flagcdn.com/pl.svg',
    en: 'https://flagcdn.com/gb.svg',
    es: 'https://flagcdn.com/es.svg',
    it: 'https://flagcdn.com/it.svg',
    de: 'https://flagcdn.com/de.svg',
  }
  return map[code] || ''
}
