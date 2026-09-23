export const projects = [
  {
    id: 'roadwatch',
    name: 'RoadWatch AI',
    tagline: 'Civic-tech command center for AI road inspection',
    summary:
      'Detects potholes and cracks from road footage with real computer vision, then geo-tags every issue on a live map with a severity score — built as a full control-room dashboard with real-time incident alerts and voice notifications.',
    images: ['/projects/roadwatch.png'],
    tags: ['React', 'Spring Boot', 'Java', 'Python', 'OpenCV', 'Firebase', 'Google Maps'],
    highlights: [
      'Real OpenCV-based pothole/crack detection pipeline, not a mock',
      'Live incident map with color-coded 1–10 severity scoring',
      'Glassmorphic command-center UI with voice-narrated critical alerts',
    ],
    liveUrl: 'https://roadwatch-adityaparthasarathy.vercel.app',
    color: '#00E5FF',
    year: '2026',
  },
  {
    id: 'neuragrid',
    name: 'NeuraGrid',
    tagline: 'A living 3D digital twin for campus energy',
    summary:
      'A real-time energy management platform for a campus microgrid — a 3D/GIS digital twin of every building, live load and solar tracking, CO₂ and temperature monitoring, and a decision engine that recommends (and one-click applies) fixes when something spikes.',
    images: ['/projects/neuragrid-1.png', '/projects/neuragrid-2.png'],
    tags: ['React', 'Three.js / R3F', 'Leaflet', 'Node.js', 'Express', 'MongoDB'],
    highlights: [
      '3D digital twin of the campus built with React Three Fiber',
      'Live map view with per-building load, solar & alert overlays',
      'Rule-based alert + auto-resolve engine for spikes and anomalies',
    ],
    liveUrl: 'https://neuragrid-adityaparthasarathy.vercel.app',
    color: '#7c5cff',
    year: '2026',
  },
  {
    id: 'rehearsals',
    name: 'Rehearsals',
    tagline: 'Practice hard conversations before they happen',
    summary:
      'Describe who you need to talk to and what makes it hard — the AI plays that person realistically so you can rehearse the conversation, then delivers a structured coaching debrief with an emotional heatmap of how you handled it. Ships as a single zero-dependency HTML file with full voice I/O.',
    images: ['/projects/rehearsals.png'],
    tags: ['Vanilla JS', 'Groq API', 'Llama 3.3 70B', 'Web Speech API'],
    highlights: [
      'Zero-dependency single-file app — no build step, no backend',
      'Full voice in/out via the Web Speech API for hands-free practice',
      'Post-session AI debrief with a turn-by-turn emotional heatmap',
    ],
    liveUrl: 'https://rehearsals.pages.dev',
    color: '#a78bfa',
    year: '2026',
  },
  {
    id: 'apple-centre',
    name: 'Apple Centre',
    tagline: 'Institutional site + staff CMS, backed by Google Sheets',
    summary:
      'The public site and admin system for RIT’s Centre for Apple Technologies — programs, events, faculty, gallery, and an online application flow, plus a login-protected staff portal for managing all of it. No traditional database: every piece of content is read from and written to Google Sheets through a single Apps Script Web App.',
    images: ['/projects/apple-centre.png'],
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Google Apps Script', 'JWT Auth'],
    highlights: [
      'Full staff CMS (events, gallery, programs, applications, team) with zero database — Google Sheets as the backing store',
      'JWT session auth (jose) with bcrypt-hashed staff credentials',
      'Online application flow with email notifications via Nodemailer',
    ],
    liveUrl: 'https://apple-centre-website.vercel.app',
    color: '#2ECC71',
    year: '2026',
  },
  {
    id: 'resumeiq',
    name: 'ResumeIQ',
    tagline: 'Know what your resume is missing — and why',
    summary:
      'Upload a PDF or DOCX resume and get a completeness score, a role-specific ATS keyword gap report, and bullet-by-bullet impact feedback — weak verbs, passive voice, unquantified results. Every suggestion traces back to an inspectable rule, not a model call: classic NLP only (spaCy POS/dependency parsing, regex, fuzzy matching), no LLM.',
    images: ['/projects/resumeiq.png'],
    tags: ['Flask', 'Python', 'spaCy', 'rapidfuzz', 'SQLAlchemy', 'Chart.js'],
    highlights: [
      'Per-bullet impact score: weak-verb, passive-voice (spaCy dependency parse), and unquantified-result detection',
      'Fuzzy + synonym-aware ATS keyword matching (rapidfuzz) across 8 target roles',
      'Fully rule-based and explainable — 74 pytest tests, zero LLM calls',
    ],
    liveUrl: 'https://resumeiq-s3xc.onrender.com',
    color: '#37e6c4',
    year: '2026',
  },
]
