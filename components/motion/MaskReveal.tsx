'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { duration, ease } from '@/lib/motion'

interface MaskRevealProps {
  children: React.ReactNode
  /** Rendered element for the outer wrapper (keeps heading semantics). */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  id?: string
  className?: string
  delay?: number
}

/**
 * Text rises out of a clipped line box when scrolled into view.
 * Used for section titles only — the single recurring scroll gesture.
 */
export default function MaskReveal({
  children,
  as = 'h2',
  id,
  className,
  delay = 0,
}: MaskRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const Tag = motion[as] as typeof motion.h2

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} id={id} className={className}>
      <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <motion.span
          data-reveal
          className="block"
          initial={{ y: '105%' }}
          animate={inView ? { y: '0%' } : undefined}
          transition={{ duration: duration.slow, ease: ease.out, delay }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  )
}
