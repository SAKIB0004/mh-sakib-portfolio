'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { siteConfig } from '@/data'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle accent orbs - minimal, premium look */}
      <div
        className="hero-orb w-[800px] h-[800px] -top-40 -left-48 opacity-10"
        style={{ background: 'radial-gradient(circle, #0066FF 0%, transparent 70%)' }}
      />
      <div
        className="hero-orb w-[600px] h-[600px] -bottom-48 -right-40 opacity-6"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
      />

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(8,12,20,0.3) 0%, rgba(8,12,20,0.6) 100%)',
        }}
      />

      {/* Premium accent line */}
      <div
        className="absolute w-full h-px opacity-15 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
          animation: 'scan 8s linear infinite',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 font-mono text-xs text-text-secondary tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 relative">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </span>
            Available for AI/ML roles & research collaborations
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight mb-4"
        >
          <span className="text-text-primary">Mahmudul Haque</span>
          <br />
          <span className="text-gradient-cyan">Sakib</span>
        </motion.h1>

        {/* Title */}
        <motion.div variants={itemVariants} className="flex justify-center items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-cyan/60" />
          <span className="font-mono text-sm text-accent-cyan tracking-widest uppercase">
            Building Intelligent Systems
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-cyan/60" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8"
        >
          A portfolio of{' '}
          <span className="text-text-primary">AI/ML engineering</span>,{' '}
          <span className="text-text-primary">research-driven experimentation</span>, and{' '}
          <span className="text-text-primary">production-minded system design</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <a
            href="#projects"
            className="group px-7 py-3.5 bg-accent-cyan text-bg-primary font-display font-semibold text-sm rounded-xl hover:bg-white transition-all duration-200 shadow-glow-sm hover:shadow-glow-md"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 border border-border-medium text-text-primary font-display font-semibold text-sm rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-all duration-200"
          >
            Get in Touch
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-cyan/20 to-accent-cyan/10 border border-accent-cyan/40 text-accent-cyan rounded-xl font-display font-semibold text-sm tracking-wide hover:from-accent-cyan/30 hover:to-accent-cyan/20 hover:border-accent-cyan/60 transition-all duration-300 shadow-lg shadow-accent-cyan/10 hover:shadow-accent-cyan/20"
          >
            <Download size={18} />
            Resume
          </a>
        </motion.div>


        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 mt-6 max-w-sm mx-auto"
        >
          {[
            { value: '700+', label: 'Problems Solved' },
            { value: '3', label: 'Research Works' },
            { value: '3.68', label: 'CGPA' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-bold text-2xl text-gradient-cyan">{value}</div>
              <div className="font-mono text-xs text-text-muted tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>


    </section>
  )
}
