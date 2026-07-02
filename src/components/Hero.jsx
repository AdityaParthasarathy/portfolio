import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'

const ROLES = ['Full-Stack Developer', 'AI Product Builder', 'CSE Student', 'Systems Thinker']

const HEADLINE = 'I build AI products people actually use.'

function AnimatedHeadline() {
  const words = HEADLINE.split(' ')
  return (
    <h1 className="font-display font-semibold text-[13vw] sm:text-[8vw] lg:text-[5.2rem] leading-[0.98] tracking-tight text-text max-w-5xl">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.28em] align-top">
          <motion.span
            className={`inline-block ${word.toLowerCase().includes('ai') ? 'text-gradient' : ''}`}
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((v) => (v + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent2" />
          </span>
          <span className="font-mono text-xs text-muted tracking-wide">
            Open to internships & full-time roles
          </span>
        </motion.div>

        <AnimatedHeadline />

        <div className="mt-6 flex flex-wrap items-center gap-3 text-lg sm:text-xl text-muted font-medium">
          <span>Hi, I'm Aditya — a</span>
          <span className="relative inline-flex h-[1.6em] w-[240px] items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute left-0 text-accent2 font-semibold whitespace-nowrap"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          I design and ship complete products — frontend, backend, and real AI —
          across healthcare, mobility, civic-tech, energy, and mental wellness.
          Five shipped builds, one obsession: taking an idea to something that runs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#work"
            className="rounded-full bg-accent text-white text-sm font-semibold px-7 py-4 flex items-center gap-2 shadow-[0_0_40px_rgba(124,92,255,0.35)] hover:shadow-[0_0_60px_rgba(124,92,255,0.55)] transition-shadow"
          >
            See my work <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="rounded-full border border-line text-text text-sm font-semibold px-7 py-4 hover:border-accent2/60 hover:text-accent2 transition-colors"
          >
            Let's talk
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-lg"
        >
          {[
            ['5', 'Shipped products'],
            ['5+', 'Languages & frameworks'],
            ['0→1', 'Built solo, end to end'],
          ].map(([n, label]) => (
            <div key={label}>
              <div className="font-display text-2xl sm:text-3xl font-semibold text-text">{n}</div>
              <div className="text-xs text-muted mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent2 transition-colors"
        aria-label="Scroll to work"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
