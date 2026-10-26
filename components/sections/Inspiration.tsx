import Image from 'next/image'
import Section from '@/components/ui/Section'
import { inspirations } from '@/data'

export default function Inspiration() {
  return (
    <Section
      id="inspiration"
      title="Cinematic origins of my curiosity"
      intro="A small collection of films and programmes that sparked my imagination long before I built systems of my own."
    >
      {/* Scrollable region is focusable so keyboard users can pan it with the arrow keys */}
      <div
        role="region"
        aria-label="Film posters that inspired me — scroll horizontally"
        tabIndex={0}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
      >
        {inspirations.map((item) => (
          <figure
            key={item.id}
            className="group w-[11.5rem] shrink-0 snap-start sm:w-[13.5rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-ink-raised">
              <Image
                src={item.poster}
                alt={`Poster: ${item.title}`}
                fill
                sizes="(max-width: 640px) 184px, 216px"
                className="object-cover grayscale transition duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 [@media(hover:none)]:grayscale-0"
              />
            </div>
            <figcaption className="mt-3 font-display text-small font-medium leading-snug text-dim transition-colors group-hover:text-bone">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
