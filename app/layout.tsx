import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/data'

// Premium display font - modern, geometric, technical
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

// Professional body font - highly optimized for web
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Technical mono font - for labels, code, metadata
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${siteConfig.name} — AI/ML Engineer`,
  description: 'Computer Science graduate specializing in Machine Learning, NLP, and Computer Vision. Building end-to-end AI systems from research to production.',
  keywords: ['AI', 'Machine Learning', 'NLP', 'Computer Vision', 'Deep Learning', 'RAG', 'LangChain', 'PyTorch', 'Bangladesh', 'Software Engineer'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mhsakib.vercel.app',
    title: `${siteConfig.name} — AI/ML Engineer`,
    description: 'Building intelligent systems from CNNs to production-ready RAG pipelines.',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — AI/ML Engineer`,
    description: 'Building intelligent systems from CNNs to production-ready RAG pipelines.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
