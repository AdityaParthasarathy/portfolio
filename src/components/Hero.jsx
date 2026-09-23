import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Plus } from 'lucide-react'

const VALUE_PROPS = ['Full-Stack Development', 'Real AI Integration', 'Production-Ready Systems']

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase"
        >
          <div className="text-text/80 leading-relaxed">
            <div>Full-Stack Developer</div>
            <div className="text-muted">AI Product Builder</div>
          </div>
        </motion.div>
      </div>

      {/* Composition: giant outline word + portrait — full-bleed, breaks out of the page gutter */}
      <div className="mt-4 sm:mt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none text-center font-display font-bold text-outline text-[12vw] sm:text-[9.5vw] lg:text-[6.5rem] leading-[0.95] tracking-tight"
        >
          <div>ADITYA</div>
          <div>PARTHASARATHY</div>
        </div>

        <div>
          {/* Portrait — full-bleed left panel at lg, meets the top/left/bottom edges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative -mt-[13vw] sm:-mt-[11vw] lg:mt-0 mx-auto lg:mx-0 w-full max-w-[400px] sm:max-w-[500px] lg:absolute lg:inset-y-0 lg:left-0 lg:w-[48vw] lg:max-w-none"
          >
            <div className="absolute -inset-10 bg-accent/25 blur-[90px] rounded-full" />
            <img
              src="/portrait-cutout.png"
              alt="Aditya Parthasarathy"
              className="relative w-full h-[480px] sm:h-[560px] lg:h-full object-cover object-left-top"
            />
          </motion.div>

          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 text-right px-6 lg:px-12 lg:pl-[calc(48vw+3rem)] lg:mt-6"
          >
              <span className="font-script text-accent2 text-3xl sm:text-4xl leading-none">
                Hello, I'm
              </span>
              <h1 className="font-display font-extrabold text-text text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] mt-1">
                Aditya Parthasarathy
              </h1>
              <p className="mt-2 font-display font-bold text-accent text-lg sm:text-xl tracking-wide uppercase">
                Full-Stack &amp; AI Developer
              </p>

              <p className="mt-6 max-w-md ml-auto text-muted leading-relaxed text-[15px]">
                Full-stack products with real AI — shipped, not prototyped.
              </p>

              <div className="mt-4 flex items-center justify-end gap-2 text-sm text-muted">
                <MapPin size={14} className="text-accent" />
                Chennai, Tamil Nadu, India
              </div>

              <div className="mt-6 max-w-md ml-auto rounded-2xl border border-line bg-surface/80 backdrop-blur-xl p-5 text-left">
                <p className="text-sm text-text/90 leading-snug">
                  Turning ideas into products that run.
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {VALUE_PROPS.map((v) => (
                    <li key={v} className="flex items-center gap-2 text-xs text-muted">
                      <Plus size={12} className="text-accent shrink-0" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
                <a
                  href="#work"
                  className="sweep-btn group flex items-center gap-2 rounded-full bg-text px-7 py-4 text-sm font-semibold text-ink shadow-[0_0_40px_rgba(229,52,42,0.35)] transition-colors duration-300 hover:text-white hover:shadow-[0_0_60px_rgba(229,52,42,0.55)]"
                >
                  See my work
                  <ArrowUpRight
                    size={14}
                    className="h-6 w-6 rounded-full border border-line p-1.5 text-ink transition-all duration-300 ease-linear group-hover:rotate-90 group-hover:border-none group-hover:bg-text group-hover:text-ink"
                  />
                </a>
                <a href="#contact" className="bubble-btn rounded-full px-7 py-4 text-sm font-semibold">
                  Let's talk
                </a>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-6 max-w-md ml-auto">
                {[
                  ['5', 'Shipped products'],
                  ['5+', 'Languages & frameworks'],
                  ['0→1', 'Built solo, end to end'],
                ].map(([n, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl sm:text-3xl font-semibold text-accent">{n}</div>
                    <div className="text-xs text-muted mt-1 leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
