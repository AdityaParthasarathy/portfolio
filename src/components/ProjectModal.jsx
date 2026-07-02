import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setIdx(0)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx((v) => (project ? (v + 1) % project.images.length : 0))
      if (e.key === 'ArrowLeft') setIdx((v) => (project ? (v - 1 + project.images.length) % project.images.length : 0))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = project ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl bg-surface border border-line shadow-2xl"
          >
            <button
              onClick={onClose}
              className="sticky top-4 float-right mr-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="relative">
              <img
                src={project.images[idx]}
                alt={`${project.name} screenshot ${idx + 1}`}
                className="w-full object-cover object-top border-b border-line"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setIdx((v) => (v - 1 + project.images.length) % project.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setIdx((v) => (v + 1) % project.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <p
                className="font-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: project.color }}
              >
                {project.year}
              </p>
              <h3 className="font-display text-3xl font-semibold text-text">{project.name}</h3>
              <p className="mt-1.5 text-accent2 font-medium">{project.tagline}</p>
              <p className="mt-5 text-muted leading-relaxed">{project.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-text/90">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent2 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-muted border border-line rounded-full px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
