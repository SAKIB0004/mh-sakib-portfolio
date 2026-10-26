'use client'

import { motion } from 'framer-motion'
import { duration, ease } from '@/lib/motion'

/**
 * A template (unlike a layout) re-mounts on every navigation, which gives
 * route-aware motion: each new page settles in with a short fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      {children}
    </motion.div>
  )
}
