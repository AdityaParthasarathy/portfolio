import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="relative px-6 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-accent2">
            Selected work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-3 tracking-tight max-w-2xl">
            Five products. Five different problems. Zero placeholder screens.
          </h2>
          <p className="mt-5 text-muted max-w-xl leading-relaxed">
            Every screenshot below is pulled straight from the running app — not a Figma mock.
            Click any project to see it full-size.
          </p>
        </motion.div>

        <div className="mt-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
