import Hero from '@/components/hero/Hero'
import About from '@/components/sections/About'
import Inspiration from '@/components/sections/Inspiration'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Achievements from '@/components/sections/Achievements'
import Certifications from '@/components/sections/Certifications'
import Opportunities from '@/components/sections/Opportunities'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Inspiration />
      <Skills />
      <Projects />
      <Research />
      <Experience />
      <Education />
      <Achievements />
      <Certifications />
      <Opportunities />
      <Contact />
    </main>
  )
}
