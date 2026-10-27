'use client'

import { Terminal } from 'lucide-react'
import { useTerminal } from './TerminalProvider'

/** Header button that opens/closes Terminal Mode (also bound to the ` key). */
export default function TerminalToggle() {
  const { open, toggle } = useTerminal()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={open}
      aria-label="Terminal mode"
      aria-keyshortcuts="`"
      title="Terminal mode (`)"
      className="flex h-11 w-11 items-center justify-center rounded-[4px] text-dim transition-colors hover:text-bone aria-pressed:text-signal"
    >
      <Terminal size={19} aria-hidden />
    </button>
  )
}
