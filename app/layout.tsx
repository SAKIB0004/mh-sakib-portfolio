import type { Metadata, Viewport } from 'next'
import './globals.css'
import { display, body } from '@/lib/fonts'
import { siteConfig } from '@/data'
import Providers from '@/components/motion/Providers'
import ScrollProgress from '@/components/motion/ScrollProgress'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const description =
  'Computer Science graduate specializing in Machine Learning, NLP, and Computer Vision. Building end-to-end AI systems from research to production.'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — AI/ML Engineer`,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  keywords: ['AI', 'Machine Learning', 'NLP', 'Computer Vision', 'Deep Learning', 'RAG', 'LangChain', 'LangGraph', 'PyTorch', 'FastAPI', 'Bangladesh', 'Software Engineer'],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
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

export const viewport: Viewport = {
  themeColor: '#0B0818',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: 'AI/ML Engineer',
  alumniOf: 'East West University',
  address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.kaggle],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
