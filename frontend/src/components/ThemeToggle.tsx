import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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
    )
}