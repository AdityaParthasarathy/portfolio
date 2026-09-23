import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const EDUCATION = [
  {
    degree: 'B.E./B.Tech, Computer Science and Engineering',
    place: 'Rajalakshmi Institute of Technology, Chennai',
    years: '2024 – Present',
  },
  {
    degree: 'Higher Secondary (12th Standard)',
    place: 'Prince Srivari Vidyalaya, Chennai',
    years: '2023 – 2024',
  },
]

const EXPERIENCE = [
  {
    role: 'Full Stack App Developer',
    place: 'StrawLabs',
    years: 'Jun 2026 – Present',
  },
  {
    role: 'UI/UX Intern',
    place: 'Retech Technologies',
    years: 'Jul 2025 – Aug 2025',
  },
]

const SKILLS = [
  'React', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Radix UI',
  'Node.js / Express', 'FastAPI (Python)', 'Spring Boot (Java)', 'REST & SSE APIs',
  'LLM Integration', 'Prompt Engineering', 'OpenCV', 'Computer Vision',
  'Supabase', 'Firebase', 'MongoDB', 'PostgreSQL',
  'Figma', 'Adobe XD', 'Wireframing', 'Git / GitHub',
]

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36 bg-surface border-t border-line">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-accent">About</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-3 tracking-tight max-w-2xl">
            Education, skills &amp; how I work.
          </h2>
          <p className="mt-5 text-muted max-w-2xl leading-relaxed">
            I design and ship complete products — frontend, backend, and real AI — across
            civic-tech, energy, mental wellness, higher-ed, and career tooling. Five shipped
            builds, one obsession: taking an idea to something that runs.
          </p>
        </motion.div>

        <div id="skills" className="mt-14 grid lg:grid-cols-[3fr_2fr] gap-6">
          {/* Column 1 — Education & Skills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-7"
          >
            <h3 className="font-mono text-xs tracking-widest uppercase text-accent mb-5">
              Education
            </h3>
            <ul className="space-y-4">
              {EDUCATION.map((e) => (
                <li key={e.degree} className="border-l-2 border-accent/40 pl-4">
                  <div className="text-sm font-semibold text-text leading-snug">{e.degree}</div>
                  <div className="text-xs text-muted mt-1">{e.place}</div>
                  <div className="text-xs text-accent/80 font-mono mt-0.5">{e.years}</div>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-xs tracking-widest uppercase text-accent mt-8 mb-5">
              Experience
            </h3>
            <ul className="space-y-4">
              {EXPERIENCE.map((e) => (
                <li key={e.role} className="border-l-2 border-accent/40 pl-4">
                  <div className="text-sm font-semibold text-text leading-snug">{e.role}</div>
                  <div className="text-xs text-muted mt-1">{e.place}</div>
                  <div className="text-xs text-accent/80 font-mono mt-0.5">{e.years}</div>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-xs tracking-widest uppercase text-accent mt-8 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium text-muted border border-line rounded-full px-3 py-1.5 hover:border-accent/50 hover:text-text transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quote / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <Quote size={28} className="text-accent" />
              <p className="mt-4 font-display text-xl sm:text-2xl font-medium text-text leading-snug">
                Ship it, then polish it.
              </p>
              <span className="block mt-3 font-script text-accent2 text-2xl">Aditya</span>
            </div>

            <div className="mt-10">
              <p className="font-display text-lg font-semibold text-text tracking-tight">
                Let's create something worth shipping.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent2 transition-colors"
              >
                Get in touch
                <span className="w-5 h-5 rounded-full border border-accent/60 flex items-center justify-center text-[10px]">
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
