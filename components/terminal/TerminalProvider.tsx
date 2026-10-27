'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useWebNavigate } from '@/components/spider/WebTransitionProvider'
import {
  DESCRIPTIONS,
  runCommand,
  suggest,
  type CommandName,
  type TerminalAction,
} from '@/lib/terminal-commands'
import { duration, ease } from '@/lib/motion'

/**
 * Optional Terminal Mode: a docked, command-driven way to explore the site.
 * Non-modal (the portfolio stays visible and navigates behind it).
 * Toggle: header button, or the ` (backquote) key when you are not typing in a field.
 */

interface TerminalContextValue {
  open: boolean
  toggle: () => void
}

const TerminalContext = createContext<TerminalContextValue | null>(null)

export function useTerminal(): TerminalContextValue {
  const ctx = useContext(TerminalContext)
  if (!ctx) throw new Error('useTerminal must be used inside <TerminalProvider>')
  return ctx
}

type EntryKind = 'input' | 'output' | 'error'
interface Entry {
  id: number
  kind: EntryKind
  lines: string[]
}

const WELCOME: string[] = ['Terminal mode. Type "help" for commands, Esc to exit.']

function isTypingTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null
  if (!el || !el.tagName) return false
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable
}

export default function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const historyRef = useRef<string[]>([]) // survives close/reopen within the session

  const toggle = useCallback(() => setOpen((o) => !o), [])

  // Global ` toggle. Never fires while typing in a form field or with modifiers.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '`' || e.repeat || e.isComposing) return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (isTypingTarget(e.target)) return
      e.preventDefault()
      setOpen((o) => !o)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ open, toggle }), [open, toggle])

  return (
    <TerminalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && <TerminalPanel onClose={() => setOpen(false)} historyRef={historyRef} />}
      </AnimatePresence>
    </TerminalContext.Provider>
  )
}

function TerminalPanel({
  onClose,
  historyRef,
}: {
  onClose: () => void
  historyRef: React.MutableRefObject<string[]>
}) {
  const pathname = usePathname()
  const navigate = useWebNavigate()
  const reduce = useReducedMotion()

  const [entries, setEntries] = useState<Entry[]>([{ id: 0, kind: 'output', lines: WELCOME }])
  const [input, setInput] = useState('')
  const cursor = useRef<number | null>(null) // position in history while browsing with ↑/↓
  const draft = useRef('') // what was typed before browsing history
  const nextId = useRef(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  // Focus management: into the input on open, back to the opener on close.
  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => returnFocus.current?.focus?.()
  }, [])

  // Escape closes from anywhere inside the panel (including the suggestion chips).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries])

  const goToSection = useCallback(
    (id: string) => {
      if (pathname === '/') document.getElementById(id)?.scrollIntoView()
      else navigate(`/#${id}`)
    },
    [pathname, navigate]
  )

  const perform = useCallback(
    (action: TerminalAction) => {
      switch (action.type) {
        case 'goto':
          goToSection(action.section)
          break
        case 'open':
          window.open(action.url, '_blank', 'noopener,noreferrer')
          break
        case 'clear':
          setEntries([])
          break
        case 'exit':
          onClose()
          break
      }
    },
    [goToSection, onClose]
  )

  const execute = useCallback(
    (raw: string) => {
      const text = raw.trim()
      if (!text) return
      const result = runCommand(text)
      historyRef.current = [...historyRef.current.filter((h) => h !== text), text].slice(-50)
      cursor.current = null
      setEntries((prev) => [
        ...prev,
        { id: nextId.current++, kind: 'input', lines: [text.slice(0, 120)] },
        ...(result.lines.length
          ? [{ id: nextId.current++, kind: (result.error ? 'error' : 'output') as EntryKind, lines: result.lines }]
          : []),
      ])
      setInput('')
      if (result.action) perform(result.action)
    },
    [historyRef, perform]
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const hist = historyRef.current
    if (e.key === 'Enter') {
      e.preventDefault()
      execute(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!hist.length) return
      if (cursor.current === null) {
        draft.current = input
        cursor.current = hist.length - 1
      } else cursor.current = Math.max(0, cursor.current - 1)
      setInput(hist[cursor.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor.current === null) return
      if (cursor.current >= hist.length - 1) {
        cursor.current = null
        setInput(draft.current)
      } else {
        cursor.current += 1
        setInput(hist[cursor.current])
      }
    } else if (e.key === 'Tab') {
      const matches = suggest(input)
      if (input.trim() && matches.length === 1) {
        e.preventDefault()
        setInput(matches[0])
      }
    }
  }

  const matches: CommandName[] = suggest(input.trim().split(/\s+/)[0] ?? '')

  return (
    <motion.section
      role="region"
      aria-label="Terminal mode"
      initial={reduce ? { opacity: 0 } : { y: '100%' }}
      animate={reduce ? { opacity: 1 } : { y: 0 }}
      exit={reduce ? { opacity: 0 } : { y: '100%' }}
      transition={{ duration: duration.base, ease: ease.out }}
      className="fixed inset-x-0 bottom-0 z-[75] border-t border-line bg-ink-raised/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[min(46vh,24rem)] max-w-page flex-col px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-3">
          <p className="font-display text-small font-semibold text-bone">
            Terminal mode <span className="font-normal text-dim">— type a command</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Exit terminal mode"
            className="flex h-11 items-center gap-2 rounded-[4px] border border-line px-3 text-small text-bone transition-colors hover:border-bone"
          >
            <X size={16} aria-hidden /> Exit <span className="sr-only">(Escape)</span>
          </button>
        </div>

        {/* Output: announced politely to screen readers as lines are added */}
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Terminal output"
          tabIndex={0}
          className="flex-1 overflow-y-auto rounded-[4px] border border-line bg-ink/60 p-4 font-mono text-[0.85rem] leading-relaxed"
        >
          {entries.map((en) => (
            <div key={en.id} className="mb-2">
              {en.lines.map((line, i) => (
                <p
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    en.kind === 'input' ? 'text-bone' : en.kind === 'error' ? 'text-heat-3' : 'text-dim'
                  }`}
                >
                  {en.kind === 'input' ? <span aria-hidden className="mr-2 text-signal">&gt;</span> : null}
                  {en.kind === 'input' ? <span className="sr-only">Command: </span> : null}
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <ul aria-label="Command suggestions" className="flex flex-wrap gap-x-1 gap-y-0 py-1">
          {matches.map((c) => (
            <li key={c}>
              <button
                type="button"
                title={DESCRIPTIONS[c]}
                onClick={() => {
                  execute(c)
                  inputRef.current?.focus()
                }}
                className="min-h-[36px] rounded-[4px] px-2.5 text-small text-dim transition-colors hover:text-signal"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 border-t border-line py-2">
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <span aria-hidden className="text-signal">
            &gt;
          </span>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              cursor.current = null
            }}
            onKeyDown={onKeyDown}
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            maxLength={120}
            placeholder='try "help"'
            className="min-h-[44px] w-full bg-transparent font-mono text-[0.9rem] text-bone placeholder:text-dim/60 focus:outline-none"
          />
        </div>
      </div>
    </motion.section>
  )
}
