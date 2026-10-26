import Section from '@/components/ui/Section'
import InteractiveCardGallery from '@/components/ui/3d-interactive-card-gallery'
import { inspirations } from '@/data'

export default function Inspiration() {
  const cards = inspirations.map(({ id, title, poster }) => ({ id, title, image: poster }))

  return (
    <Section
      id="inspiration"
      title="Cinematic origins of my curiosity"
      intro="A small collection of films and programmes that sparked my imagination long before I built systems of my own."
    >
      <InteractiveCardGallery cards={cards} label="Films that inspired me" />
    </Section>
  )
}