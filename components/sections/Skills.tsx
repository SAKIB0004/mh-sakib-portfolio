import Section from '@/components/ui/Section'
import { skillGroups } from '@/data'

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Stack & strengths"
      intro="The technical foundation behind my workflows in machine learning, retrieval systems, and product-oriented engineering."
    >
      <dl>
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8"
          >
            <dt className="text-small text-dim md:pt-2">{group.category}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {group.items.map((name) => (
                  <li
                    key={name}
                    className="font-display text-heading font-medium stretch-condensed text-bone"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
