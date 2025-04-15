"use client"

import type { ResumeData, ColorScheme } from "@/types/resume"

interface ModernTechTemplateProps {
  resumeData: ResumeData
  colorScheme: ColorScheme
}

export function ModernTechTemplate({ resumeData, colorScheme }: ModernTechTemplateProps) {
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
      className="w-full h-full flex flex-col text-sm"
      style={{
        color: colorScheme.text,
        backgroundColor: colorScheme.background,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header className="p-6" style={{ backgroundColor: colorScheme.primary, color: "white" }}>
        <h1 className="text-2xl font-bold mb-1">{personalDetails.name || "Your Name"}</h1>
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

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/3 p-4 space-y-6" style={{ backgroundColor: colorScheme.accent }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: colorScheme.primary }}>
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-medium text-xs uppercase tracking-wider mb-1">
                      {formatCategoryName(category)}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-1 rounded-md text-xs"
                          style={{
                            backgroundColor: colorScheme.primary,
                            color: "white",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && education[0].institution && (
            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: colorScheme.primary }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-xs">{edu.field}</p>
                    <p className="text-xs">{edu.institution}</p>
                    <p className="text-xs">
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : edu.current ? " - Present" : ""}
                    </p>
                    {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: colorScheme.primary }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-xs">{cert.name}</h3>
                    <p className="text-xs">{cert.issuer}</p>
                    <p className="text-xs">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {activities.length > 0 && activities[0].title && (
            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: colorScheme.primary }}>
                Activities
              </h2>
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-xs">{activity.title}</h3>
                    <p className="text-xs">{activity.organization}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6 space-y-6">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-base font-semibold mb-2" style={{ color: colorScheme.primary }}>
                Professional Summary
              </h2>
              <p>{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && experience[0].company && (
            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: colorScheme.primary }}>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-xs">
                          {exp.company}
                          {exp.location ? `, ${exp.location}` : ""}
                        </p>
                      </div>
                      <p className="text-xs">
                        {exp.startDate}
                        {exp.endDate ? ` - ${exp.endDate}` : exp.current ? " - Present" : ""}
                      </p>
                    </div>
                    <div className="mt-1 whitespace-pre-line text-xs">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && projects[0].title && (
            <section>
              <h2 className="text-base font-semibold mb-3" style={{ color: colorScheme.primary }}>
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        {project.technologies && <p className="text-xs italic">{project.technologies}</p>}
                      </div>
                      {(project.startDate || project.endDate) && (
                        <p className="text-xs">
                          {project.startDate}
                          {project.endDate ? ` - ${project.endDate}` : ""}
                        </p>
                      )}
                    </div>
                    <div className="mt-1 whitespace-pre-line text-xs">{project.description}</div>
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
        </div>
      </div>
    </div>
  )
}

