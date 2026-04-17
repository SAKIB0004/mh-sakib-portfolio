'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Code2, TrendingUp } from 'lucide-react'
import Section from '@/components/ui/Section'

const interests = [
  {
    icon: Brain,
    title: 'AI/ML Engineering',
    desc: 'Roles focused on building, training, and deploying machine learning models — especially in NLP, computer vision, and generative AI. Comfortable working across the full ML lifecycle from data to production.',
    tags: ['LLMs', 'Computer Vision', 'NLP', 'MLOps', 'RAG'],
  },
  {
    icon: Code2,
    title: 'Research-Oriented Roles',
    desc: 'Positions at the intersection of research and engineering — contributing to AI publications, building experimental systems, and solving open problems in medical AI, multilingual NLP, or explainable AI.',
    tags: ['XAI', 'Medical AI', 'Multilingual NLP', 'Benchmarking'],
  },
  {
    icon: TrendingUp,
    title: 'Data Science & Analytics',
    desc: 'Data-heavy roles where I can apply statistical modeling, feature engineering, and visualization to extract insight from complex datasets. Interested in combining domain knowledge with modern ML pipelines.',
    tags: ['Data Analysis', 'Feature Engineering', 'Power BI', 'Predictive Modeling'],
  },
]

export default function LookingFor() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="looking-for"
      label="#9 — Opportunities"
      title="The Roles I’m Ready For"
      subtitle="The kinds of opportunities that align with my skills, research interests, and long-term goals."
    >
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {interests.map(({ icon: Icon, title, desc, tags }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="rounded-2xl border-glow bg-bg-card p-6 group hover:border-accent-cyan/25 transition-all duration-300 flex flex-col"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-5 group-hover:bg-accent-cyan/20 transition-colors">
              <Icon size={22} className="text-accent-cyan" />
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-lg text-text-primary mb-3">{title}</h3>

            {/* Description */}
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-5 flex-1">{desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Open to note */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.45 }}
        className="mt-8 p-5 rounded-2xl border border-dashed border-accent-cyan/20 bg-accent-cyan/5 text-center"
      >
        <p className="font-mono text-sm text-text-secondary">
          Open to <span className="text-accent-cyan">full-time roles</span>,{' '}
          <span className="text-accent-cyan">internships</span>, and{' '}
          <span className="text-accent-cyan">research collaborations</span> — locally in Dhaka or remotely worldwide.
        </p>
      </motion.div>
    </Section>
  )
}
