import { cn } from '@/lib/utils'
import MaskReveal from '@/components/motion/MaskReveal'

interface SectionProps {
  id: string
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
  /** Pin the title while the (long) content column scrolls. */
  stickyTitle?: boolean
}

/**
 * Shared section frame: title column on the left, content on the right
 * (stacked on mobile). Server component — only the title reveal is client JS.
 */
export default function Section({
  id,
  title,
  intro,
  children,
  className,
  stickyTitle = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('px-5 sm:px-8 lg:px-12 pt-section', className)}
    >
      <div className="mx-auto grid max-w-page gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14">
        <header
          className={cn(
            'lg:col-span-4 xl:col-span-4 lg:self-start',
            stickyTitle && 'lg:sticky lg:top-28'
          )}
        >
          <MaskReveal
            as="h2"
            id={`${id}-title`}
            className="font-display text-title font-semibold stretch-condensed text-bone"
          >
            {title}
          </MaskReveal>
          {intro && <p className="mt-5 max-w-[34ch] text-dim text-small">{intro}</p>}
        </header>
        <div className="min-w-0 lg:col-span-8 xl:col-span-8">{children}</div>
      </div>
    </section>
  )
}
