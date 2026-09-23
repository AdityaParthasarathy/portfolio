import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import WorksWheel from './WorksWheel'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [active, setActive] = useState(null)

  const wheelItems = useMemo(
    () =>
      projects.map((p) => ({
        title: p.name,
        image: p.images[0],
        tagline: p.tagline,
        liveUrl: p.liveUrl,
      })),
    [],
  )

  const handleSelect = (item) => {
    const project = projects.find((p) => p.name === item.title)
    if (project) setActive(project)
  }

  return (
    <section id="work" className="relative py-28 sm:py-36 bg-ink border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-accent">
            Selected work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-3 tracking-tight max-w-2xl">
            Five products. Five different problems.
          </h2>
          <p className="mt-5 text-muted max-w-xl leading-relaxed">
            Scroll, drag, or use the index to turn the wheel. Click any project to see it
            full-size.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-10 h-[100vh] min-h-[700px] max-h-[1200px]"
      >
        <WorksWheel items={wheelItems} label="Work '26" action="View" onSelect={handleSelect} />
      </motion.div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
