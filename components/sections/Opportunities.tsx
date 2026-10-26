import Section from '@/components/ui/Section'

const roles = [
  {
    title: 'AI/ML engineering',
    desc: 'Roles focused on building, training, and deploying machine learning models — especially in NLP, computer vision, and generative AI. Comfortable working across the full ML lifecycle from data to production.',
    tags: ['LLMs', 'Computer Vision', 'NLP', 'MLOps', 'RAG'],
  },
  {
    title: 'Research-oriented roles',
    desc: 'Positions at the intersection of research and engineering — contributing to AI publications, building experimental systems, and solving open problems in medical AI, multilingual NLP, or explainable AI.',
    tags: ['XAI', 'Medical AI', 'Multilingual NLP', 'Benchmarking'],
  },
  {
    title: 'Data science & analytics',
    desc: 'Data-heavy roles where I can apply statistical modeling, feature engineering, and visualization to extract insight from complex datasets. Interested in combining domain knowledge with modern ML pipelines.',
    tags: ['Data Analysis', 'Feature Engineering', 'Power BI', 'Predictive Modeling'],
  },
]

export default function Opportunities() {
  return (
    <Section
      id="looking-for"
      title="The roles I’m ready for"
      intro="The kinds of opportunities that align with my skills, research interests, and long-term goals."
    >
      <ul className="divide-y divide-line border-y border-line">
        {roles.map((r) => (
          <li key={r.title} className="py-8">
            <h3 className="font-display text-heading font-semibold stretch-condensed text-bone">
              {r.title}
            </h3>
            <p className="mt-3 max-w-[62ch] text-dim">{r.desc}</p>
            <p className="mt-3 text-small text-bone">{r.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-[62ch] font-body text-lead text-bone">
        Open to full-time roles, internships, and research collaborations — locally in Dhaka or
        remotely worldwide.
      </p>
    </Section>
  )
}
