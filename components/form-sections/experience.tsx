"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Experience } from "@/types/resume"
import { Plus, Trash2, Wand2, ChevronUp, ChevronDown } from "lucide-react"
import { optimizeExperienceDescription } from "@/utils/ai-helpers"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface ExperienceFormProps {
  experience: Experience[]
  updateExperience: (experience: Experience[]) => void
}

export function ExperienceForm({ experience, updateExperience }: ExperienceFormProps) {
  const [optimizingIndex, setOptimizingIndex] = useState<number | null>(null)

  const addExperience = () => {
    updateExperience([
      ...experience,
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
    ])
  }

  const removeExperience = (index: number) => {
    const newExperience = [...experience]
    newExperience.splice(index, 1)
    updateExperience(newExperience)
  }

  const updateExperienceItem = (index: number, field: keyof Experience, value: any) => {
    const newExperience = [...experience]
    newExperience[index] = { ...newExperience[index], [field]: value }

    // If setting current to true, clear the end date
    if (field === "current" && value === true) {
      newExperience[index].endDate = ""
    }

    updateExperience(newExperience)
  }

  const moveExperience = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === experience.length - 1)) {
      return
    }

    const newExperience = [...experience]
    const newIndex = direction === "up" ? index - 1 : index + 1
    ;[newExperience[index], newExperience[newIndex]] = [newExperience[newIndex], newExperience[index]]

    updateExperience(newExperience)
  }

  const optimizeDescription = async (index: number) => {
    const exp = experience[index]
    if (!exp.description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description to optimize",
        variant: "destructive",
      })
      return
    }

    setOptimizingIndex(index)
    try {
      const optimized = await optimizeExperienceDescription(exp.description, exp.position, exp.company)

      const newExperience = [...experience]
      newExperience[index] = { ...newExperience[index], description: optimized }
      updateExperience(newExperience)

      toast({
        title: "Description optimized",
        description: "Your experience description has been enhanced for ATS compatibility.",
      })
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Could not optimize your description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setOptimizingIndex(null)
    }
  }

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveExperience(index, "up")}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveExperience(index, "down")}
                disabled={index === experience.length - 1}
                className="h-8 w-8"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>
                  Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`company-${index}`}
                  value={exp.company}
                  onChange={(e) => updateExperienceItem(index, "company", e.target.value)}
                  placeholder="Google, Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`position-${index}`}>
                  Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`position-${index}`}
                  value={exp.position}
                  onChange={(e) => updateExperienceItem(index, "position", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  value={exp.location}
                  onChange={(e) => updateExperienceItem(index, "location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                  <Input
                    id={`start-date-${index}`}
                    value={exp.startDate}
                    onChange={(e) => updateExperienceItem(index, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`end-date-${index}`}>End Date</Label>
                  </div>
                  <Input
                    id={`end-date-${index}`}
                    value={exp.endDate}
                    onChange={(e) => updateExperienceItem(index, "endDate", e.target.value)}
                    placeholder="MM/YYYY"
                    disabled={exp.current}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${index}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperienceItem(index, "current", checked === true)}
                />
                <Label htmlFor={`current-${index}`}>I currently work here</Label>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => optimizeDescription(index)}
                  disabled={optimizingIndex === index}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {optimizingIndex === index ? "Optimizing..." : "Optimize"}
                </Button>
              </div>
              <Textarea
                id={`description-${index}`}
                value={exp.description}
                onChange={(e) => updateExperienceItem(index, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground">
                Use bullet points starting with • for better readability. Focus on achievements and quantifiable
                results.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for effective work experience:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Use action verbs (Developed, Implemented, Led, etc.)</li>
          <li>Include metrics and quantifiable achievements</li>
          <li>Highlight relevant technologies and methodologies</li>
          <li>Focus on contributions and impact, not just responsibilities</li>
          <li>Tailor descriptions to match keywords from the job description</li>
        </ul>
      </div>
    </div>
  )
}

