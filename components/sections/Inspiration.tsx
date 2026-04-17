'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '@/components/ui/Section'
import { inspirations } from '@/data'
import type { InspirationItem } from '@/types'

const inspirationItems = inspirations as InspirationItem[]

function PosterCard({
  item,
  index,
  inView,
}: {
  item: InspirationItem
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group relative w-full min-w-0"
    >
      <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(8,14,24,0.96)_0%,rgba(6,10,18,0.98)_100%)] shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={item.poster}
            alt={item.title}
            fill
            priority={index < 3}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,12,0.06)_0%,rgba(2,6,12,0.18)_42%,rgba(2,6,12,0.88)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_35%)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-display text-xl font-semibold leading-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] transition-colors duration-300 group-hover:text-accent-cyan sm:text-2xl">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.article>
  )
}

export default function Inspiration() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="inspiration"
      label="#1 — Inspiration"
      title="Cinematic Origins of My Curiosity"
      subtitle="A small collection of films and programmes that sparked my imagination long before I built systems of my own."
    >
      <div ref={ref}>
        <div className="grid grid-flow-col auto-cols-[220px] md:auto-cols-[240px] gap-5 overflow-x-auto pb-2">
          {inspirationItems.map((item, index) => (
            <PosterCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}