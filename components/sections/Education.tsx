import Section from '@/components/ui/Section'
import { education } from '@/data'

export default function Education() {
  return (
    <Section
      id="education"
      title="Where I built my foundation"
      intro="Educational milestones that laid the groundwork for my technical expertise, research capabilities, and passion for AI."
    >
      {/* A real sequence in time, so a timeline is the right structure */}
      <ol className="relative ml-1 border-l border-line">
        {education.map((edu) => (
          <li key={edu.id} className="relative pb-12 pl-8 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-signal ring-4 ring-ink"
            />
            <p className="text-small text-dim tabular">{edu.duration}</p>
            <h3 className="mt-1 max-w-[34ch] font-display text-heading font-semibold text-bone">
              {edu.degree}
            </h3>
            <p className="mt-2 text-bone">
              {edu.institution}
              <span className="text-dim">, {edu.location}</span>
            </p>
            <p className="text-small text-dim">
              {edu.major}
              {edu.gpa && (
                <>
                  ; {/B\.Sc/.test(edu.degree) ? 'CGPA' : 'GPA'}{' '}
                  <span className="tabular text-bone">{edu.gpa}</span>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
