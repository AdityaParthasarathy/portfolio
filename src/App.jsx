import Background from './components/Background'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import WorkTimeline from './components/WorkTimeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="noise relative min-h-screen">
      <Background />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <WorkTimeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
