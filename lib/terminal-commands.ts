import { categoryLabels, projects, siteConfig, skillGroups } from '@/data'
import { splitTitle } from '@/lib/projects'

/**
 * Terminal Mode command parser.
 *
 * SAFETY: this is a lookup table, not an interpreter. Input is reduced to its
 * first whitespace-delimited word and matched against COMMANDS. Nothing is
 * ever evaluated, no shell/JS is run, and arguments are ignored. Results are
 * plain data (text lines + one allowlisted action) that the UI performs.
 * All content comes from `data/` — nothing is duplicated here.
 */

export const COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'contact',
  'resume',
  'github',
  'linkedin',
  'clear',
  'exit',
] as const

export type CommandName = (typeof COMMANDS)[number]

export type SectionTarget = 'about' | 'projects' | 'contact'

export type TerminalAction =
  | { type: 'goto'; section: SectionTarget }
  | { type: 'open'; url: string }
  | { type: 'clear' }
  | { type: 'exit' }

export interface CommandResult {
  lines: string[]
  action?: TerminalAction
  error?: boolean
}

export const DESCRIPTIONS: Record<CommandName, string> = {
  help: 'List available commands',
  about: 'Show the About section',
  projects: 'List projects and jump to them',
  skills: 'Show technical skills',
  contact: 'Jump to Contact and show email',
  resume: 'Open the resume (PDF)',
  github: 'Open the GitHub profile',
  linkedin: 'Open the LinkedIn profile',
  clear: 'Clear the terminal',
  exit: 'Return to the normal portfolio',
}

export function isCommand(word: string): word is CommandName {
  return (COMMANDS as readonly string[]).includes(word)
}

/** Commands starting with the typed prefix (for suggestions / Tab completion). */
export function suggest(prefix: string): CommandName[] {
  const p = prefix.trim().toLowerCase()
  return COMMANDS.filter((c) => c.startsWith(p))
}

function distance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[a.length][b.length]
}

function didYouMean(word: string): CommandName | undefined {
  return COMMANDS.map((c) => ({ c, d: distance(word, c) }))
    .filter((x) => x.d <= 2)
    .sort((a, b) => a.d - b.d)[0]?.c
}

/** Only http(s) URLs or same-site paths may ever be opened. */
function safeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  if (url.startsWith('/') && !url.startsWith('//')) return url
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : undefined
  } catch {
    return undefined
  }
}

export function runCommand(input: string): CommandResult {
  const word = input.trim().toLowerCase().split(/\s+/)[0] ?? ''
  if (!word) return { lines: [] }

  if (!isCommand(word)) {
    const hint = didYouMean(word)
    return {
      error: true,
      lines: [
        `command not found: ${word.slice(0, 40)}`,
        hint ? `Did you mean "${hint}"? Type "help" for all commands.` : 'Type "help" to see available commands.',
      ],
    }
  }

  switch (word) {
    case 'help':
      return {
        lines: [
          'Available commands:',
          ...COMMANDS.map((c) => `  ${c.padEnd(9)} ${DESCRIPTIONS[c]}`),
        ],
      }
    case 'about':
      return {
        lines: [siteConfig.name, siteConfig.title, siteConfig.tagline, siteConfig.location, 'Scrolling to About…'],
        action: { type: 'goto', section: 'about' },
      }
    case 'projects':
      return {
        lines: [
          `${projects.length} projects. Opening the Projects section…`,
          ...projects.map((p) => `  ${splitTitle(p.title).name} (${categoryLabels[p.category]}) — /projects/${p.id}`),
        ],
        action: { type: 'goto', section: 'projects' },
      }
    case 'skills':
      return { lines: skillGroups.map((g) => `${g.category}: ${g.items.join(', ')}`) }
    case 'contact':
      return {
        lines: [`Email: ${siteConfig.email}`, siteConfig.location, 'Scrolling to Contact…'],
        action: { type: 'goto', section: 'contact' },
      }
    case 'resume': {
      const url = safeUrl(siteConfig.resumeUrl)
      return url
        ? { lines: ['Opening resume in a new tab…'], action: { type: 'open', url } }
        : { error: true, lines: ['No resume link is configured.'] }
    }
    case 'github': {
      const url = safeUrl(siteConfig.github)
      return url
        ? { lines: [`Opening ${url}…`], action: { type: 'open', url } }
        : { error: true, lines: ['No GitHub profile is configured.'] }
    }
    case 'linkedin': {
      const url = safeUrl(siteConfig.linkedin)
      return url
        ? { lines: [`Opening ${url}…`], action: { type: 'open', url } }
        : { error: true, lines: ['No LinkedIn profile is configured.'] }
    }
    case 'clear':
      return { lines: [], action: { type: 'clear' } }
    case 'exit':
      return { lines: ['Leaving terminal mode.'], action: { type: 'exit' } }
  }
}
