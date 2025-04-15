import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Education() {
  const { t } = useTranslation()

  return(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.7 }}
        exit={{ opacity: 0}}
        className="page-wrapper"
      >
        <h1 className="page-title">{t('educationPage.title')}</h1>
      </motion.div>
    </AnimatePresence>
  )
}
  