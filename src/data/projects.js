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
    color: '#7c5cff',
    year: '2026',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    tagline: 'AI healthcare companion with streaming chat',
    summary:
      'A ChatGPT-style healthcare assistant that streams empathetic, medically-aware answers token by token using a locally-hosted LLM — plus dedicated symptom insight and medicine-checking tools, wrapped in a premium dark UI.',
    images: ['/projects/pulse.png'],
    tags: ['React', 'Vite', 'FastAPI', 'Python', 'Ollama / Llama 3.2', 'SSE Streaming'],
    highlights: [
      'Token-level streaming responses over Server-Sent Events',
      'Per-session conversation memory on a FastAPI backend',
      'Symptom Insights + Medicine Checker as dedicated tools',
    ],
    color: '#37e6c4',
    year: '2026',
  },
  {
    id: 'drivo',
    name: 'Drivo',
    tagline: 'Premium sustainable ride-hailing platform',
    summary:
      'A full ride-hailing product for an EV-first mobility service — separate rider, driver, and admin experiences on one codebase, backed by Supabase auth and a real relational schema, wrapped in a "premium sustainable" design system.',
    images: ['/projects/drivo.png'],
    tags: ['React 19', 'Vite', 'Supabase', 'Tailwind CSS 4', 'Radix UI'],
    highlights: [
      'Role-aware routing across rider / driver / admin dashboards',
      'Supabase-backed auth, schema and real-time data',
      'Custom design system: typography, elevation & motion tokens',
    ],
    color: '#2ECC71',
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
    color: '#a78bfa',
    year: '2026',
  },
]
