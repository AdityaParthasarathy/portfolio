import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Copy, Check, Github, Linkedin } from 'lucide-react'
import MagneticButton from './MagneticButton'
import EmailComposeModal from './EmailComposeModal'

const EMAIL = 'adityapartha1@gmail.com'
const PHONE = '+91 81229 07520'
const GITHUB_URL = 'https://github.com/AdityaParthasarathy'
const LINKEDIN_URL = 'https://www.linkedin.com/in/aditya-parthasarathy-924a6a349'

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: GITHUB_URL },
  { icon: Linkedin, label: 'LinkedIn', href: LINKEDIN_URL },
]

function CopyRow({ icon: Icon, label, value, copyValue }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-line group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-line flex items-center justify-center group-hover:border-accent2/50 group-hover:bg-accent2/10 transition-colors">
          <Icon size={16} className="text-accent2" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-muted">{label}</div>
          <div className="text-text font-medium">{value}</div>
        </div>
      </div>
      <button
        onClick={copy}
        className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-accent2 hover:border-accent2/50 transition-colors shrink-0"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={14} className="text-accent2" /> : <Copy size={14} />}
      </button>
    </div>
  )
}

export default function Contact() {
  const [composeOpen, setComposeOpen] = useState(false)

  return (
    <section id="contact" className="relative px-6 py-28 sm:py-40 bg-ink border-t border-line">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-widest uppercase text-accent2"
        >
          Get in touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-semibold text-text mt-4 tracking-tight text-balance"
        >
          Let's build something worth <span className="text-gradient">shipping</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-muted max-w-lg mx-auto leading-relaxed"
        >
          I'm actively looking for internship and full-time opportunities. If you need someone who
          can take a product from empty repo to running demo, let's talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <MagneticButton
            as="button"
            onClick={() => setComposeOpen(true)}
            className="rounded-full bg-accent text-white text-base font-semibold px-9 py-5 flex items-center gap-2 shadow-[0_0_50px_rgba(229,52,42,0.4)] hover:shadow-[0_0_80px_rgba(229,52,42,0.6)] transition-shadow"
          >
            <Mail size={18} /> Email me
          </MagneticButton>
        </motion.div>

        <EmailComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 flex justify-center gap-3"
        >
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <MagneticButton
              key={label}
              as="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-line text-text flex items-center justify-center hover:border-accent2/60 hover:text-accent2 transition-colors"
              aria-label={label}
            >
              <Icon size={18} />
            </MagneticButton>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-md mx-auto text-left"
        >
          <CopyRow icon={Mail} label="Email" value={EMAIL} copyValue={EMAIL} />
          <CopyRow icon={Phone} label="Phone" value={PHONE} copyValue="+918122907520" />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 py-5 border-b border-line group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-line flex items-center justify-center group-hover:border-accent2/50 group-hover:bg-accent2/10 transition-colors">
                <Github size={16} className="text-accent2" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted">GitHub</div>
                <div className="text-text font-medium">github.com/AdityaParthasarathy</div>
              </div>
            </div>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 py-5 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-line flex items-center justify-center group-hover:border-accent2/50 group-hover:bg-accent2/10 transition-colors">
                <Linkedin size={16} className="text-accent2" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted">LinkedIn</div>
                <div className="text-text font-medium">in/aditya-parthasarathy</div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
