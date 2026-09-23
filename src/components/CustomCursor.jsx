import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const CURSOR_COLOR = '#e5342a'
const EASE = [0.625, 0.05, 0, 1]
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]'

function hexToRgba(hex, alpha) {
  const n = hex.replace('#', '')
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return coarse
}

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const isCoarsePointer = useCoarsePointer()
  const [hovering, setHovering] = useState(false)
  const disabled = isCoarsePointer || prefersReducedMotion

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 22, stiffness: 150, mass: 0.8 })
  const springY = useSpring(y, { damping: 22, stiffness: 150, mass: 0.8 })

  useEffect(() => {
    if (disabled) return

    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    // Delegated listeners catch every interactive element site-wide, present
    // or future, without wrapping each button/link individually.
    const handleOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) setHovering(true)
    }
    const handleOut = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) setHovering(false)
    }

    window.addEventListener('pointermove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [disabled, x, y])

  if (disabled) return null

  const appearance = hovering
    ? { width: 48, height: 48, backgroundColor: hexToRgba(CURSOR_COLOR, 0.3), borderColor: CURSOR_COLOR }
    : { width: 16, height: 16, backgroundColor: CURSOR_COLOR, borderColor: CURSOR_COLOR }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', borderWidth: 1 }}
      initial={false}
      animate={appearance}
      transition={{ duration: 0.375, ease: EASE }}
    />
  )
}
