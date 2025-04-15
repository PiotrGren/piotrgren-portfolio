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
                    transition={{ duration: 0.3 }}
                    className="navbar"
                >
                    <div className="navbar-inner">
                        <Link to="/" className="text-xl font-bold tracking-wide">
                            Portfolio
                        </Link>

                        <nav className="navbar-nav">
                            {navItems.map(({ name, to }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        `transition-colors hover:text-red-700 ${isActive ? 'text-red-900 font-semibold' : ''}`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}
                            <ThemeToggle />
                        </nav>

                        <div className="navbar-div">
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
                                className="navbar-mobile"
                            >
                                {navItems.map(({ name, to}) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        className="navbar-mobile-navlink"
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