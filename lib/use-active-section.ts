'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Scroll-spy for single-page section navigation.
 *
 * An IntersectionObserver watches every section in `ids` through a thin band
 * ~35% down the viewport. It is used purely as a cheap *trigger*: whenever any
 * section crosses the band, scrolling settles, or the window resizes we re-resolve the answer
 * from fresh geometry — "the last section whose top is at or above that line".
 * That makes the result independent of scroll history, so it is also correct
 * after a refresh mid-page, a #hash load, back/forward scroll restoration, and
 * jumps into sections that are not in `ids` (they belong to the previous item).
 * Above the first section (the hero) nothing is active.
 *
 * `lock(id)` pins a clicked item while the browser smooth-scrolls, so the lamp
 * travels straight to its target instead of flickering across every section.
 *
 * `ids` must be listed in the order the sections appear on the page.
 */
const LOCK_MS = 1400
const LINE = 0.35 // fraction of viewport height

export function useActiveSection(
  ids: readonly string[],
  enabled: boolean
): { active: string; lock: (id: string) => void } {
  const [active, setActive] = useState('')
  const latest = useRef('') // what the observer last resolved (even while locked)
  const lockTimer = useRef<ReturnType<typeof setTimeout>>()
  const locked = useRef(false)
  const key = ids.join('|') // stable dependency for the id list

  useEffect(() => {
    if (!enabled) {
      latest.current = ''
      setActive('')
      return
    }

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const resolve = () => {
      const line = window.innerHeight * LINE
      let current = ''
      for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el.id
      latest.current = current
      if (!locked.current) setActive(current)
    }

    const io = new IntersectionObserver(resolve, { rootMargin: '-35% 0px -64% 0px' })
    targets.forEach((t) => io.observe(t))

    // Safety net: an instant jump that crosses no observed section (e.g. between
    // two sections that are not in `ids`) triggers no observer callback, so also
    // resolve once, shortly after any scrolling stops. No per-frame work.
    let settle: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      clearTimeout(settle)
      settle = setTimeout(resolve, 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resolve)
    resolve()

    return () => {
      clearTimeout(settle)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resolve)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  useEffect(() => () => clearTimeout(lockTimer.current), [])

  const lock = useCallback((id: string) => {
    clearTimeout(lockTimer.current)
    locked.current = true
    setActive(id)
    lockTimer.current = setTimeout(() => {
      locked.current = false
      setActive(latest.current || id) // hand control back to the observer
    }, LOCK_MS)
  }, [])

  return { active, lock }
}
