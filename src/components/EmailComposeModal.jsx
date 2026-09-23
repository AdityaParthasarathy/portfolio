import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { X, Minus, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const TO_EMAIL = 'adityapartha1@gmail.com'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmailComposeModal({ open, onClose }) {
  const [minimized, setMinimized] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!open) return
    setMinimized(false)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStatus('idle')
      setErrorMsg('')
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }, [open])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const canSend =
    form.name.trim() && EMAIL_RE.test(form.email.trim()) && form.message.trim() && status !== 'sending'

  const handleSend = async (e) => {
    e.preventDefault()
    if (!canSend) return

    if (!IS_CONFIGURED) {
      setStatus('error')
      setErrorMsg('Email sending isn’t configured yet.')
      return
    }

    setStatus('sending')
    setErrorMsg('')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || '(no subject)',
          message: form.message,
          to_email: TO_EMAIL,
        },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong sending that. Try again in a moment.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[70] flex flex-col sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:rounded-t-xl overflow-hidden border border-line bg-surface shadow-2xl shadow-black/60"
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 bg-surface-2 border-b border-line cursor-pointer select-none shrink-0"
            onClick={() => setMinimized((m) => !m)}
          >
            <span className="font-display text-sm font-semibold text-text truncate">
              {status === 'sent' ? 'Message sent' : 'New message'}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMinimized((m) => !m)
                }}
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted hover:bg-white/10 hover:text-text transition-colors"
                aria-label={minimized ? 'Expand' : 'Minimize'}
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted hover:bg-white/10 hover:text-text transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!minimized && (
            <form onSubmit={handleSend} className="flex flex-col flex-1 min-h-0 sm:max-h-[560px]">
              {status === 'sent' ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 py-14 text-center">
                  <CheckCircle2 size={36} className="text-accent2" />
                  <p className="text-text font-medium">Your message is on its way.</p>
                  <p className="text-sm text-muted">Thanks for reaching out — I'll reply soon.</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 rounded-full border border-line px-5 py-2 text-sm text-text hover:border-accent2/50 hover:text-accent2 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="px-4 py-2.5 border-b border-line flex items-center gap-3 text-sm shrink-0">
                    <span className="text-muted w-14 shrink-0">To</span>
                    <span className="text-text truncate">{TO_EMAIL}</span>
                  </div>

                  <input
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                    autoComplete="name"
                    className="px-4 py-2.5 border-b border-line bg-transparent text-sm text-text placeholder:text-muted focus:outline-none shrink-0"
                  />

                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="Your email"
                    autoComplete="email"
                    className="px-4 py-2.5 border-b border-line bg-transparent text-sm text-text placeholder:text-muted focus:outline-none shrink-0"
                  />

                  <input
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="Subject"
                    className="px-4 py-2.5 border-b border-line bg-transparent text-sm text-text placeholder:text-muted focus:outline-none shrink-0"
                  />

                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Write your message here..."
                    className="flex-1 min-h-[140px] px-4 py-3 bg-transparent text-sm text-text placeholder:text-muted focus:outline-none resize-none"
                  />

                  {status === 'error' && (
                    <div className="mx-4 mb-2 flex items-center gap-2 text-xs text-accent">
                      <AlertCircle size={14} className="shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <div className="flex items-center justify-between px-4 py-3 border-t border-line shrink-0">
                    <button
                      type="submit"
                      disabled={!canSend}
                      className="inline-flex items-center gap-2 rounded-full bg-accent text-white text-sm font-semibold px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent2 transition-colors"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Sending
                        </>
                      ) : (
                        <>
                          <Send size={14} /> Send
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-muted">Sends straight to my inbox</span>
                  </div>
                </>
              )}
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
