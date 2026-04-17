'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  label: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, label, title, subtitle, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id={id} ref={ref} className={cn('py-16 md:py-20 px-6 lg:px-12 max-w-7xl mx-auto', className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 md:mb-12"
      >
        <span className="section-label">{label}</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mt-3 mb-4 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="font-body text-lg text-text-secondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-blue" />
      </motion.div>
      {children}
    </section>
  )
}
