# CLAUDE.md — Project memory: Mahmudul Haque Sakib portfolio

Personal portfolio for an AI/ML engineer. Live: https://mhsakib.vercel.app (Vercel, deployed via GitHub Actions in `.github/workflows`).
Positioning comes from `data/index.ts` (`siteConfig`): **AI/ML Engineer & Research Enthusiast**. Do not re-brand as "backend developer" without being asked.

> Before every coding task, read `CLAUDE.md` and inspect the relevant existing implementation. After completing each coding task, update `CLAUDE.md` with important, durable architectural decisions, component changes, dependencies, conventions, and unresolved issues. Preserve existing guidance, avoid redundant entries, and never record secrets.

(Repo file is lowercase `claude.md`; keep that name. Do not commit or push unless asked.)

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
- **Sanctioned exception — the tubelight navbar only:** it was explicitly requested with glass + glow, so it uses `bg-ink/90 backdrop-blur-xl` and a soft `signal` lamp halo. Do not spread glass/glow to other components.
- Section frame: `components/ui/Section.tsx` (sticky title column left, content right). Timeline only for education (a true sequence).

## Motion rules
Tokens in `lib/motion.ts` (ease out, durations, stagger). `Providers` sets `MotionConfig reducedMotion="user"`.
Used: hero intro + `SaliencyName`, `MaskReveal` (section titles only), `Rule` (hairlines), `ScrollProgress`, `Magnetic` (2 CTAs, fine pointers only), route fade in `app/template.tsx`, nav indicator `layoutId`, mobile menu clip-path.
Every effect must respect reduced motion and have a touch/keyboard equivalent. No custom cursor, no scroll hijacking.

## Architecture
- `app/page.tsx` composes sections; `app/projects/[id]` case studies (static params from data); `app/certifications`; `sitemap.ts`, `robots.ts`, `not-found.tsx`.
- `components/hero` (SaliencyName + Hero), `components/layout` (Navbar, Footer — rendered in root layout), `components/sections/*` (server components except Contact), `components/ui`, `components/motion`, `components/projects`.
- Section links come from `navLinks` in data (`/#id`, so they work from sub-routes) and are rendered **only** by the top tubelight navbar (see Navigation). The header holds brand + utilities, no section links.
- Mostly server components; client JS only for motion, nav, hero, contact form.

## Gotchas learned
- **SaliencyName alignment:** the heat layer is an aria-hidden duplicate of the h1. The h1 must stay `flow-root`, otherwise the first line's negative margin collapses and the layers misalign by 0.08em. Both layers must keep identical classes/line boxes.
- `Skills` reads `skillGroups` (data). The older `skills` export is unused legacy.
- `app/api/contact/route.ts` (Resend) is deprecated/unused; safe to delete with the `resend` dep (not done yet).
- Certificate dates are formatted in UTC to avoid off-by-one-day.
- `background-clip:text` doesn't work reliably on transformed/overflow children — hence the overlay approach.
- **Framer overwrites the inline `transform` of animated elements**, so never centre a `motion.*` element with a Tailwind `-translate-x-1/2` (the tubelight lamp uses `inset-x-0 mx-auto` instead).
- Tailwind emits `.relative` after `.sr-only`, so `relative sr-only` is *not* hidden by `position:absolute`. On flex items `z-10` works without `relative`.
- IntersectionObserver fires only when an element's intersection changes; an instant jump across nothing observed fires nothing — hence the debounced scroll safety net in `useActiveSection`.
- `next lint` has no ESLint config and prompts interactively (it would add deps) — lint has not been run on this project; `tsc` + `next build` are the checks.

## Navigation — tubelight navbar (TOP, md+) / hamburger menu (phones)
- **Component:** `components/ui/tubelight-navbar.tsx` (`TubelightNavbar`, generic: takes `items`; top-centre by default, consumer sets offsets via `className`). **Scroll-spy hook:** `lib/use-active-section.ts` (reusable). **Wiring:** `components/layout/Navbar.tsx` builds the items from `navLinks` (data) + an icon map and renders the pill.
- **Purpose / placement:** at **768px and up** the *only* section navigation is a floating glass pill at the **top** (adapted from the 21st.dev Tubelight Navbar; lamp bar + halo on the active item's top edge). The fixed header holds brand (left) and Terminal / GitHub / LinkedIn (right); no link row. Owner explicitly asked for TOP placement on desktop/tablet — do not move it to the bottom. **Phones (<768px, e.g. 390) deliberately do NOT show the tubelight** (owner request): they use the original 3-line hamburger that opens a full-screen dropdown of the same `navLinks` (+ GitHub/LinkedIn at the bottom).
- **Layout:** the pill is centred *in the same row* as the 72px header (its wrapper is `pointer-events-none`, so brand/utilities stay clickable). `<TubelightNavbar className="hidden md:top-0 md:flex md:h-[4.5rem] md:items-center">` is `display:none` below `md`, so on phones it is neither visible, focusable nor announced (its hook still mounts there — one cheap IntersectionObserver). The phone menu lives in `Navbar.tsx` (`id="mobile-menu"`, clip-path reveal, staggered links): focuses its first link, locks body scroll, closes on Escape (focus returns to the toggle), on link click, on route change, and when the viewport grows to `md+` (matchMedia). Header is `z-50`, menu `z-40` so the toggle stays visible. Terminal toggle stays in the phone header; GitHub/LinkedIn show in the header only from `md`. `html { scroll-padding-top: 5.5rem }` applies everywhere (single-row header).
- **Labels:** icon-only until **1320px** (label is `sr-only`, so every item keeps an accessible name), icons + labels from 1320px. The labelled pill is ~919px wide; below ~1295px it collides with the brand/utility icons (measured, 1280px failed). Item padding: `px-2` (<md), `md:px-3` (768–1023, else 768px had a 7px gap to the utilities), `lg:px-3.5`, `min-[1320px]:px-3`. Targets: height 44px always; width 35px (320px) → 42px (390px) → 42–46px (tablet/desktop icon-only) → ~86px+ (labelled); WCAG 2.2 AA minimum is 24px.
- **Anchors (all on `/`):** `#about #skills #projects #research #experience #education #certifications #contact`, in page order (order matters for scroll-spy). Not in the nav: `#inspiration`, `#achievements`, `#looking-for` (they belong to the previous item). Adding an item = add to `navLinks`, add an icon in `sectionIcons`, keep page order; re-check the 1320px label breakpoint if the pill gets wider.
- **Active state:** on `/` it is scroll-spy: an IntersectionObserver on a thin band at 35% viewport height is only a *trigger*; the answer is resolved from fresh geometry ("last section whose top is at/above the line"), so it is history-independent (correct after refresh, `/#hash` load, back/forward, jumps). A debounced (120ms) `scroll` resolve is a safety net for jumps that cross no observed section. Hero => nothing active. Other routes: `/certifications` => Certifications, `/projects/*` => Projects (`routeOwners` in `Navbar.tsx`). Clicking pins the lamp for 1.4s (`lock`) so it travels straight to its target during smooth scroll. `aria-current` = `location` (home) / `page` (routes).
- **Animation:** shared-layout `layoutId` (`tubelight-bg`, `tubelight-lamp`), spring `{stiffness:300, damping:30}`; global `MotionConfig reducedMotion="user"` makes the lamp jump instead of glide.
- **Interactions with other features:** Terminal Mode is docked at the *bottom*, so it never overlaps the top pill. Cross-route clicks go through the web-slinging transition; same-page ones use native hash scroll. Footer is unchanged (no bottom padding needed).
- **Tokens / deps:** site tokens only (`ink`, `line`, `dim`, `bone`, `signal`); the lamp is apricot `signal`, not the snapshot's cyan, to stay in the magma palette (one place to change: `tubelight-navbar.tsx`). No new dependencies (`framer-motion`, `lucide-react`, `cn`).
- **Limitations / follow-ups:** the tubelight's own `<md` styles (`w-full max-w-md`, `flex-1` items) are unused by `Navbar.tsx` but kept so the component stays generic. The phone menu does not highlight the current section (as the original). Not tested in Safari/Firefox, with a real screen reader, or on real touch devices.

## Spider-Man interaction layer (branch `spider-man-interactions`)
> **Status on `portfolio-redesign`:** only #1 (page transitions) and #4 (Terminal Mode) are merged. #2 spider-sense (`.sense` / `.sense-card` CSS) and #3 web-shooter exist only on branch `spider-man-interactions`; `.sense` on `TerminalToggle` is a harmless no-op here. The `--spidey` CSS variable was missing on this branch (only the Tailwind colour had been merged) and was added to `globals.css`, because `WebTransitionProvider` reads `rgb(var(--spidey))` for its anchor ring.

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
Playwright (Python, Chromium) against `next start`: overflow at 390/820/1440/2200, hero alignment, keyboard tab order (skip link first), nav active state, project→case study, 404, reduced motion, contact error path. Successful form send is **unverified** (needs the key).

## Open items / ideas
- Tubelight/menu: optionally highlight the current section in the phone menu (reuse `useActiveSection`), and add an ESLint config so `npm run lint` can run.
- Open Graph image (`opengraph-image.tsx`) not made.
- No Lighthouse/perf profiling; only Chromium tested (not Safari/Firefox).
- Real project screenshots would replace `HeatField` art.
- Optional: remove deprecated API route + `resend`; add `.eslintrc` (none exists).

### Spider-layer testing (Playwright + Chromium against `next start`, plus `tsx` unit tests)
Transitions: overlay timing, route-only interception, same-page hash untouched, back/forward, double-click lock, direct load, reduced motion, keyboard Enter on mobile. Spider-sense: computed animation per state (idle/hover/focus/touch `:active` via CDP `forcePseudoState`/reduced motion). Web-shooter: sampled lifecycle timings (shooting→locked ~420ms→expanded ~890ms), double click, Esc mid-flight, Esc/backdrop/close, focus restore, keyboard, mobile, reduced motion. Terminal: all 10 commands, history, Tab, popups (URL + `opener===null`), form-field shortcut safety, cross-page navigation, mobile, reduced motion; 34 parser unit tests incl. injection attempts.
Not tested: Safari/Firefox, real screen readers (only ARIA structure asserted), real-device touch.

### Tubelight navbar testing (Playwright + Chromium against `next start`)
Geometry for 768–1920px: no overflow, pill never hits brand/utilities, label switch at exactly 1320px, 44px-tall targets. Viewport matrix 320–1440: dock hidden <768 and visible >=768, hamburger the inverse, header 72px, no overflow. Phone menu: open/close, Escape + focus return, scroll lock, every item lands its section below the header, cross-route via the web transition, resize past 768 closes it, hidden dock never receives Tab focus. Scroll-spy for all 8 sections, non-nav sections (from different starting points and fresh `/#hash` loads), hero clears, resize, click-pin, refresh, back/forward, `/certifications` + `/projects/*`, 404 none, cross-route click via the web transition, terminal `projects`. Clicking each item lands the section below the chrome and hero clears it on phone/tablet/desktop. Tab order (skip, brand, utilities, dock), focus ring, Enter, Terminal vs top pill, reduced motion. Not tested: Safari/Firefox, real screen readers, real-device touch.
