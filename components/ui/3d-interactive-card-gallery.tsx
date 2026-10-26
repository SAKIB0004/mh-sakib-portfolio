'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GalleryCard {
  id: string
  title: string
  image: string
  /** Optional supporting copy — only rendered when provided. */
  description?: string
  category?: string
}

interface InteractiveCardGalleryProps {
  cards: GalleryCard[]
  /** Accessible name for the whole carousel. */
  label: string
  className?: string
}

const MOBILE_QUERY = '(max-width: 767px)'

/**
 * Coverflow-style card carousel with a pointer-driven 3D tilt on the active
 * card. Adapted from a 21st.dev component: typed, prop-driven, keyboard
 * operable (←/→ and dots), motion-safe, and built on the site's design tokens.
 */
export default function InteractiveCardGallery({ cards, label, className }: InteractiveCardGalleryProps) {
  const [active, setActive] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const go = (i: number) => setActive((i + cards.length) % cards.length)

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === 'touch' || !stageRef.current) return
    const r = stageRef.current.getBoundingClientRect()
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1)
    }
  }

  const cardStyle = (index: number): React.CSSProperties => {
    const diff = index - active
    const abs = Math.abs(diff)
    const opacity = Math.max(0, 1 - abs * (isMobile ? 0.25 : 0.3))
    const base: React.CSSProperties = { zIndex: cards.length - abs, opacity }
    if (isMobile) {
      base.transform = `translateY(${diff * 18}px) scale(${1 - abs * 0.08})`
    } else {
      base.transform = `translateX(${diff * 58}%) scale(${1 - abs * 0.18})`
      base.filter = diff === 0 || reduce ? 'none' : 'blur(2px)'
    }
    return base
  }

  const current = cards[active]

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn('rounded-[4px] focus-visible:outline-offset-8', className)}
    >
      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative mx-auto flex h-[26rem] w-full max-w-3xl items-center justify-center overflow-hidden sm:h-[30rem]"
      >
        {cards.map((card, index) => {
          const isActive = index === active
          return (
            <div
              key={card.id}
              aria-hidden={!isActive}
              style={{
                ...cardStyle(index),
                transition: reduce ? 'none' : 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
              }}
              className="absolute w-[min(78%,17rem)] sm:w-[17rem]"
            >
              <motion.figure
                style={{
                  transform:
                    isActive && !reduce
                      ? `perspective(1000px) rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg)`
                      : 'none',
                  transition: 'transform 0.2s ease-out',
                }}
                className="overflow-hidden rounded-[4px] border border-line bg-ink-raised"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={card.image}
                    alt={`Poster: ${card.title}`}
                    fill
                    sizes="272px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4">
                  {card.category && <p className="text-small text-dim">{card.category}</p>}
                  <p className="font-display text-[1.15rem] font-semibold leading-snug text-bone">
                    {card.title}
                  </p>
                  {card.description && <p className="mt-2 text-small text-dim">{card.description}</p>}
                </figcaption>
              </motion.figure>

              {/* Inactive cards: click to bring forward (dots/arrows cover keyboard) */}
              {!isActive && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(index)}
                  aria-label={`Show ${card.title}`}
                  className="absolute inset-0 cursor-pointer rounded-[4px]"
                />
              )}
            </div>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${current.title}, ${active + 1} of ${cards.length}`}
      </p>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-bone"
        >
          <ChevronLeft size={20} aria-hidden />
        </button>

        <div className="flex items-center">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => go(index)}
              aria-label={`Go to ${card.title}`}
              aria-current={index === active ? 'true' : undefined}
              className="group flex h-11 w-5 items-center justify-center"
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-all duration-300',
                  index === active ? 'w-5 bg-signal' : 'w-2 bg-line group-hover:bg-dim'
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-bone"
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>
    </div>
  )
}