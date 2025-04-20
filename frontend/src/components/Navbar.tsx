import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSelector from './LanguageSelector'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Dropdown from './Dropdown'


export default function Navbar() {
    const { t } = useTranslation()

    const navItems = [
        { name: t('navbar.home'), to: '/' },
        { name: t('navbar.projects'), to: '/projects' },
        { name: t('navbar.certificates'), to: '/certificates' },
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/*Navbar */}
                    <motion.header
                        initial={{y: -60, opacity: 0}}
                        animate={{ y: 0, opacity: 1}}
                        transition={{ duration: 0.3 }}
                        className="navbar"
                    >
                        <div className="navbar-inner">
                            <Link to="/" className="text-xl font-bold tracking-wide">
                                {t('navbar.title')}
                            </Link>

                            <nav className="navbar-nav">
                                {navItems.map(({ name, to }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        className={({ isActive }) =>
                                            clsx(
                                                `transition-colors hover:text-red-700 ${isActive ? 'text-red-900 font-semibold' : ''}`
                                            )
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                ))}
                                <Dropdown
                                    title={t('navbar.educationMenu.title')}
                                    items={[
                                        { label: t('navbar.educationMenu.education'), to: "/education"},
                                        { label: t("navbar.educationMenu.thesis"), to: "/education/thesis"}
                                    ]}
                                />
                                <div className="flex items-center gap-1.5">
                                    <ThemeToggle />
                                    <LanguageSelector />
                                </div>
                            </nav>

                            <div className="navbar-div">
                                <div className="flex items-center gap-1.5">
                                    <ThemeToggle />
                                    <LanguageSelector />
                                </div>
                                <button onClick={() => setIsOpen(true)}>
                                    <Menu size={24} /> {/*{isOpen ? <X size={24} /> : }*/}
                                </button>
                            </div>
                        </div>
                    </motion.header>

                    {/* Moblie Menu - Overlay z blurrem*/}
                    <AnimatePresence>
                        {isOpen && (
                            <>
                                {/* Tło z blurrem */}
                                <motion.div
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1}}
                                    exit={{ opacity: 0}}
                                    className="navbar-mobile-blurr"
                                    onClick={() => setIsOpen(false)}
                                />

                                {/* Panel boczny */}
                                <motion.div
                                    className="navbar-sidebar"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-semibold">Menu</span>
                                        <button onClick={() => setIsOpen(false)}>
                                            <X size={24} />
                                        </button>
                                    </div>
                                    {navItems.map(({ name, to}) => (
                                        <NavLink
                                            key={to}
                                            to={to}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                clsx(
                                                    'py-2 text-base transition-colors hover:text-red-700 border-zinc-200 dark:border-zinc-700',
                                                    isActive && 'text-red-900 font-semibold'
                                                )
                                            }
                                        >
                                            {name}
                                        </NavLink>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    )
}