import Section from '@/components/ui/Section'

const strengths = [
  {
    term: 'AI/ML research',
    desc: 'Working on medical AI, multilingual NLP, and explainable deep learning for practical, research-driven systems.',
  },
  {
    term: 'Systems builder',
    desc: 'Designing end-to-end ML applications, from experimentation and APIs to deployment-ready products.',
  },
  {
    term: 'Problem solver',
    desc: 'Built strong analytical thinking through 700+ problem-solving challenges across competitive platforms.',
  },
  {
    term: 'Teaching assistant',
    desc: 'Supported programming labs and helped students build stronger foundations in problem solving and coding.',
  },
]

const working = [
  'Computer Vision',
  'NLP',
  'RAG systems',
  'ML pipelines',
  'Docker',
  'CI/CD',
  'AWS deployment',
  'Explainable AI',
]

export default function About() {
  return (
    <Section
      id="about"
      title="Engineering profile"
      intro="My work spans research-driven AI, end-to-end ML pipelines, and systems designed to move beyond prototypes."
    >
      <div className="max-w-[62ch] space-y-6">
        <p className="font-body text-lead text-bone">
          I&apos;m Mahmudul Haque Sakib, a Data Science-focused CSE graduate who builds AI
          systems that are technically solid, practical to use, and designed with real-world
          constraints in mind.
        </p>
        <p className="text-dim">
          My work spans Computer Vision, Natural Language Processing, and RAG-based systems. I
          have worked on projects involving medical image analysis, medicinal plant
          classification, sentiment analysis, and document-aware question answering.
        </p>
        <p className="text-dim">
          I enjoy building complete ML pipelines, from data preparation and model training to
          evaluation, Docker-based packaging, CI/CD workflows, and AWS deployment. I care about
          reliability, explainability, and systems that are ready to move beyond prototypes.
        </p>
      </div>

      <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {strengths.map((s) => (
          <div key={s.term} className="border-t border-line pt-5">
            <dt className="font-display text-heading font-semibold stretch-condensed text-bone">
              {s.term}
            </dt>
            <dd className="mt-2 text-dim">{s.desc}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 max-w-[62ch] text-small text-dim">
        <span className="text-bone">Day to day:</span> {working.join(', ')}.
      </p>
    </Section>
  )
}
