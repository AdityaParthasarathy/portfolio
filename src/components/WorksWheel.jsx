// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from 'react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.48 // front card height, of the stage
const CARD_MAX_W = 0.36 // ... but never wider than this much of the stage
const CARD_RATIO = 1.45 // card width / height
const STEP = 40 // degrees between cards on the drum
const DRUM = 2.22 // drum radius, in card heights - and everything below likewise
const LENS = 2.7 // perspective distance
const RING_R = 0.72 // ring radius
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.82
const TITLE = 0.124 // ring label and front-card title
const INDEX = 0.04 // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900
const DRAG_UNITS = 420
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const lerp = (a, b, t) => a + (b - a) * t

const rad = (deg) => (deg * Math.PI) / 180

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)))

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  )
}

export default function WorksWheel({
  items,
  label = "Works '26",
  action = 'View',
  onSelect,
  className,
  ...props
}) {
  const stageRef = useRef(null)
  const wheelRef = useRef(null)
  const cardRefs = useRef([])
  const labelRef = useRef(null)
  const titleRef = useRef(null)

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = useRef(0)
  const target = useRef(0)
  const [active, setActive] = useState(0)
  const [stage, setStage] = useState({ w: 0, h: 0 })

  const count = items.length
  const last = Math.max(count - 1, 0)

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const metrics = useMemo(() => {
    const { w, h } = stage
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W)
    const cardH = cardW / CARD_RATIO
    const drumR = cardH * DRUM
    const ringR = cardH * RING_R
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given.
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    }
  }, [stage, count])

  // One pass per frame: ease toward the target, then write every transform.
  useEffect(() => {
    if (!stage.h) return
    let frame = 0
    const { ringR, ringScale, drumR, bow } = metrics

    const draw = () => {
      frame = requestAnimationFrame(draw)
      const gap = target.current - turn.current
      if (Math.abs(gap) < 0.0005) turn.current = target.current
      else turn.current += gap * (reduced ? 1 : EASE)

      const t = turn.current
      const m = clamp(t, 0, 1)
      const pos = Math.max(0, t - 1)

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos
        const drumDeg = d * STEP
        const card = cardRefs.current[i]
        if (card) {
          card.style.transform = place(d * (360 / count), drumDeg, ringR, drumR, bow, m)
          // Culled by distance, not by angle: at a full turn the far side comes
          // back round to face us, and everything past the neighbours lands on
          // the vanishing point in a heap.
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1'
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2))
        }
        const face = card?.firstElementChild
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)
      const near = clamp(Math.round(pos), 0, last)
      setActive((prev) => (prev === near ? prev : near))
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [metrics, stage.h, count, last, reduced])

  const to = useCallback(
    (next) => {
      target.current = clamp(next, 0, last + 1)
    },
    [last],
  )

  const settling = useRef(0)

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (event) => {
      const next = target.current + event.deltaY / WHEEL_UNITS
      if (next > 0 && next < last + 1) event.preventDefault()
      to(next)
      // A wheel gesture arrives as a burst of events with no end of its own, so
      // the rest position is whatever notch it happened to stop on. Left there
      // the drum sits between two cards - nothing at the front, and the pair
      // either side of the gap both turned half away. Settle onto an item.
      window.clearTimeout(settling.current)
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      window.clearTimeout(settling.current)
    }
  }, [to, last])

  const drag = useRef(null)

  return (
    <section
      aria-label={label}
      className={cn(
        'bg-ink text-text relative h-full min-h-[24rem] w-full overflow-hidden select-none',
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-accent absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS)
          drag.current = event.clientY
        }}
        onPointerUp={(event) => {
          // Release capture before the trailing click event fires, or the
          // click gets retargeted to this stage instead of the card under
          // the pointer and card selection silently stops working.
          event.currentTarget.releasePointerCapture(event.pointerId)
          // Land on an item rather than between two.
          drag.current = null
          if (target.current > 1) to(Math.round(target.current))
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') to(Math.round(target.current) + 1)
          else if (event.key === 'ArrowUp') to(Math.round(target.current) - 1)
          else return
          event.preventDefault()
        }}
      >
        <div ref={wheelRef} className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
          {items.map((item, i) => {
            const hasHref = Boolean(item.href)
            const Tag = hasHref ? 'a' : 'div'
            return (
              <Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  tabIndex={hasHref ? undefined : 0}
                  onClick={hasHref ? undefined : () => onSelect?.(item, i)}
                  onKeyDown={
                    hasHref
                      ? undefined
                      : (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            onSelect?.(item, i)
                          }
                        }
                  }
                  ref={(node) => {
                    cardRefs.current[i] = node
                  }}
                  className="group absolute cursor-pointer [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-surface relative block size-full overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover object-top"
                    />
                    {action ? (
                      <span className="bg-ink/80 text-text pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </Fragment>
            )
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition.
          Type is sized off the measured stage, not vh, so the wheel keeps its
          proportions inside a card as well as at full bleed. */}
      <div
        ref={labelRef}
        className="font-display pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[8%] max-w-sm -translate-y-1/2 opacity-0"
      >
        <div className="font-display tracking-tight" style={{ fontSize: metrics.title }}>
          {items[active]?.title}
        </div>
        {items[active]?.tagline && (
          <p className="text-muted mt-3 text-sm leading-relaxed sm:text-base">
            {items[active].tagline}
          </p>
        )}
        {items[active]?.liveUrl && (
          <a
            href={items[active].liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent2 pointer-events-auto mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            View live
            <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
              <path
                d="M3 9 9 3M4 3h5v5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>

      <ol
        className="text-muted absolute top-[7.5%] right-[2.5%] text-right leading-[1.75]"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                'focus-visible:outline-accent cursor-pointer transition-colors outline-none focus-visible:outline-1',
                i === active && 'text-text font-medium',
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
