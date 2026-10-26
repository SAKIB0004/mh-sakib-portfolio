'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CheckCircle, Download, Send } from 'lucide-react'
import Section from '@/components/ui/Section'
import Magnetic from '@/components/motion/Magnetic'
import { buttonClasses } from '@/components/ui/Button'
import { siteConfig } from '@/data'

const links = [
  { name: 'Email', href: `mailto:${siteConfig.email}`, value: siteConfig.email },
  { name: 'GitHub', href: siteConfig.github, value: '@SAKIB0004' },
  { name: 'LinkedIn', href: siteConfig.linkedin, value: 'mhsakib0004' },
  { name: 'Kaggle', href: siteConfig.kaggle, value: 'mhsakib4' },
  { name: 'Codeforces', href: siteConfig.codeforces, value: 'Pupil, 1255' },
  { name: 'CodeChef', href: siteConfig.codechef, value: '2★, 1535' },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

const field =
  'w-full rounded-[4px] border border-line bg-ink-raised px-4 py-3.5 font-body text-bone placeholder:text-dim/60 transition-colors hover:border-dim/50 focus:border-signal focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const resetTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (state === 'error') {
      setState('idle')
      setError('')
    }
  }

  const fail = (message: string) => {
    setError(message)
    setState('error')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name.trim()) return fail('Please enter your name.')
    if (!formData.email.trim()) return fail('Please enter your email.')
    if (!formData.message.trim()) return fail('Please enter your message.')

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      return fail('Contact form is not configured. Please email me directly instead.')
    }

    setState('loading')
    setError('')

    try {
      const subject = formData.subject.trim() || `Portfolio inquiry from ${formData.name.trim()}`
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject,
          message: formData.message.trim(),
          botcheck: false,
        }),
      })
      const data = await response.json()

      if (!response.ok) return fail(data.message || 'Failed to send message.')

      setState('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      resetTimer.current = setTimeout(() => setState('idle'), 5000)
    } catch {
      fail('Something went wrong sending your message. Please try again.')
    }
  }

  const loading = state === 'loading'

  return (
    <Section
      id="contact"
      title="Let’s build together"
      intro="Whether it’s a team, a project, or a research problem, I’m open to meaningful technical collaboration."
    >
      <a
        href={`mailto:${siteConfig.email}`}
        className="inline-block break-all font-display text-heading font-semibold stretch-condensed text-bone underline decoration-line decoration-2 underline-offset-[0.3em] transition-colors hover:text-signal hover:decoration-signal sm:break-normal"
      >
        {siteConfig.email}
      </a>
      <p className="mt-2 text-small text-dim">{siteConfig.location}</p>

      <div className="mt-14 grid gap-14 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <form onSubmit={handleSubmit} className="space-y-5" aria-describedby="form-status">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-small text-bone">
                Name <span className="text-dim">(required)</span>
              </label>
              <input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} disabled={loading} className={field} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-small text-bone">
                Email <span className="text-dim">(required)</span>
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} disabled={loading} className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-2 block text-small text-bone">
              Subject <span className="text-dim">(optional)</span>
            </label>
            <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} disabled={loading} className={field} />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-small text-bone">
              Message <span className="text-dim">(required)</span>
            </label>
            <textarea id="message" name="message" rows={6} required value={formData.message} onChange={handleChange} disabled={loading} className={`${field} resize-y`} />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Magnetic>
              <button type="submit" disabled={loading} className={`${buttonClasses('primary')} disabled:cursor-not-allowed disabled:opacity-70`}>
                {loading ? 'Sending…' : 'Send message'}
                <Send size={16} aria-hidden />
              </button>
            </Magnetic>

            <div id="form-status" className="min-h-[1.5rem] text-small">
              {state === 'success' && (
                <p role="status" className="flex items-center gap-2 text-bone">
                  <CheckCircle size={18} aria-hidden className="text-signal" />
                  Message sent. Thank you — I’ll reply soon.
                </p>
              )}
              {state === 'error' && (
                <p role="alert" className="text-heat-3">
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>

        <div>
          <h3 className="font-display text-small font-semibold text-bone">Find me elsewhere</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {links.map((l) => {
              const mail = l.href.startsWith('mailto:')
              return (
                <li key={l.name}>
                  <a
                    href={l.href}
                    {...(mail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex min-h-[56px] items-center justify-between gap-4 py-3 transition-colors hover:text-signal"
                  >
                    <span className="font-display font-medium text-bone group-hover:text-signal">
                      {l.name}
                      {!mail && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
                    <span className="flex min-w-0 items-center gap-2 text-small text-dim">
                      <span className="truncate">{l.value}</span>
                      <ArrowUpRight size={16} aria-hidden className="shrink-0" />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <a href={siteConfig.resumeUrl} download className={`${buttonClasses('secondary')} mt-8`}>
            <Download size={16} aria-hidden />
            Download resume
          </a>
        </div>
      </div>
    </Section>
  )
}
