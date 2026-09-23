import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Github, Linkedin, Download } from 'lucide-react'
import MagneticButton from './MagneticButton'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const GITHUB_URL = 'https://github.com/AdityaParthasarathy'
const LINKEDIN_URL = 'https://www.linkedin.com/in/aditya-parthasarathy-924a6a349'
const RESUME_URL = '/Aditya_Parthasarathy_Resume.pdf'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-6 transition-all duration-300 ${
            scrolled
              ? 'py-2.5 bg-surface/70 border border-line backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
              : 'py-2 bg-transparent border border-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-white text-sm">
              AP
            </span>
            <span className="font-display font-semibold text-sm tracking-tight text-text hidden sm:block">
              Aditya Parthasarathy
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-12">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 pr-6 border-r border-line">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted hover:text-accent transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-accent transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <MagneticButton
              as="a"
              href={RESUME_URL}
              download
              className="rounded-full border border-line text-text text-sm font-semibold px-5 py-2.5 flex items-center gap-1.5 hover:border-accent/60 hover:text-accent transition-colors"
            >
              Resume <Download size={14} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="rounded-full bg-text text-ink text-sm font-semibold px-5 py-2.5 flex items-center gap-1.5 hover:bg-accent hover:text-white transition-colors"
            >
              Hire me <ArrowUpRight size={14} />
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-line text-text"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-6 mt-2 rounded-2xl bg-surface border border-line overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm text-muted hover:text-text hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                download
                onClick={() => setOpen(false)}
                className="mt-2 px-3 py-3 rounded-lg text-sm font-semibold border border-line text-text text-center flex items-center justify-center gap-1.5"
              >
                Resume <Download size={14} />
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-semibold bg-text text-ink text-center"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
