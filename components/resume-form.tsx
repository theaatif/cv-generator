"use client"

import { useState } from "react"
import { PersonalDetailsForm } from "@/components/form-sections/personal-details"
import { SummaryForm } from "@/components/form-sections/summary"
import { ExperienceForm } from "@/components/form-sections/experience"
import { EducationForm } from "@/components/form-sections/education"
import { SkillsForm } from "@/components/form-sections/skills"
import { ProjectsForm } from "@/components/form-sections/projects"
import { CertificationsForm } from "@/components/form-sections/certifications"
import { ActivitiesForm } from "@/components/form-sections/activities"
import type { ResumeData } from "@/types/resume"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ResumeFormProps {
  resumeData: ResumeData
  updateResumeData: (data: Partial<ResumeData>) => void
}

export function ResumeForm({ resumeData, updateResumeData }: ResumeFormProps) {
  const [expandedSection, setExpandedSection] = useState<string>("personal-details")
  const [completionStatus, setCompletionStatus] = useState({
    "personal-details": false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
    activities: false,
  })

  // Calculate overall completion percentage
  const calculateCompletionPercentage = () => {
    const totalSections = Object.keys(completionStatus).length
    const completedSections = Object.values(completionStatus).filter(Boolean).length
    return (completedSections / totalSections) * 100
  }

  const updateSectionCompletion = (section: string, isComplete: boolean) => {
    setCompletionStatus((prev) => ({
      ...prev,
      [section]: isComplete,
    }))
  }

  const handleSectionChange = (section: string) => {
    setExpandedSection(section)
  }

  const navigateToNextSection = () => {
    const sections = Object.keys(completionStatus)
    const currentIndex = sections.indexOf(expandedSection)
    if (currentIndex < sections.length - 1) {
      setExpandedSection(sections[currentIndex + 1])
    }
  }

  const navigateToPrevSection = () => {
    const sections = Object.keys(completionStatus)
    const currentIndex = sections.indexOf(expandedSection)
    if (currentIndex > 0) {
      setExpandedSection(sections[currentIndex - 1])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Resume Information</h2>
        <div className="flex items-center gap-4 mb-2">
          <Progress value={calculateCompletionPercentage()} className="h-2" />
          <span className="text-sm font-medium">{Math.round(calculateCompletionPercentage())}%</span>
        </div>
        <p className="text-sm text-gray-500">Complete all sections for the best ATS score</p>
      </div>

      <Accordion
        type="single"
        collapsible
        value={expandedSection}
        onValueChange={handleSectionChange}
        className="space-y-4"
      >
        <AccordionItem value="personal-details" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Personal Details</span>
              {completionStatus["personal-details"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <PersonalDetailsForm
              personalDetails={resumeData.personalDetails}
              updatePersonalDetails={(details) => {
                updateResumeData({ personalDetails: details })
                // Mark as complete if name and email are filled
                updateSectionCompletion("personal-details", Boolean(details.name && details.email))
              }}
            />
            <div className="flex justify-end mt-4">
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Professional Summary</span>
              {completionStatus["summary"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <SummaryForm
              summary={resumeData.summary}
              updateSummary={(summary) => {
                updateResumeData({ summary })
                // Mark as complete if summary is at least 50 chars
                updateSectionCompletion("summary", summary.length >= 50)
              }}
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Work Experience</span>
              {completionStatus["experience"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <ExperienceForm
              experience={resumeData.experience}
              updateExperience={(experience) => {
                updateResumeData({ experience })
                // Mark as complete if at least one experience with company and position
                updateSectionCompletion(
                  "experience",
                  experience.some((exp) => exp.company && exp.position),
                )
              }}
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Education</span>
              {completionStatus["education"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <EducationForm
              education={resumeData.education}
              updateEducation={(education) => {
                updateResumeData({ education })
                // Mark as complete if at least one education with institution and degree
                updateSectionCompletion(
                  "education",
                  education.some((edu) => edu.institution && edu.degree),
                )
              }}
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Skills</span>
              {completionStatus["skills"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <SkillsForm
              skills={resumeData.skills}
              updateSkills={(skills) => {
                updateResumeData({ skills })
                // Mark as complete if at least 3 skills
                updateSectionCompletion("skills", skills.length >= 3)
              }}
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Projects</span>
              {completionStatus["projects"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <ProjectsForm
              projects={resumeData.projects}
              updateProjects={(projects) => {
                updateResumeData({ projects })
                // Mark as complete if at least one project with title and description
                updateSectionCompletion(
                  "projects",
                  projects.some((proj) => proj.title && proj.description),
                )
              }}
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Certifications</span>
              {completionStatus["certifications"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <CertificationsForm
              certifications={resumeData.certifications}
              updateCertifications={(certifications) => {
                updateResumeData({ certifications })
                // This section is optional, so mark as complete regardless
                updateSectionCompletion("certifications", true)
              }}
            />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={navigateToNextSection}>
                Next <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="activities" className="border rounded-md p-2">
          <AccordionTrigger className="px-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">Activities & Interests</span>
              {completionStatus["activities"] && <span className="text-green-500 text-sm">Completed</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4">
            <ActivitiesForm
              activities={resumeData.activities}
              updateActivities={(activities) => {
                updateResumeData({ activities })
                // This section is optional, so mark as complete regardless
                updateSectionCompletion("activities", true)
              }}
            />
            <div className="flex justify-start mt-4">
              <Button variant="outline" onClick={navigateToPrevSection}>
                <ChevronUp className="mr-2 h-4 w-4" /> Previous
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

