import { ChevronDown } from 'lucide-react'
import Section from '@/components/ui/Section'
import { publications } from '@/data'

export default function Research() {
  return (
    <Section
      id="research"
      title="Publications & ongoing research"
      intro="Papers and ongoing work that turn technical questions into structured investigation and measurable contribution."
    >
      <ul className="divide-y divide-line border-y border-line">
        {publications.map((pub, i) => {
          const accepted = pub.status.startsWith('Accepted')
          return (
            <li key={pub.id}>
              {/* Native disclosure: keyboard/AT accessible with no client JS */}
              <details className="group py-7" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <div>
                    <p className="flex items-center gap-2.5 text-small text-dim">
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${
                          accepted ? 'bg-signal' : 'border border-dim'
                        }`}
                      />
                      {pub.status}
                    </p>
                    <h3 className="mt-3 max-w-[40ch] font-display text-heading font-semibold text-bone transition-colors group-hover:text-signal">
                      {pub.title}
                    </h3>
                  </div>
                  <ChevronDown
                    aria-hidden
                    className="mt-2 shrink-0 text-dim transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                <div className="mt-5 max-w-[62ch] space-y-4">
                  {pub.venue && <p className="text-small text-dim">{pub.venue}</p>}
                  <p className="text-bone/90">{pub.abstract}</p>
                  <p className="text-small text-dim">
                    <span className="text-bone">Authors:</span> {pub.authors.join(', ')}
                  </p>
                  <p className="text-small text-dim">
                    <span className="text-bone">Methods:</span> {pub.tech.join(', ')}
                  </p>
                </div>
              </details>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
