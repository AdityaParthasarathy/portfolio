import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const reversed = index % 2 === 1

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center py-16 border-b border-line last:border-0 ${
        reversed ? 'lg:[&>div:first-child]:order-2' : ''
      }`}
    >
      {/* Image */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        onClick={() => onOpen(project)}
        className="relative cursor-pointer group [perspective:1200px]"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="card-tilt relative rounded-2xl overflow-hidden border border-line bg-surface"
        >
          <div
            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), ${project.color}33, transparent 60%)`,
            }}
          />
          <img
            src={project.images[imgIdx]}
            alt={`${project.name} screenshot`}
            className="w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/50 backdrop-blur-md rounded-full px-3.5 py-2 border border-white/10"
          >
            View project <ArrowUpRight size={13} />
          </motion.div>
        </motion.div>

        {project.images.length > 1 && (
          <div className="flex gap-1.5 mt-3 justify-center">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setImgIdx(i)
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === imgIdx ? 'w-6 bg-accent2' : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Copy */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-mono text-xs tracking-widest uppercase px-2.5 py-1 rounded-full border"
            style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}0d` }}
          >
            {String(index + 1).padStart(2, '0')} · {project.year}
          </span>
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-semibold text-text tracking-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-accent2 font-medium text-sm sm:text-base">{project.tagline}</p>
        <p className="mt-5 text-muted leading-relaxed text-[15px]">{project.summary}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-text/90">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-accent2 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-muted border border-line rounded-full px-3 py-1.5 hover:border-white/25 hover:text-text transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
