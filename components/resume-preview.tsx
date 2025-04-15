"use client"

import type { ResumeData, Template, ColorScheme } from "@/types/resume"
import { CleanMinimalistTemplate } from "@/components/templates/clean-minimalist"
import { ModernTechTemplate } from "@/components/templates/modern-tech"
import { AcademicFocusTemplate } from "@/components/templates/academic-focus"

interface ResumePreviewProps {
  resumeData: ResumeData
  template: Template
  colorScheme: ColorScheme
  fullHeight?: boolean
}

export function ResumePreview({ resumeData, template, colorScheme, fullHeight = false }: ResumePreviewProps) {
  return (
    <div className="border rounded-md overflow-hidden bg-white shadow-sm">
      <div
        className={`w-full ${fullHeight ? "h-auto" : "aspect-[1/1.414] overflow-auto"}`}
        style={{ maxHeight: fullHeight ? "none" : "600px" }}
      >
        {template === "clean-minimalist" && (
          <CleanMinimalistTemplate resumeData={resumeData} colorScheme={colorScheme} />
        )}
        {template === "modern-tech" && <ModernTechTemplate resumeData={resumeData} colorScheme={colorScheme} />}
        {template === "academic-focus" && <AcademicFocusTemplate resumeData={resumeData} colorScheme={colorScheme} />}
      </div>
    </div>
  )
}

