import Link from 'next/link'
import { cn } from '@/lib/utils'

const cls =
  'underline decoration-line decoration-1 underline-offset-[0.28em] transition-colors hover:text-signal hover:decoration-signal'

export default function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}) {
  if (external || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={cn(cls, className)}
        {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cn(cls, className)}>
      {children}
    </Link>
  )
}
