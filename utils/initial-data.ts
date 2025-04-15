import type { ResumeData } from "@/types/resume"

export const initialResumeData: ResumeData = {
  personalDetails: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [
    {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    },
  ],
  education: [
    {
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    },
  ],
  skills: [],
  projects: [],
  certifications: [],
  activities: [],
}

