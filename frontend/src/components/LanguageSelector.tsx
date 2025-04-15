import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion'
import TooltipWrapper from './TooltipWrapper'

const languages = [
    { code: 'pl', label: 'PL', flag: 'https://flagcdn.com/pl.svg'},
    { code: 'en', label: 'EN', flag: 'https://flagcdn.com/us.svg'},
    { code: 'es', label: 'ES', flag: 'https://flagcdn.com/es.svg'},
    { code: 'it', label: 'IT', flag: 'https://flagcdn.com/it.svg'},
    { code: 'de', label: 'DE', flag: 'https://flagcdn.com/de.svg'},
]

export default function LanguageSelector () {
    const { i18n } = useTranslation()
    const [open, setOpen] = useState(false)

    const { t } = useTranslation()

    const current = languages.find(lang => lang.code === i18n.language) || languages[0]

    return (
        <div className="relative ml-1 overflow-visible">
            <TooltipWrapper label={t('navbar.tooltips.language')}>
                <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
                    <img src={current.flag} alt={current.label} className="w-6 h-4 rounded shadow" />
                    <motion.div
                        animate={{ rotate: open ? 180 : 0}}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </button>
            </TooltipWrapper>
            <AnimatePresence>
                {open && (
                        <motion.div
                            className="langList"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        i18n.changeLanguage(lang.code)
                                        setOpen(false)
                                    }}
                                    className="langList-button"
                                >
                                    <img src={lang.flag} alt={lang.label} className="w-5 h-3 mr-2 rounded" />
                                    {lang.label}
                                </button>
                            ))}
                        </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}