import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Github, Linkedin, Download, FileText } from 'lucide-react'

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
            <img src="/logo.png" alt="Aditya Parthasarathy" className="h-8 w-8 object-contain" />
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
            <div className="flex items-center gap-3 pr-6 border-r border-line">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group gradient-btn h-9 w-9 rounded-full"
              >
                <span className="gradient-btn__inner flex h-full w-full items-center justify-center rounded-full text-text group-hover:text-white">
                  <Github size={15} />
                </span>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group gradient-btn h-9 w-9 rounded-full"
              >
                <span className="gradient-btn__inner flex h-full w-full items-center justify-center rounded-full text-text group-hover:text-white">
                  <Linkedin size={15} />
                </span>
              </a>
            </div>
            <a
              href={RESUME_URL}
              download
              aria-label="Download resume"
              className="group relative flex h-10 items-center overflow-hidden rounded-full text-sm font-semibold"
            >
              <span className="flex h-10 items-center gap-2 rounded-full border border-line bg-surface-2 px-5 text-text transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
                <FileText size={15} /> Resume
              </span>
              <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-2 rounded-full border border-accent2/30 bg-accent px-5 text-white transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
                <Download size={17} className="group-hover:animate-[docs-bounce_1s_ease-in-out_infinite]" />
              </span>
            </a>
            <a
              href="#contact"
              className="sweep-btn group flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:text-white"
            >
              Hire me
              <ArrowUpRight
                size={14}
                className="h-6 w-6 rounded-full border border-line p-1.5 text-ink transition-all duration-300 ease-linear group-hover:rotate-90 group-hover:border-none group-hover:bg-text group-hover:text-ink"
              />
            </a>
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
