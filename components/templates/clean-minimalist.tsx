"use client"

import type { ResumeData, ColorScheme } from "@/types/resume"

interface CleanMinimalistTemplateProps {
  resumeData: ResumeData
  colorScheme: ColorScheme
}

export function CleanMinimalistTemplate({ resumeData, colorScheme }: CleanMinimalistTemplateProps) {
  const { personalDetails, summary, experience, education, skills, projects, certifications, activities } = resumeData

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill.name)
      return acc
    },
    {} as Record<string, string[]>,
  )

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1) + "s"
  }

  return (
    <div
      className="w-full h-full p-6 text-sm"
      style={{
        color: colorScheme.text,
        backgroundColor: colorScheme.background,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
          {personalDetails.name || "Your Name"}
        </h1>
        <p className="text-base mb-2">{personalDetails.title || "Professional Title"}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>{personalDetails.phone}</span>}
          {personalDetails.location && <span>{personalDetails.location}</span>}
          {personalDetails.linkedin && <span>{personalDetails.linkedin}</span>}
          {personalDetails.github && <span>{personalDetails.github}</span>}
          {personalDetails.website && <span>{personalDetails.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Professional Summary
          </h2>
          <p>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && experience[0].company && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p>
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      {exp.startDate}
                      {exp.endDate ? ` - ${exp.endDate}` : exp.current ? " - Present" : ""}
                    </p>
                  </div>
                </div>
                <div className="mt-1 whitespace-pre-line">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && education[0].institution && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p>
                      {edu.institution}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : edu.current ? " - Present" : ""}
                    </p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="font-medium">{formatCategoryName(category)}</h3>
                <p>{categorySkills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].title && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    {project.technologies && <p className="italic">{project.technologies}</p>}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-right">
                      <p>
                        {project.startDate}
                        {project.endDate ? ` - ${project.endDate}` : ""}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-1 whitespace-pre-line">{project.description}</div>
                {project.link && (
                  <p className="mt-1 text-xs" style={{ color: colorScheme.primary }}>
                    {project.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p>
                    {cert.issuer}
                    {cert.credentialId ? ` - ${cert.credentialId}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    {cert.date}
                    {cert.expiry ? ` - ${cert.expiry}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {activities.length > 0 && activities[0].title && (
        <section className="mb-4">
          <h2
            className="text-base font-semibold mb-1 pb-1 border-b"
            style={{ borderColor: colorScheme.primary, color: colorScheme.primary }}
          >
            Activities & Interests
          </h2>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <p>
                      {activity.organization}
                      {activity.location ? `, ${activity.location}` : ""}
                    </p>
                  </div>
                  {(activity.startDate || activity.endDate) && (
                    <div className="text-right">
                      <p>
                        {activity.startDate}
                        {activity.endDate ? ` - ${activity.endDate}` : ""}
                      </p>
                    </div>
                  )}
                </div>
                {activity.description && <p className="mt-1">{activity.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

