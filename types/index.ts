export interface Project {
  id: string
  title: string
  description: string
  problem: string
  features: string[]
  tech: string[]
  contribution: string
  github: string
  demo?: string
  hfSpace?: string
  category: 'ml' | 'nlp' | 'cv' | 'fullstack' | 'research'
  featured: boolean
  status?: string
}

export interface Experience {
  id: string
  role: string
  organization: string
  duration: string
  location: string
  type: string
  responsibilities: string[]
}

export interface Education {
  id: string
  degree: string
  major: string
  institution: string
  duration: string
  location: string
  gpa?: string
}

export interface Achievement {
  id: string
  title: string
  organization?: string
  year: string
  description: string
  type: 'award' | 'scholarship' | 'competition' | 'academic'
  link?: string
}

export interface Certification {
  id: string
  title: string
  organization?: string
  issuer?: string
  issueDate: string
  description: string
  image: string
  verifyUrl?: string
  credentialId?: string
  skills: string[]
  featured?: boolean
}

export interface Publication {
  id: string
  title: string
  status: string
  venue?: string
  date?: string
  abstract: string
  authors: string[]
  doi?: string
  link?: string
  tech: string[]
}

export interface Skill {
  category: string
  icon: string
  items: { name: string; level?: number }[]
}

export interface InspirationItem {
  id: string
  title: string
  poster: string
}