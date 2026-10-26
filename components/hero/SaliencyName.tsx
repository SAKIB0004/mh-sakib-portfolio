'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { duration, ease, stagger } from '@/lib/motion'

/**
 * The hero name, treated like an image a model is "looking at".
 *
 * Layers (all share identical box metrics so glyphs line up exactly):
 *   1. the real <h1> — bone-coloured text, lines rise in on load
 *   2. an aria-hidden duplicate whose text is painted by a radial heat
 *      gradient centred on --mx/--my (see .saliency-layer in globals.css)
 *
 * The hot spot follows a mouse/pen with light smoothing. With no pointer
 * (touch, or idle for 2.5s) it drifts slowly along the name. Under
 * prefers-reduced-motion it never drifts and tracks the pointer directly.
 */
const lineBox = 'block overflow-hidden pt-[0.08em] pb-[0.16em] -mt-[0.08em] -mb-[0.16em]'

export default function SaliencyName({ lines }: { lines: string[] }) {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const h1 = h1Ref.current
    const layer = layerRef.current
    if (!h1 || !layer || !ready) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true
    let lastPointer = -Infinity
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let w = h1.offsetWidth
    let h = h1.offsetHeight
    tx = cx = w * 0.7
    ty = cy = h * 0.4

    const paint = () => {
      layer.style.setProperty('--mx', `${cx}px`)
      layer.style.setProperty('--my', `${cy}px`)
    }
    paint()

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = h1.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      lastPointer = performance.now()
      if (reduce) {
        cx = tx
        cy = ty
        paint()
      }
    }

    const loop = (t: number) => {
      if (!visible) return
      if (t - lastPointer > 2500) {
        tx = w * (0.5 + 0.38 * Math.sin(t / 4200))
        ty = h * (0.5 + 0.32 * Math.sin(t / 3100 + 1.3))
      }
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      paint()
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      w = h1.offsetWidth
      h = h1.offsetHeight
    })
    ro.observe(h1)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !reduce) raf = requestAnimationFrame(loop)
    })
    io.observe(h1)

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [ready])

  const type =
    'font-display text-display font-bold stretch-condensed uppercase'

  return (
    <div className="relative">
      <h1 ref={h1Ref} className={`${type} flow-root text-bone`}>
        {lines.map((line, i) => (
          <span key={line} className={lineBox}>
            <motion.span
              data-reveal
              className="block"
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: duration.slow, ease: ease.out, delay: 0.15 + i * stagger * 1.4 }}
              onAnimationComplete={i === lines.length - 1 ? () => setReady(true) : undefined}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Decorative duplicate — hidden from assistive tech and pointer */}
      <div
        ref={layerRef}
        aria-hidden
        className={`saliency-layer pointer-events-none absolute inset-0 select-none transition-opacity duration-700 ${type} ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {lines.map((line) => (
          <span key={line} className={lineBox}>
            <span className="block">{line}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
