import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[4px] px-6 py-3.5 font-display text-[0.95rem] font-semibold tracking-tight transition-colors duration-200 min-h-[48px]'

const variants: Record<Variant, string> = {
  primary: 'bg-signal text-ink hover:bg-heat-5',
  secondary: 'border border-line text-bone hover:border-bone',
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
  external?: boolean
  download?: boolean
}

/** Anchor-styled-as-button. Uses next/link for in-app routes. */
export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children,
  external,
  download,
}: ButtonLinkProps) {
  const cls = cn(base, variants[variant], className)
  if (external || download || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

export function buttonClasses(variant: Variant = 'primary', className?: string) {
  return cn(base, variants[variant], className)
}
