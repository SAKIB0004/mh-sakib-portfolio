'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '@/components/ui/Section'

const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Applied AI & LLMs',
    items: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'Hugging Face Transformers',
      'LangChain',
      'LangGraph',
      'Groq',
      'YOLOv10',
    ],
  },
  {
    category: 'Vector DB / RAG',
    items: ['Pinecone','ChromaDB', 'FAISS', 'RAG', 'LLM Fine-tuning'],
  },
  {
    category: 'DevOps & Deployment',
    items: ['FastAPI', 'Git', 'Docker', 'GitHub Actions', 'AWS ECR', 'Vercel', 'Streamlit', 'Flask', 'Gradio'],
  },
] as const

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Section
      id="skills"
      label="#2 — Tech Stack"
      title="Stack & Strengths"
      subtitle="The technical foundation behind my workflows in machine learning, retrieval systems, and product-oriented engineering."
    >
      <div ref={ref} className="relative">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.04),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_74%_72%,rgba(255,255,255,0.035),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05),transparent_30%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:25%_100%,100%_25%]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03),transparent_18%),radial-gradient(circle_at_72%_66%,rgba(255,255,255,0.03),transparent_18%)] blur-3xl" />
        </div>

        <div className="relative">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.07 }}
              className="grid gap-5 border-b border-white/7 py-5 last:border-b-0 md:gap-6 md:py-6 lg:grid-cols-[290px_minmax(0,1fr)]"
            >
              {/* Left column */}
              <div className="flex flex-col justify-start">
                <span className="font-mono text-[11px] tracking-[0.32em] text-text-secondary/45">
                  {String(gi + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-3 max-w-[15ch] font-mono text-[1.55rem] leading-tight text-text-primary md:text-[1.75rem]">
                  {group.category}
                </h3>

                <div className="mt-5 h-px w-11 bg-white/20" />
              </div>

              {/* Right column */}
              <div className="flex flex-wrap items-start gap-2.5 lg:pt-0.5">
                {group.items.map((name, index) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.32,
                      delay: gi * 0.07 + index * 0.025 + 0.12,
                    }}
                    className="cursor-default rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 font-mono text-[13px] text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/28 hover:bg-white/[0.055] hover:text-text-primary md:text-sm"
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}