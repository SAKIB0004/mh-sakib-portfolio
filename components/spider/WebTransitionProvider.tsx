'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from 'framer-motion'

/**
 * Web-slinging page transitions.
 *
 * Only *route changes* are animated (home <-> certifications <-> project).
 * Same-page #hash jumps, external links, modified clicks and new-tab links
 * are left to the browser. Flow:
 *
 *   click -> strand shoots from the click point to a screen corner
 *         -> web panel irises shut from that corner  (cover, ~0.45s)
 *         -> router.push(href)
 *         -> pathname changes -> panel irises open back to the corner (reveal, ~0.4s)
 *
 * Back/forward and direct URL loads commit before we can cover them, so they
 * keep the plain fade in app/template.tsx instead of flashing an animation.
 */

export interface Point {
  x: number
  y: number
}

interface Geometry {
  w: number
  h: number
  origin: Point
  anchor: Point
  diag: number
}

export type WebNavigate = (href: string, from?: Point) => void

const WebNavigateContext = createContext<WebNavigate | null>(null)

/** Navigate with the web-sling transition (falls back to a plain push if reduced motion). */
export function useWebNavigate(): WebNavigate {
  const ctx = useContext(WebNavigateContext)
  if (!ctx) throw new Error('useWebNavigate must be used inside <WebTransitionProvider>')
  return ctx
}

const SAG = 70 // px the strand droops before it snaps taut
const FAILSAFE_MS = 2000

function buildGeometry(from?: Point): Geometry {
  const w = window.innerWidth
  const h = window.innerHeight
  const origin = from ?? { x: w / 2, y: h / 2 }
  // Anchor to the top corner on the opposite side of the click, like a swing line.
  const anchor = { x: origin.x < w / 2 ? w - 18 : 18, y: 18 }
  return { w, h, origin, anchor, diag: Math.hypot(w, h) * 1.05 }
}

function strandPath(g: Geometry, sag: number): string {
  const mx = (g.origin.x + g.anchor.x) / 2
  const my = (g.origin.y + g.anchor.y) / 2 + sag
  return `M ${g.origin.x} ${g.origin.y} Q ${mx} ${my} ${g.anchor.x} ${g.anchor.y}`
}

/** Radial threads + 3 concentric polylines fanning from the anchor into the viewport. */
function webLines(g: Geometry) {
  const base = Math.atan2(g.h / 2 - g.anchor.y, g.w / 2 - g.anchor.x)
  const angles = Array.from({ length: 9 }, (_, i) => base + (i - 4) * 0.2)
  const radial = angles.map((a) => ({
    x2: g.anchor.x + Math.cos(a) * g.diag,
    y2: g.anchor.y + Math.sin(a) * g.diag,
  }))
  const rings = [0.18, 0.36, 0.6].map((f) =>
    angles
      .map((a) => `${g.anchor.x + Math.cos(a) * g.diag * f},${g.anchor.y + Math.sin(a) * g.diag * f}`)
      .join(' ')
  )
  return { radial, rings }
}

export default function WebTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const reduce = useReducedMotion()

  const [active, setActive] = useState(false)
  const [geo, setGeo] = useState<Geometry | null>(null)

  const busy = useRef(false)
  const aborted = useRef(false)
  const pendingFrom = useRef<string | null>(null)
  const geoRef = useRef<Geometry | null>(null)
  const failsafe = useRef<ReturnType<typeof setTimeout>>()
  const controls = useRef<AnimationPlaybackControls[]>([])

  const strand = useMotionValue(0)
  const cover = useMotionValue(0)
  const sag = useMotionValue(SAG)

  const d = useTransform(sag, (s) => (geoRef.current ? strandPath(geoRef.current, s) : ''))
  const clip = useTransform(cover, (v) => {
    const g = geoRef.current
    return g ? `circle(${v * g.diag}px at ${g.anchor.x}px ${g.anchor.y}px)` : 'circle(0px at 0 0)'
  })
  const webOpacity = useTransform(cover, [0, 1], [0, 0.55])
  const anchorOpacity = useTransform(strand, [0.8, 1], [0, 1])

  const track = (c: AnimationPlaybackControls) => {
    controls.current.push(c)
    return c
  }

  const finish = useCallback(() => {
    setActive(false)
    busy.current = false
    pendingFrom.current = null
    controls.current = []
  }, [])

  const reveal = useCallback(async () => {
    clearTimeout(failsafe.current)
    pendingFrom.current = null
    track(animate(strand, 0, { duration: 0.2, ease: 'easeOut' }))
    await track(animate(cover, 0, { duration: 0.4, ease: [0.22, 1, 0.36, 1] }))
    finish()
  }, [cover, strand, finish])

  const run = useCallback(
    async (href: string, from?: Point) => {
      if (busy.current) return // never overlap two transitions
      if (reduce) {
        router.push(href)
        return
      }
      busy.current = true
      aborted.current = false
      const g = buildGeometry(from)
      geoRef.current = g
      setGeo(g)
      setActive(true)
      strand.set(0)
      cover.set(0)
      sag.set(SAG)
      pendingFrom.current = window.location.pathname

      await track(animate(strand, 1, { duration: 0.24, ease: [0.3, 0, 0.2, 1] }))
      if (aborted.current) return
      // Recoil: the line snaps taut with a springy overshoot while the web closes.
      track(animate(sag, 0, { type: 'spring', stiffness: 420, damping: 11 }))
      await track(animate(cover, 1, { duration: 0.3, ease: [0.5, 0, 0.75, 0] }))
      if (aborted.current) return

      failsafe.current = setTimeout(() => void reveal(), FAILSAFE_MS)
      router.push(href)
    },
    [reduce, router, strand, cover, sag, reveal]
  )

  // Route committed: if we started this navigation, open the web back up.
  useEffect(() => {
    if (pendingFrom.current === null || pendingFrom.current === pathname) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => void reveal()))
    return () => cancelAnimationFrame(id)
  }, [pathname, reveal])

  // Single delegated listener for all internal links (registered once).
  const runRef = useRef(run)
  runRef.current = run
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return // same page: native hash scroll
      e.preventDefault()
      const r = a.getBoundingClientRect()
      const from: Point =
        e.detail === 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: e.clientX, y: e.clientY }
      void runRef.current(url.pathname + url.search + url.hash, from)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Cleanup everything on unmount.
  useEffect(
    () => () => {
      aborted.current = true
      clearTimeout(failsafe.current)
      controls.current.forEach((c) => c.stop())
    },
    []
  )

  const web = geo ? webLines(geo) : null

  return (
    <WebNavigateContext.Provider value={run}>
      {children}
      {active && geo && web && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]" data-web-transition>
          <motion.div className="absolute inset-0 bg-ink" style={{ clipPath: clip }}>
            <motion.svg
              className="absolute inset-0 h-full w-full"
              width={geo.w}
              height={geo.h}
              style={{ opacity: webOpacity }}
            >
              {web.radial.map((l, i) => (
                <line key={i} x1={geo.anchor.x} y1={geo.anchor.y} x2={l.x2} y2={l.y2} stroke="rgb(var(--bone))" strokeWidth="0.6" strokeOpacity="0.5" />
              ))}
              {web.rings.map((pts, i) => (
                <polyline key={i} points={pts} fill="none" stroke="rgb(var(--bone))" strokeWidth="0.6" strokeOpacity="0.35" />
              ))}
            </motion.svg>
          </motion.div>

          <svg className="absolute inset-0 h-full w-full" width={geo.w} height={geo.h}>
            <motion.path
              d={d}
              pathLength={strand}
              fill="none"
              stroke="rgb(var(--bone))"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <motion.g style={{ opacity: anchorOpacity }}>
              <circle cx={geo.anchor.x} cy={geo.anchor.y} r="9" fill="none" stroke="rgb(var(--spidey))" strokeWidth="1.2" />
              <circle cx={geo.anchor.x} cy={geo.anchor.y} r="2.5" fill="rgb(var(--spidey))" />
            </motion.g>
          </svg>
        </div>
      )}
    </WebNavigateContext.Provider>
  )
}
