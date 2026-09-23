import { Compass, ClipboardList, Hammer, FlaskConical, Rocket, Repeat } from 'lucide-react'

export const timelineEvents = [
  {
    period: '01',
    category: 'Research',
    title: 'Discover',
    description:
      'Talk to the people who’ll actually use it, map the real problem, and figure out what "done" looks like before writing a line of code.',
    icon: Compass,
  },
  {
    period: '02',
    category: 'Architecture',
    title: 'Plan',
    description:
      'Sketch the data model, the API surface, and where the AI actually fits — decide what’s load-bearing before it’s expensive to change.',
    icon: ClipboardList,
  },
  {
    period: '03',
    category: 'Engineering',
    title: 'Build',
    description:
      'Frontend, backend, and real AI, wired together end to end — not stubbed out with mock data and a promise to fix it later.',
    icon: Hammer,
  },
  {
    period: '04',
    category: 'Quality',
    title: 'Test',
    description:
      'Break it on purpose — edge cases, bad input, slow networks — so the first person to find a bug isn’t a user.',
    icon: FlaskConical,
  },
  {
    period: '05',
    category: 'Deployment',
    title: 'Ship',
    description:
      'Deploy something that actually runs, with a real URL and real infrastructure behind it — no "works on my machine."',
    icon: Rocket,
  },
  {
    period: '06',
    category: 'Refinement',
    title: 'Iterate',
    description:
      'Watch how it’s actually used, then polish the parts that matter based on real feedback — not guesses.',
    icon: Repeat,
  },
]
