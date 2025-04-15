export type Template = "clean-minimalist" | "modern-tech" | "academic-focus"

export interface ColorScheme {
  primary: string
  secondary: string
  text: string
  background: string
  accent: string
}

export interface PersonalDetails {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
}

export interface Experience {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa: string
  description: string
}

export type SkillCategory = "language" | "framework" | "tool" | "database" | "cloud" | "soft" | "other"

export interface Skill {
  name: string
  category: SkillCategory
}

export interface Project {
  title: string
  description: string
  technologies: string
  link: string
  startDate: string
  endDate: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  expiry: string
  credentialId: string
  url: string
}

export interface Activity {
  title: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeData {
  personalDetails: PersonalDetails
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  activities: Activity[]
}

