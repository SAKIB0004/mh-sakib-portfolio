import localFont from 'next/font/local'

/**
 * Self-hosted variable fonts (via @fontsource-variable) so the build never
 * depends on fonts.googleapis.com and text renders with zero layout shift.
 */
export const display = localFont({
  src: '../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2',
  variable: '--font-display',
  weight: '200 800',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const body = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-body',
  weight: '200 900',
  display: 'swap',
  fallback: ['ui-serif', 'Georgia', 'serif'],
})
