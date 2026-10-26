import Section from '@/components/ui/Section'
import { experience } from '@/data'

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      intro="Roles and responsibilities that shaped how I teach, collaborate, and build with technical clarity."
    >
      <ol className="space-y-12">
        {experience.map((job) => (
          <li key={job.id}>
            <h3 className="font-display text-heading font-semibold text-bone">{job.role}</h3>
            <p className="mt-2 text-bone">{job.organization}</p>
            <p className="text-small text-dim">
              {job.duration}; {job.location}; {job.type}
            </p>
            <ul className="mt-6 max-w-[62ch] list-disc space-y-3 pl-5 text-dim marker:text-line">
              {job.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
