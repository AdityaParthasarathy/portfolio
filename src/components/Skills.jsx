import { motion } from 'framer-motion'

const GROUPS = [
  {
    title: 'Frontend',
    items: ['React', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Radix UI'],
  },
  {
    title: 'Backend',
    items: ['Node.js / Express', 'FastAPI (Python)', 'Spring Boot (Java)', 'REST & SSE APIs'],
  },
  {
    title: 'AI / ML',
    items: ['LLM Integration (Groq, Ollama)', 'Prompt Engineering', 'OpenCV', 'Computer Vision'],
  },
  {
    title: 'Data & Infra',
    items: ['Supabase', 'Firebase', 'MongoDB', 'PostgreSQL', 'Google Maps / Leaflet'],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-accent2">Toolkit</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-3 tracking-tight max-w-2xl">
            Comfortable across the whole stack.
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              className="rounded-2xl border border-line bg-surface p-6 hover:border-accent/40 transition-colors group"
            >
              <h3 className="font-display text-sm font-semibold text-accent2 uppercase tracking-wide mb-5">
                {group.title}
              </h3>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={item}
                    className="text-sm text-text/85 flex items-center gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-accent2 transition-colors shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
