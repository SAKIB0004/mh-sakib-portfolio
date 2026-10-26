import type { Config } from 'tailwindcss'

/**
 * Design tokens live as CSS variables in app/globals.css (RGB channels so
 * Tailwind opacity modifiers work). The palette is the "magma" colormap used
 * for saliency / Grad-CAM heat maps — a nod to the explainable-AI work.
 */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: { DEFAULT: channel('ink'), raised: channel('ink-raised') },
        line: channel('line'),
        bone: channel('bone'),
        dim: channel('dim'),
        signal: channel('signal'),
        heat: {
          1: channel('heat-1'),
          2: channel('heat-2'),
          3: channel('heat-3'),
          4: channel('heat-4'),
          5: channel('heat-5'),
        },
      },
      fontSize: {
        // Fluid type scale (clamp: mobile → wide desktop)
        display: ['clamp(3.4rem, 12.5vw, 12rem)', { lineHeight: '0.88', letterSpacing: '-0.035em' }],
        title: ['clamp(2.25rem, 5.2vw, 4.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        heading: ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        lead: ['clamp(1.2rem, 1.9vw, 1.6rem)', { lineHeight: '1.4' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
      },
      spacing: {
        section: 'clamp(5rem, 11vw, 9rem)',
      },
      maxWidth: { page: '88rem' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
export default config
