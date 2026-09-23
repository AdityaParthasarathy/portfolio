import { Github, Linkedin } from 'lucide-react'

const GITHUB_URL = 'https://github.com/AdityaParthasarathy'
const LINKEDIN_URL = 'https://www.linkedin.com/in/aditya-parthasarathy-924a6a349'

export default function Footer() {
  return (
    <footer className="px-6 py-8 bg-ink border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <span>© {new Date().getFullYear()} Aditya Parthasarathy. Built from scratch.</span>
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group gradient-btn h-8 w-8 rounded-full"
          >
            <span className="gradient-btn__inner flex h-full w-full items-center justify-center rounded-full text-muted group-hover:text-white">
              <Github size={13} />
            </span>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group gradient-btn h-8 w-8 rounded-full"
          >
            <span className="gradient-btn__inner flex h-full w-full items-center justify-center rounded-full text-muted group-hover:text-white">
              <Linkedin size={13} />
            </span>
          </a>
          <span className="font-mono ml-1">Designed &amp; coded solo</span>
        </div>
      </div>
    </footer>
  )
}
