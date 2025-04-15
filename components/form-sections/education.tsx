"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Education } from "@/types/resume"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface EducationFormProps {
  education: Education[]
  updateEducation: (education: Education[]) => void
}

export function EducationForm({ education, updateEducation }: EducationFormProps) {
  const addEducation = () => {
    updateEducation([
      ...education,
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
    ])
  }

  const removeEducation = (index: number) => {
    const newEducation = [...education]
    newEducation.splice(index, 1)
    updateEducation(newEducation)
  }

  const updateEducationItem = (index: number, field: keyof Education, value: any) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [field]: value }

    // If setting current to true, clear the end date
    if (field === "current" && value === true) {
      newEducation[index].endDate = ""
    }

    updateEducation(newEducation)
  }

  const moveEducation = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === education.length - 1)) {
      return
    }

    const newEducation = [...education]
    const newIndex = direction === "up" ? index - 1 : index + 1
    ;[newEducation[index], newEducation[newIndex]] = [newEducation[newIndex], newEducation[index]]

    updateEducation(newEducation)
  }

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveEducation(index, "up")}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveEducation(index, "down")}
                disabled={index === education.length - 1}
                className="h-8 w-8"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${index}`}>
                  Institution <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => updateEducationItem(index, "institution", e.target.value)}
                  placeholder="Stanford University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  value={edu.location}
                  onChange={(e) => updateEducationItem(index, "location", e.target.value)}
                  placeholder="Stanford, CA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>
                  Degree <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => updateEducationItem(index, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${index}`}>Field of Study</Label>
                <Input
                  id={`field-${index}`}
                  value={edu.field}
                  onChange={(e) => updateEducationItem(index, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                <Input
                  id={`start-date-${index}`}
                  value={edu.startDate}
                  onChange={(e) => updateEducationItem(index, "startDate", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${index}`}>End Date</Label>
                <Input
                  id={`end-date-${index}`}
                  value={edu.endDate}
                  onChange={(e) => updateEducationItem(index, "endDate", e.target.value)}
                  placeholder="MM/YYYY"
                  disabled={edu.current}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`gpa-${index}`}>GPA (optional)</Label>
                <Input
                  id={`gpa-${index}`}
                  value={edu.gpa}
                  onChange={(e) => updateEducationItem(index, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${index}`}
                  checked={edu.current}
                  onCheckedChange={(checked) => updateEducationItem(index, "current", checked === true)}
                />
                <Label htmlFor={`current-${index}`}>I am currently studying here</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Additional Information (optional)</Label>
              <Textarea
                id={`description-${index}`}
                value={edu.description}
                onChange={(e) => updateEducationItem(index, "description", e.target.value)}
                placeholder="Relevant coursework, honors, activities, etc."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for education section:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>List your most recent education first</li>
          <li>Include GPA if it's 3.0 or higher</li>
          <li>Mention relevant coursework, especially for recent graduates</li>
          <li>Include honors, scholarships, and academic achievements</li>
          <li>For working professionals, education is typically less detailed than experience</li>
        </ul>
      </div>
    </div>
  )
}

