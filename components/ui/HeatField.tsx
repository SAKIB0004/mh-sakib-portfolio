/**
 * Deterministic "saliency map" artwork, seeded from a string.
 * Pure SVG, no randomness at render time (safe for SSR/hydration).
 * It is abstract identity art for a project — NOT a screenshot.
 */
function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function HeatField({
  seed,
  className,
  blobs = 4,
}: {
  seed: string
  className?: string
  blobs?: number
}) {
  const rand = mulberry32(hash(seed))
  const uid = `hf-${hash(seed).toString(36)}`
  const items = Array.from({ length: blobs }, (_, i) => ({
    cx: 12 + rand() * 76,
    cy: 14 + rand() * 72,
    r: 18 + rand() * 30,
    o: i === 0 ? 1 : 0.55 + rand() * 0.35,
  }))

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
      aria-hidden
      focusable="false"
    >
      <defs>
        {items.map((_, i) => (
          <radialGradient key={i} id={`${uid}-${i}`}>
            <stop offset="0%" stopColor="rgb(252 253 191)" />
            <stop offset="22%" stopColor="rgb(254 159 109)" />
            <stop offset="48%" stopColor="rgb(222 73 104)" />
            <stop offset="74%" stopColor="rgb(140 41 129)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(59 15 112)" stopOpacity="0" />
          </radialGradient>
        ))}
        <pattern id={`${uid}-grid`} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0H0V5" fill="none" stroke="rgb(243 238 231)" strokeOpacity="0.06" strokeWidth="0.2" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="rgb(19 15 38)" />
      {items.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} opacity={b.o} fill={`url(#${uid}-${i})`} />
      ))}
      <rect width="100" height="100" fill={`url(#${uid}-grid)`} />
    </svg>
  )
}
