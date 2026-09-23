import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timelineEvents } from '../data/timeline'

gsap.registerPlugin(ScrollTrigger)

export default function WorkTimeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const cardRefs = useRef([])
  const nodeRefs = useRef([])
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  useEffect(() => {
    // Reduced motion: leave every card and the line at their natural, fully
    // visible resting state — no ScrollTrigger, no animation, same content.
    if (reduced) return

    const ctx = gsap.context(() => {
      // The progress line is a full-height bar pre-drawn behind the base line,
      // then scaled down to nothing from the top. Scrubbing scaleY back up to 1
      // as the section scrolls through reads as the line "drawing" downward.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        },
      )

      timelineEvents.forEach((_, i) => {
        const card = cardRefs.current[i]
        const node = nodeRefs.current[i]
        if (!card) return

        const fromX = i % 2 === 0 ? -32 : 32

        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.5,
            },
          },
        )

        // Exactly one event reads as "active" at a time — whichever card is
        // currently nearest the middle of the viewport — using a narrow toggle
        // band so the state clears again once it drifts past centre.
        ScrollTrigger.create({
          trigger: card,
          start: 'center 65%',
          end: 'center 35%',
          onToggle: (self) => {
            card.classList.toggle('timeline-card-active', self.isActive)
            node?.classList.toggle('timeline-node-active', self.isActive)
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative px-6 py-28 sm:py-36 bg-ink border-t border-line overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-accent">
            How I work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-3 tracking-tight max-w-2xl">
            From idea to something that runs.
          </h2>
          <p className="mt-5 text-muted max-w-xl leading-relaxed">
            The same six steps on every build, whether it&apos;s a weekend project or a
            production system.
          </p>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-line" />
          <div
            ref={lineRef}
            className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px origin-top -translate-x-1/2 bg-accent"
          />

          <ol className="relative space-y-14 sm:space-y-16">
            {timelineEvents.map((event, i) => {
              const Icon = event.icon
              const isRight = i % 2 === 1
              return (
                <li key={event.title} className="relative">
                  <span
                    ref={(el) => (nodeRefs.current[i] = el)}
                    className="absolute left-5 lg:left-1/2 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-line bg-ink transition-all duration-300"
                    aria-hidden="true"
                  />

                  <div
                    className={
                      isRight
                        ? 'pl-12 lg:pl-[calc(50%+2.5rem)]'
                        : 'pl-12 lg:pl-0 lg:pr-[calc(50%+2.5rem)]'
                    }
                  >
                    <div
                      ref={(el) => (cardRefs.current[i] = el)}
                      className="rounded-2xl border border-line bg-surface p-6 sm:p-7 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                          <Icon size={16} />
                        </span>
                        <span className="font-mono text-[11px] tracking-widest uppercase text-accent">
                          {event.period} &middot; {event.category}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-text mt-4">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
