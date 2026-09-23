import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group fixed bottom-8 left-6 z-[60] h-[50px] w-[50px] overflow-hidden rounded-full bg-surface-2 border border-line shadow-[0_0_0_4px_rgba(229,52,42,0.15)] flex items-center justify-center transition-[width,background-color] duration-300 ease-in-out hover:w-[150px] hover:bg-accent hover:border-accent"
        >
          <ArrowUp
            size={16}
            className="absolute text-text shrink-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-12"
          />
          <span className="absolute text-white text-sm font-semibold whitespace-nowrap opacity-0 translate-y-3 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
