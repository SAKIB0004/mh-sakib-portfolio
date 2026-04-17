import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Inspiration from '@/components/sections/Inspiration'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Achievements from '@/components/sections/Achievements'
import Certifications from '@/components/sections/Certifications'
import LookingFor from '@/components/sections/LookingFor'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <Hero />

      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

      <About />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Inspiration />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Skills />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Projects />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Research />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Experience />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Education />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Achievements />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <Certifications />
      <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent mx-12" />

      <LookingFor />
      <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

      <Contact />

      <Footer />
    </main>
  )
}
