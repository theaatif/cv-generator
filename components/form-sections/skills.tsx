"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Skill, SkillCategory } from "@/types/resume"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Wand2 } from "lucide-react"
import { categorizeSkill } from "@/utils/skill-categorizer"
import { suggestSkills } from "@/utils/ai-helpers"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SkillsFormProps {
  skills: Skill[]
  updateSkills: (skills: Skill[]) => void
}

export function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newCategory, setNewCategory] = useState<SkillCategory>("language")
  const [isSuggesting, setIsSuggesting] = useState(false)

  const addSkill = () => {
    if (!newSkill.trim()) return

    // Check if skill already exists
    if (skills.some((skill) => skill.name.toLowerCase() === newSkill.toLowerCase())) {
      toast({
        title: "Duplicate skill",
        description: "This skill is already in your list.",
        variant: "destructive",
      })
      return
    }

    // Auto-categorize if not manually selected
    const category = newCategory || categorizeSkill(newSkill)

    updateSkills([...skills, { name: newSkill, category }])

    setNewSkill("")
    setNewCategory("language")
  }

  const removeSkill = (index: number) => {
    const newSkills = [...skills]
    newSkills.splice(index, 1)
    updateSkills(newSkills)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const updateSkillCategory = (index: number, category: SkillCategory) => {
    const newSkills = [...skills]
    newSkills[index] = { ...newSkills[index], category }
    updateSkills(newSkills)
  }

  const getSkillsByCategory = (category: SkillCategory) => {
    return skills.filter((skill) => skill.category === category)
  }

  const handleSuggestSkills = async () => {
    if (skills.length === 0) {
      toast({
        title: "No skills to analyze",
        description: "Please add at least one skill to get suggestions.",
        variant: "destructive",
      })
      return
    }

    setIsSuggesting(true)
    try {
      const suggestions = await suggestSkills(skills.map((s) => s.name))

      // Filter out skills that already exist
      const existingSkillNames = skills.map((s) => s.name.toLowerCase())
      const newSuggestions = suggestions.filter((s) => !existingSkillNames.includes(s.name.toLowerCase()))

      if (newSuggestions.length === 0) {
        toast({
          title: "No new suggestions",
          description: "All suggested skills are already in your list.",
        })
        return
      }

      updateSkills([...skills, ...newSuggestions])

      toast({
        title: "Skills suggested",
        description: `Added ${newSuggestions.length} complementary skills to your list.`,
      })
    } catch (error) {
      toast({
        title: "Suggestion failed",
        description: "Could not suggest skills. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSuggesting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="new-skill">Add Skill</Label>
          <div className="flex space-x-2">
            <Input
              id="new-skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., React.js, Python, AWS"
              className="flex-1"
            />
            <Select value={newCategory} onValueChange={(value) => setNewCategory(value as SkillCategory)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="language">Language</SelectItem>
                <SelectItem value="framework">Framework</SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="cloud">Cloud</SelectItem>
                <SelectItem value="soft">Soft Skill</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSuggestSkills}
            disabled={isSuggesting || skills.length === 0}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isSuggesting ? "Suggesting..." : "Suggest Complementary Skills"}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("language").length > 0 ? (
                getSkillsByCategory("language").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No languages added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Frameworks & Libraries</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("framework").length > 0 ? (
                getSkillsByCategory("framework").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No frameworks added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("tool").length > 0 ? (
                getSkillsByCategory("tool").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No tools added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("database").length > 0 ? (
                getSkillsByCategory("database").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No databases added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Cloud Services</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("cloud").length > 0 ? (
                getSkillsByCategory("cloud").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No cloud services added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("soft").length > 0 ? (
                getSkillsByCategory("soft").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No soft skills added yet</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Other Skills</h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory("other").length > 0 ? (
                getSkillsByCategory("other").map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s.name === skill.name)
                  return (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skillIndex)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No other skills added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for skills section:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Include both technical and soft skills</li>
          <li>List skills relevant to the job you're applying for</li>
          <li>Be specific with technical skills (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Include skill level indicators for technical skills when appropriate</li>
          <li>Organize skills by category for better readability</li>
        </ul>
      </div>
    </div>
  )
}

