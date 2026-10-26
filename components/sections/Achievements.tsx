import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import { achievements } from '@/data'

export default function Achievements() {
  return (
    <Section
      id="achievements"
      title="Milestones that matter"
      intro="A record of competitive, academic, and research recognition earned through consistency and performance."
    >
      <ul className="divide-y divide-line border-y border-line">
        {achievements.map((a) => (
          <li key={a.id} className="grid gap-2 py-7 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8">
            <p className="text-small text-dim tabular sm:pt-2">{a.year}</p>
            <div>
              <h3 className="font-display text-heading font-semibold text-bone">
                {a.link ? (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 transition-colors hover:text-signal"
                  >
                    {a.title}
                    <ArrowUpRight size={18} aria-hidden className="shrink-0 self-center" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  a.title
                )}
              </h3>
              {a.organization && <p className="mt-1 text-small text-dim">{a.organization}</p>}
              <p className="mt-3 max-w-[60ch] text-dim">{a.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
