"use client"

import { useState, useEffect, useRef } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ColorSelector } from "@/components/color-selector"
import { ATSScoreChecker } from "@/components/ats-score-checker"
import { SavedResumes } from "@/components/saved-resumes"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { initialResumeData } from "@/utils/initial-data"
import type { ResumeData, Template, ColorScheme } from "@/types/resume"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Share, Save } from "lucide-react"
import { generatePDF } from "@/utils/pdf-generator"
import { generateShareableLink } from "@/utils/share-utils"
import { toast } from "@/components/ui/use-toast"

// Import all template components
import { CleanMinimalistTemplate } from "@/components/templates/clean-minimalist"
import { ModernTechTemplate } from "@/components/templates/modern-tech"
import { AcademicFocusTemplate } from "@/components/templates/academic-focus"

const templateComponents = {
  "clean-minimalist": CleanMinimalistTemplate,
  "modern-tech": ModernTechTemplate,
  "academic-focus": AcademicFocusTemplate,
}

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("clean-minimalist")
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    primary: "#0f766e",
    secondary: "#f59e0b",
    text: "#1f2937",
    background: "#ffffff",
    accent: "#e0f2fe",
  })
  const [activeTab, setActiveTab] = useState("edit")
  const [atsScore, setAtsScore] = useState(0)
  const { saveToStorage, loadFromStorage, getAllSavedResumes } = useLocalStorage()
  const [savedResumes, setSavedResumes] = useState<{ id: string; name: string; date: string }[]>([])
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isPdfGenerating, setIsPdfGenerating] = useState(false)
  const [showFullHeight, setShowFullHeight] = useState(false)

  // Load saved resumes on mount
  useEffect(() => {
    const resumes = getAllSavedResumes()
    setSavedResumes(resumes)

    // Load last edited resume if available
    const lastResume = loadFromStorage("last-resume")
    if (lastResume) {
      setResumeData(lastResume.data)
      setSelectedTemplate(lastResume.template)
      setColorScheme(lastResume.colorScheme)
    }
  }, [getAllSavedResumes, loadFromStorage])

  // Auto-save current resume
  useEffect(() => {
    const autoSaveData = {
      data: resumeData,
      template: selectedTemplate,
      colorScheme: colorScheme,
      lastEdited: new Date().toISOString(),
    }
    saveToStorage("last-resume", autoSaveData)
  }, [resumeData, selectedTemplate, colorScheme, saveToStorage])

  // Calculate ATS score whenever resume data changes
  useEffect(() => {
    // Simple ATS score calculation based on content completeness
    let score = 0

    // Check personal details
    if (resumeData.personalDetails.name) score += 5
    if (resumeData.personalDetails.email) score += 5
    if (resumeData.personalDetails.phone) score += 5
    if (resumeData.personalDetails.location) score += 5
    if (resumeData.personalDetails.linkedin) score += 5
    if (resumeData.personalDetails.github) score += 5

    // Check summary
    if (resumeData.summary && resumeData.summary.length > 50) score += 10

    // Check experience
    resumeData.experience.forEach((exp) => {
      if (exp.company && exp.position && exp.description && exp.description.length > 100) {
        score += 10
      }
    })

    // Check education
    resumeData.education.forEach((edu) => {
      if (edu.institution && edu.degree) score += 5
    })

    // Check skills
    if (resumeData.skills.length > 5) score += 10

    // Normalize to 100
    score = Math.min(100, score)
    setAtsScore(score)
  }, [resumeData])

  const handleUpdateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const handleSaveResume = () => {
    const id = `resume-${Date.now()}`
    const resumeToSave = {
      id,
      name: resumeData.personalDetails.name || `Resume ${savedResumes.length + 1}`,
      date: new Date().toISOString(),
      data: resumeData,
      template: selectedTemplate,
      colorScheme: colorScheme,
    }

    saveToStorage(id, resumeToSave)
    setSavedResumes((prev) => [
      ...prev,
      {
        id,
        name: resumeToSave.name,
        date: resumeToSave.date,
      },
    ])

    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    })
  }

  const handleLoadResume = (id: string) => {
    const resume = loadFromStorage(id)
    if (resume) {
      setResumeData(resume.data)
      setSelectedTemplate(resume.template)
      setColorScheme(resume.colorScheme)
      setActiveTab("edit")

      toast({
        title: "Resume loaded",
        description: "Your resume has been loaded successfully.",
      })
    }
  }

  const handleDownloadPDF = async () => {
    try {
      setIsPdfGenerating(true)
      // Show full height for PDF generation
      setShowFullHeight(true)

      // Wait for the state update to be reflected in the DOM
      await new Promise((resolve) => setTimeout(resolve, 100))

      await generatePDF(resumeData, selectedTemplate, colorScheme, resumeRef)

      toast({
        title: "PDF generated",
        description: "Your resume has been downloaded as a PDF.",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Restore scrollable view
      setShowFullHeight(false)
      setIsPdfGenerating(false)
    }
  }

  const handleShareResume = async () => {
    try {
      const link = await generateShareableLink(resumeData, selectedTemplate, colorScheme)

      // Copy link to clipboard
      await navigator.clipboard.writeText(link)

      toast({
        title: "Link generated",
        description: "Shareable link copied to clipboard. It will expire in 7 days.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate shareable link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tech Resume Builder</h1>
        <p className="text-gray-600">Create an ATS-friendly, professional resume for tech roles</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="edit">Edit Resume</TabsTrigger>
              <TabsTrigger value="templates">Templates & Colors</TabsTrigger>
              <TabsTrigger value="saved">Saved Resumes</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-6">
              <ResumeForm resumeData={resumeData} updateResumeData={handleUpdateResumeData} />
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
              <ColorSelector colorScheme={colorScheme} onColorChange={setColorScheme} />
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <SavedResumes savedResumes={savedResumes} onLoadResume={handleLoadResume} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Preview</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleSaveResume}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleShareResume}>
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button size="sm" onClick={handleDownloadPDF} disabled={isPdfGenerating}>
                  <Download className="h-4 w-4 mr-1" />
                  {isPdfGenerating ? "Generating..." : "PDF"}
                </Button>
              </div>
            </div>

            <div ref={resumeRef}>
              <ResumePreview
                resumeData={resumeData}
                template={selectedTemplate}
                colorScheme={colorScheme}
                fullHeight={showFullHeight}
              />
            </div>

            <ATSScoreChecker score={atsScore} />
          </div>
        </div>
      </div>
    </div>
  )
}

