# CLAUDE.md — Project memory: Mahmudul Haque Sakib portfolio

Personal portfolio for an AI/ML engineer. Live: https://mhsakib.vercel.app (Vercel, deployed via GitHub Actions in `.github/workflows`).
Positioning comes from `data/index.ts` (`siteConfig`): **AI/ML Engineer & Research Enthusiast**. Do not re-brand as "backend developer" without being asked.

## Stack
Next.js 14.2 (App Router) · React 18 · TypeScript (strict) · Tailwind 3.4 · Framer Motion 11 · lucide-react.
Fonts are **self-hosted** via `@fontsource-variable/*` + `next/font/local` (`lib/fonts.ts`). Never switch back to `next/font/google` (build then needs network).

## Commands
- `npm run dev` / `npm run build` / `npm start`
- `npx tsc --noEmit` must stay clean.
- Contact form needs `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (build-time inlined). Without it the form shows a friendly "not configured" error.

## Golden rules
1. **Factual accuracy.** All content lives in `data/index.ts`. Never invent projects, metrics, jobs, awards, or screenshots. There are no project screenshots; projects use generated `HeatField` art.
2. Preserve real links (GitHub, LinkedIn, Kaggle, Codeforces, CodeChef, resume PDF, certificate verify URLs).
3. Keep the Web3Forms payload in `components/sections/Contact.tsx` unchanged (`access_key, name, email, subject, message, botcheck:false`).
4. Phone number exists in `siteConfig` but is intentionally **not displayed**.

## Design system ("saliency map")
Concept: the site reads like a Grad-CAM/saliency heat map, matching the XAI work. Palette = **magma colormap**.
- Tokens are CSS vars in `app/globals.css` (RGB channels) mapped in `tailwind.config.ts`: `ink`, `ink-raised`, `line`, `bone`, `dim`, `signal` (apricot, interactive accent), `heat-1..5`.
- Dark purple heat stops are for non-text fields only (low contrast). Text uses bone/dim/signal.
- Type: **Bricolage Grotesque** (display, condensed via `stretch-condensed`) + **Source Serif 4** (body). Fluid scale tokens: `text-display|title|heading|lead|body|small`.
- Boldness is spent in ONE place: the hero name heat spot. Keep everything else quiet. Avoid: glass cards, glow shadows, icon tiles, pill clouds, mono ALL-CAPS eyebrows, `01/02` numbering on non-sequences, fade-up on every block.
- Section frame: `components/ui/Section.tsx` (sticky title column left, content right). Timeline only for education (a true sequence).

## Motion rules
Tokens in `lib/motion.ts` (ease out, durations, stagger). `Providers` sets `MotionConfig reducedMotion="user"`.
Used: hero intro + `SaliencyName`, `MaskReveal` (section titles only), `Rule` (hairlines), `ScrollProgress`, `Magnetic` (2 CTAs, fine pointers only), route fade in `app/template.tsx`, nav indicator `layoutId`, mobile menu clip-path.
Every effect must respect reduced motion and have a touch/keyboard equivalent. No custom cursor, no scroll hijacking.

## Architecture
- `app/page.tsx` composes sections; `app/projects/[id]` case studies (static params from data); `app/certifications`; `sitemap.ts`, `robots.ts`, `not-found.tsx`.
- `components/hero` (SaliencyName + Hero), `components/layout` (Navbar, Footer — rendered in root layout), `components/sections/*` (server components except Contact), `components/ui`, `components/motion`, `components/projects`.
- Nav links come from `navLinks` in data and use `/#id` so they work from sub-routes.
- Mostly server components; client JS only for motion, nav, hero, contact form.

## Gotchas learned
- **SaliencyName alignment:** the heat layer is an aria-hidden duplicate of the h1. The h1 must stay `flow-root`, otherwise the first line's negative margin collapses and the layers misalign by 0.08em. Both layers must keep identical classes/line boxes.
- `Skills` reads `skillGroups` (data). The older `skills` export is unused legacy.
- `app/api/contact/route.ts` (Resend) is deprecated/unused; safe to delete with the `resend` dep (not done yet).
- Certificate dates are formatted in UTC to avoid off-by-one-day.
- `background-clip:text` doesn't work reliably on transformed/overflow children — hence the overlay approach.

## Spider-Man interaction layer (branch `spider-man-interactions`)
A subtle Spider-Man-inspired layer on top of the saliency-map identity. The original brief assumed a cyan "JARVIS" look; the site is now the magma palette, so strands are **bone-white** and the one new accent is **`--spidey` (#E5384F, Tailwind `spidey`)**, used only for web anchors and spider-sense. Never use it for text or large fills.

1. **Web-slinging page transitions** — `components/spider/WebTransitionProvider.tsx` (wraps the app in `app/layout.tsx`).
   One delegated capture-phase click listener intercepts **only internal links that change the pathname**. Strand shoots click-point → top corner, web panel irises shut (clip-path circle), `router.push`, then irises open on pathname change (~0.45s cover + ~0.4s reveal). Same-page `#hash` jumps, external/new-tab/download/modified clicks are untouched.
   `useWebNavigate()` is the programmatic entry (used by Terminal Mode). `busy` ref blocks overlapping runs; a 2s failsafe always clears the overlay; reduced motion = plain `router.push`.
   **Back/forward and direct URL loads are intentionally NOT animated** (they commit before we can cover them; `app/template.tsx` fade handles them).
2. **Spider-sense feedback** — pure CSS in `globals.css` (`.sense`, `.sense-card`), zero extra DOM, no pointer loops. `.sense` (nav links, all `Button` variants, terminal toggle, web-shooter controls): pulse ring + radial lines on hover/`:focus-visible`/`:active`. `.sense-card` (project rows): top rule shifts to spidey, wash + lines from the thumbnail, clipped to the card. Touch uses `:active`; reduced motion removes the animation and leaves a static border change.
3. **Web-shooter** — `components/hero/WebShooter.tsx`, rendered in `Hero.tsx`. Lifecycle `idle → shooting → locked → expanded → idle`, guarded by `phaseRef`. Target = `webShooterProjectId` in `data/index.ts` (falls back to first featured project via `getWebShooterProject()` in `lib/projects.ts`). Expanded view is a native `<dialog>` (focus trap, Esc, backdrop click, close button) filled from real project data; the preview card is also a normal link, so the control is never required. Esc/resize cancel mid-flight; reduced motion skips straight to the dialog.
4. **Terminal Mode** — `components/terminal/` + `lib/terminal-commands.ts`. Toggle: header button or the `` ` `` key (ignored in inputs/textareas/selects/contenteditable and with Ctrl/Cmd/Alt). Non-modal docked panel, `role="log"` live region, labelled input, ↑/↓ history, Tab completion, suggestion chips, Esc/Exit, focus returns to the opener.
   **Safety:** the parser is a lookup table over `COMMANDS` (help, about, projects, skills, contact, resume, github, linkedin, clear, exit). Only the first word is used, args are ignored, nothing is evaluated or shelled out, and `open` actions only accept https/http or same-site `/paths`, opened with `noopener,noreferrer`. All output is read from `data/` (never duplicate content in the parser). Adding a command = add to `COMMANDS`, `DESCRIPTIONS`, and the `switch`.

### Spider-layer gotchas
- Framer-Motion completes a **no-op animation (1→1) instantly** — use a dedicated motion value for timer-like "holds" (this caused the web-shooter to skip its `locked` state until fixed).
- A modal `<dialog>` lives in the browser **top layer, above every z-index** — the transition overlay (z-80) would be hidden behind it, so close the dialog before navigating.
- Stretched-link rows (`after:absolute after:inset-0` on the title link) are why `.sense-card` uses `overflow: clip` and pseudo-elements on the `<article>`, not on the link.
- Tailwind `border-*` utilities lose to `:hover` rules by specificity, not order — `.sense-card:hover` works because pseudo-class specificity beats the utility.
- `window.open` for terminal commands must run inside the keydown/click handler (user gesture) or popup blockers eat it.
- `tsconfig.tsbuildinfo` is tracked in git although it is a build artifact; builds dirty it. Don't commit it (consider `git rm --cached` + `.gitignore`).

## Testing done / how to test
Playwright (Python, Chromium) against `next start`: overflow at 390/820/1440/2200, hero alignment, mobile menu (focus, Escape), keyboard tab order (skip link first), nav active state, project→case study, 404, reduced motion, contact error path. Successful form send is **unverified** (needs the key).

## Open items / ideas
- Open Graph image (`opengraph-image.tsx`) not made.
- No Lighthouse/perf profiling; only Chromium tested (not Safari/Firefox).
- Real project screenshots would replace `HeatField` art.
- Optional: remove deprecated API route + `resend`; add `.eslintrc` (none exists).

### Spider-layer testing (Playwright + Chromium against `next start`, plus `tsx` unit tests)
Transitions: overlay timing, route-only interception, same-page hash untouched, back/forward, double-click lock, direct load, reduced motion, keyboard Enter on mobile. Spider-sense: computed animation per state (idle/hover/focus/touch `:active` via CDP `forcePseudoState`/reduced motion). Web-shooter: sampled lifecycle timings (shooting→locked ~420ms→expanded ~890ms), double click, Esc mid-flight, Esc/backdrop/close, focus restore, keyboard, mobile, reduced motion. Terminal: all 10 commands, history, Tab, popups (URL + `opener===null`), form-field shortcut safety, cross-page navigation, mobile, reduced motion; 34 parser unit tests incl. injection attempts.
Not tested: Safari/Firefox, real screen readers (only ARIA structure asserted), real-device touch.
