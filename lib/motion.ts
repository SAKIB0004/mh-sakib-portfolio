/**
 * One motion language for the whole site.
 * - Everything eases out (fast start, soft landing).
 * - Durations are drawn from a tiny set; stagger is constant.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
}

export const stagger = 0.08
