import { motion } from 'framer-motion'
import { GraduationCap, Sparkles, Target, Code2 } from 'lucide-react'

const FACTS = [
  { icon: GraduationCap, label: 'Focus', value: 'Computer Science' },
  { icon: Code2, label: 'Builds', value: 'Full-stack + AI, solo' },
  { icon: Target, label: 'Domains', value: 'Health, mobility, civic-tech' },
  { icon: Sparkles, label: 'Approach', value: 'Ship it, then polish it' },
]

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36 border-t border-line">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-accent2">About</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-3 tracking-tight">
            I don't just design interfaces. I ship systems.
          </h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed text-[15px]">
            <p>
              I'm Aditya, a Computer Science student who'd rather build a real product than a
              slide deck about one. Every project in this portfolio has a working frontend, a real
              backend, a real database, and — almost always — an AI model actually doing something
              useful, not just bolted on for a buzzword.
            </p>
            <p>
              That range is deliberate. Spring Boot and Firebase for a computer-vision civic-tech
              tool, Supabase and a custom design system for a mobility app, React Three Fiber for a
              3D energy digital twin, a local LLM streaming over FastAPI for a healthcare
              assistant. I like being handed an unfamiliar stack — it's usually the fastest way to
              learn what actually matters in a system.
            </p>
            <p>
              What I'm looking for now: a team that ships fast, cares about the details users
              actually notice, and will let me own a problem end to end.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative font-mono text-xs text-muted mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2">aditya.dev</span>
            </div>

            <div className="relative grid grid-cols-2 gap-5">
              {FACTS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="group">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-line flex items-center justify-center mb-3 group-hover:border-accent2/50 group-hover:bg-accent2/10 transition-colors">
                    <Icon size={16} className="text-accent2" />
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-muted mb-1">{label}</div>
                  <div className="text-sm text-text font-medium leading-snug">{value}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-7 pt-6 border-t border-line">
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span>Currently</span>
                <span className="text-accent2">available</span>
              </div>
              <p className="text-sm text-text/90">
                Looking for internship & full-time software engineering roles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
