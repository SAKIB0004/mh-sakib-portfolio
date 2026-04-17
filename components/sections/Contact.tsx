'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  FileText,
  MessageSquare,
  Download,
  Github,
  Linkedin,
  Trophy,
  Code2,
  MapPin,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import { siteConfig } from '@/data'

type SocialLink = {
  name: string
  href: string
  icon: React.ReactNode
  value: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: siteConfig.github,
    icon: <Github className="h-6 w-6" />,
    value: '@SAKIB0004',
  },
  {
    name: 'LinkedIn',
    href: siteConfig.linkedin,
    icon: <Linkedin className="h-6 w-6" />,
    value: 'mhsakib0004',
  },
  {
    name: 'Gmail',
    href: `mailto:${siteConfig.email}`,
    icon: <Mail className="h-6 w-6" />,
    value: siteConfig.email,
  },
  {
    name: 'Codeforces',
    href: siteConfig.codeforces,
    icon: <Trophy className="h-6 w-6" />,
    value: 'Pupil · 1255',
  },
  {
    name: 'CodeChef',
    href: siteConfig.codechef,
    icon: <Code2 className="h-6 w-6" />,
    value: '2★ · 1535',
  },
  {
    name: 'Kaggle',
    href: siteConfig.kaggle,
    icon: (
      <span className="text-[1.35rem] font-bold leading-none tracking-tight text-cyan-300">
        K
      </span>
    ),
    value: 'mhsakib4',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState<string>('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (state === 'error') {
      setState('idle')
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name.trim()) {
      setError('Please enter your name')
      setState('error')
      return
    }

    if (!formData.email.trim()) {
      setError('Please enter your email')
      setState('error')
      return
    }

    if (!formData.message.trim()) {
      setError('Please enter your message')
      setState('error')
      return
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setError('Contact form is not configured. Please contact the site owner.')
      setState('error')
      return
    }

    setState('loading')
    setError('')

    try {
      const subject =
        formData.subject.trim() || `Portfolio inquiry from ${formData.name.trim()}`

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: subject,
          message: formData.message.trim(),
          botcheck: false,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to send message')
        setState('error')
        return
      }

      setState('success')
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      // Auto-reset to idle state after 5 seconds
      setTimeout(() => {
        setState('idle')
      }, 5000)
    } catch (err) {
      setError('An error occurred. Please try again.')
      setState('error')
    }
  }

  return (
    <Section
      id="contact"
      label="#10 — Contact"
      title="Let’s Build Together"
      subtitle="Whether it’s a team, a project, or a research problem, I’m open to meaningful technical collaboration."
    >
      <div ref={ref} className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,rgba(6,10,24,0.96)_0%,rgba(4,8,18,0.98)_100%)] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_28px_90px_rgba(0,0,0,0.4)] sm:p-5 lg:p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_26%)]" />

          <div className="relative grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.025)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.06),transparent_32%)]" />

              <div className="relative">

                <h3 className="text-2xl font-semibold text-white sm:text-[1.9rem]">
                  Let&apos;s build something meaningful.
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-[0.98rem] sm:leading-8">
                  Reach out for AI/ML roles, collaborations, research, or project discussions.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Success Message */}
                  {state === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3"
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-300">
                          Message sent successfully!
                        </p>
                        <p className="text-xs text-green-200 mt-0.5">
                          I&apos;ll get back to you as soon as possible.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {state === 'error' && error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                      <p className="text-sm font-medium text-red-300">{error}</p>
                    </motion.div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      id="contact-name"
                      icon={<User className="h-5 w-5" />}
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={state === 'loading'}
                    />
                    <InputField
                      id="contact-email"
                      icon={<Mail className="h-5 w-5" />}
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={state === 'loading'}
                    />
                  </div>

                  <InputField
                    id="contact-subject"
                    icon={<FileText className="h-5 w-5" />}
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required={false}
                    disabled={state === 'loading'}
                  />

                  <TextAreaField
                    id="contact-message"
                    icon={<MessageSquare className="h-5 w-5" />}
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={state === 'loading'}
                  />

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-slate-400">
                      <MapPin className="h-4 w-4 text-cyan-300" />
                      <span className="font-mono text-xs">{siteConfig.location}</span>
                    </div>

                    <motion.button
                      whileHover={state === 'loading' ? {} : { y: -2, scale: 1.01 }}
                      whileTap={state === 'loading' ? {} : { scale: 0.99 }}
                      type="submit"
                      disabled={state === 'loading'}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-violet-300/20 bg-[linear-gradient(135deg,rgba(59,130,246,0.92)_0%,rgba(99,102,241,0.92)_48%,rgba(168,85,247,0.9)_100%)] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(99,102,241,0.24)] transition-all duration-300 hover:shadow-[0_18px_52px_rgba(99,102,241,0.34)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      <Send className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      {state === 'loading' ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.025)_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_30%)]" />

              <div className="relative flex h-full flex-col">
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Contact Channels
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white sm:text-[1.9rem]">
                    Let&apos;s connect professionally.
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.42, delay: 0.18 + index * 0.05 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="group flex min-h-[132px] flex-col items-center justify-center rounded-[22px] bg-[linear-gradient(180deg,rgba(8,16,40,0.78)_0%,rgba(9,17,34,0.92)_100%)] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-violet-400/28 hover:shadow-[0_12px_34px_rgba(99,102,241,0.16)]"
                    >
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.035] text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.08)] transition-all duration-300 group-hover:text-cyan-300">
                        {item.icon}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-medium text-white">
                          {item.name}
                        </span>
                      </div>

                      <span className="mt-1.5 max-w-full truncate text-xs text-slate-400">
                        {item.value}
                      </span>
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.42 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={siteConfig.resumeUrl}
                  download
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(59,130,246,0.8)_0%,rgba(79,70,229,0.82)_45%,rgba(168,85,247,0.82)_100%)] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.22)] transition-all duration-300 hover:shadow-[0_18px_48px_rgba(99,102,241,0.32)]"
                >
                  <Download className="h-5 w-5" />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

type InputFieldProps = {
  id: string
  icon: React.ReactNode
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  required?: boolean
  disabled?: boolean
}

function InputField({
  id,
  icon,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = true,
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-cyan-300">
        {icon}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="h-14 w-full rounded-2xl bg-[#0a1028]/90 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-300/40 focus:shadow-[0_0_0_1px_rgba(103,232,249,0.18),0_0_28px_rgba(34,211,238,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  )
}

type TextAreaFieldProps = {
  id: string
  icon: React.ReactNode
  name: string
  placeholder: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  disabled?: boolean
}

function TextAreaField({
  id,
  icon,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
}: TextAreaFieldProps) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="pointer-events-none absolute left-4 top-4 text-slate-400 transition-colors duration-300 group-focus-within:text-cyan-300">
        {icon}
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        required
        disabled={disabled}
        className="w-full rounded-2xl bg-[#0a1028]/90 pl-12 pr-4 pt-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-300/40 focus:shadow-[0_0_0_1px_rgba(103,232,249,0.18),0_0_28px_rgba(34,211,238,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  )
}