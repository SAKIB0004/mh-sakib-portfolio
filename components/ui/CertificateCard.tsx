import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { Certification } from '@/types'

/** UTC so the date never shifts by a day depending on the viewer's timezone. */
export function formatIssueDate(issueDate: string) {
  const date = new Date(issueDate)
  if (Number.isNaN(date.getTime())) return issueDate
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export default function CertificateCard({ cert }: { cert: Certification }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink-raised">
        <Image
          src={cert.image}
          alt={`Certificate: ${cert.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 400px"
          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-bone">
          {cert.title}
        </h3>
        <p className="mt-1 text-small text-dim">
          {cert.issuer ?? cert.organization}
          {cert.organization && cert.issuer && cert.organization !== cert.issuer
            ? ` via ${cert.organization}`
            : ''}
          ; <time dateTime={cert.issueDate}>{formatIssueDate(cert.issueDate)}</time>
        </p>
        <p className="mt-3 text-small text-dim">{cert.skills.join(', ')}</p>
        {cert.credentialId && (
          <p className="mt-3 break-all text-[0.8125rem] text-dim/80">
            Credential ID: <span className="tabular">{cert.credentialId}</span>
          </p>
        )}
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-3 text-small text-signal transition-colors hover:text-heat-5"
          >
            Verify credential <ExternalLink size={14} aria-hidden />
            <span className="sr-only">for {cert.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}
