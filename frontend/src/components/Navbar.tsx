import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
    { name: 'Strona Główna', to: '/' },
    { name: 'Projekty', to: '/projects' },
    { name: 'Certyfikaty', to: '/certificates' },
    { name: 'Edukacja', to: '/education' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {show && (
                <motion.header
                    initial={{y: -60, opacity: 0}}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ duration: 0.6 }}
                    className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md"
                >
                    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to="/" className="text-xl font-bold tracking-wide">
                            Moje Portfolio
                        </Link>

                        <nav className="hidden md:flex gap-6 items-center">
                            {navItems.map(({ name, to }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        `transition-colors hover:text-blue-500 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}
                            <ThemeToggle />
                        </nav>

                        <div className="md:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Moblie Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0}}
                                animate={{ height: 'auto', opacity: 1}}
                                exit={{ height: 0, opacity: 0}}
                                className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white dark:bg-zinc-900"
                            >
                                {navItems.map(({ name, to}) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        className="py-1 text-lg border-b border-zinc-200 dark:border-zinc-700"
                                    >
                                        {name}
                                    </NavLink>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>
            )}
        </AnimatePresence>
    )
}