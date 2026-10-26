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

## Testing done / how to test
Playwright (Python, Chromium) against `next start`: overflow at 390/820/1440/2200, hero alignment, mobile menu (focus, Escape), keyboard tab order (skip link first), nav active state, project→case study, 404, reduced motion, contact error path. Successful form send is **unverified** (needs the key).

## Open items / ideas
- Open Graph image (`opengraph-image.tsx`) not made.
- No Lighthouse/perf profiling; only Chromium tested (not Safari/Firefox).
- Real project screenshots would replace `HeatField` art.
- Optional: remove deprecated API route + `resend`; add `.eslintrc` (none exists).