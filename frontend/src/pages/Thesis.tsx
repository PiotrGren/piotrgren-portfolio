import { motion, AnimatePresence } from 'framer-motion'

export default function Thesis() {
  return(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.7 }}
        exit={{ opacity: 0}}
        className="page-wrapper"
      >
        <h1 className="page-title">Praca Inżynierska</h1>
      </motion.div>
    </AnimatePresence>
  )
}
  