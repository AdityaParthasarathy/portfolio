import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({
  children,
  as = 'button',
  className = '',
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const Comp = motion[as]

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * strength, y: y * strength })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      whileTap={{ scale: 0.94 }}
      className={`btn-magnetic ${className}`}
      {...props}
    >
      <motion.span
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
        className="relative z-10 inline-flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>
    </Comp>
  )
}
