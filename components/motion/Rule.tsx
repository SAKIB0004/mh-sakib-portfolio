'use client'

import { motion } from 'framer-motion'
import { duration, ease } from '@/lib/motion'

/** Hairline that draws itself in from the left as it enters the viewport. */
export default function Rule({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      data-reveal
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: duration.slow, ease: ease.out }}
    />
  )
}
