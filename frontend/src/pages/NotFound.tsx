import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 bg-zinc-900 flex items-center justify-center overflow-hidden"
      >
        {/* Tło */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-zinc-900"
            
          />
          {/* Gwiazdy */}
          <div className="absolute inset-0 z-10">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-70 animate-star"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Treść */}
        <div className="relative z-20 text-center text-white px-4 max-w-md">
          <motion.h1
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-8xl font-extrabold drop-shadow-lg animate-text-gradient"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg sm:text-xl mt-4 drop-shadow"
          >
            {t('notFound.message')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6"
          >
            <Link
              to="/"
              className="inline-block px-6 py-2 text-sm font-semibold text-white rounded shadow-md transition-all duration-500 button-animated"
            >
              {t('notFound.backToHome')}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
