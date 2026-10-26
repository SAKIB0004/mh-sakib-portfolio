'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** 2px heat-gradient reading progress line pinned to the top edge. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-heat-3 via-heat-4 to-heat-5"
    />
  )
}
