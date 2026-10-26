import { Download } from 'lucide-react'
import { siteConfig } from '@/data'
import { ButtonLink } from '@/components/ui/Button'
import Magnetic from '@/components/motion/Magnetic'
import SaliencyName from './SaliencyName'

const facts = [
  { value: '700+', label: 'problems solved' },
  { value: '3', label: 'research works' },
  { value: '3.68', label: 'CGPA, B.Sc. CSE' },
]

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-32 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-page">
        <p className="mb-6 max-w-[36ch] font-body text-lead italic text-dim">{siteConfig.title}</p>

        <SaliencyName lines={['Mahmudul Haque', 'Sakib']} />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[38ch] font-body text-lead text-bone lg:col-span-7">
            {siteConfig.tagline}
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Magnetic>
              <ButtonLink href="/#projects">View projects</ButtonLink>
            </Magnetic>
            <ButtonLink href="/#contact" variant="secondary">
              Get in touch
            </ButtonLink>
            <ButtonLink href={siteConfig.resumeUrl} variant="secondary" download>
              <Download size={16} aria-hidden />
              Resume
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <dl className="flex gap-8 sm:gap-12">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="text-small text-dim">{f.label}</dt>
                <dd className="font-display text-heading font-semibold tabular text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
          {siteConfig.availableForWork && (
            <p className="flex items-center gap-3 text-small text-dim">
              <span aria-hidden className="h-2 w-2 rounded-full bg-signal" />
              Available for AI/ML roles and research collaborations
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
