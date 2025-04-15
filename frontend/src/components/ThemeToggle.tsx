import { useTheme } from "../context/ThemeContext"
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import TooltipWrapper from './TooltipWrapper'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    const { t } = useTranslation()

    return (
        <TooltipWrapper label={t('navbar.tooltips.theme')}>
            <button
                onClick={toggleTheme}
                className="themetoggle-button"
            >
                <motion.div
                    key={theme}
                    initial={{rotate: -90, opacity: 0}}
                    animate={{ rotate: 0, opacity: 1}}
                    exit={{ rotate: 90, opacity: 0}}
                    transition={{ duration: 0.4 }}
                >
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
            </button>
        </TooltipWrapper>
    )
}