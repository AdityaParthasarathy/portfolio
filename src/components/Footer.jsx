import { Github, Linkedin } from 'lucide-react'

const GITHUB_URL = 'https://github.com/AdityaParthasarathy'
const LINKEDIN_URL = 'https://www.linkedin.com/in/aditya-parthasarathy-924a6a349'

export default function Footer() {
  return (
    <footer className="px-6 py-8 bg-ink border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <span>© {new Date().getFullYear()} Aditya Parthasarathy. Built from scratch.</span>
        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent2 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent2 transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <span className="font-mono">Designed &amp; coded solo</span>
        </div>
      </div>
    </footer>
  )
}
