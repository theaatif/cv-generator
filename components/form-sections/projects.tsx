"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/types/resume"
import { Plus, Trash2, Wand2, ChevronUp, ChevronDown, Github } from "lucide-react"
import { optimizeProjectDescription } from "@/utils/ai-helpers"
import { toast } from "@/components/ui/use-toast"
import { fetchGitHubProjects } from "@/utils/github-integration"

interface ProjectsFormProps {
  projects: Project[]
  updateProjects: (projects: Project[]) => void
}

export function ProjectsForm({ projects, updateProjects }: ProjectsFormProps) {
  const [optimizingIndex, setOptimizingIndex] = useState<number | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const addProject = () => {
    updateProjects([
      ...projects,
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const removeProject = (index: number) => {
    const newProjects = [...projects]
    newProjects.splice(index, 1)
    updateProjects(newProjects)
  }

  const updateProjectItem = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    updateProjects(newProjects)
  }

  const moveProject = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === projects.length - 1)) {
      return
    }

    const newProjects = [...projects]
    const newIndex = direction === "up" ? index - 1 : index + 1
    ;[newProjects[index], newProjects[newIndex]] = [newProjects[newIndex], newProjects[index]]

    updateProjects(newProjects)
  }

  const optimizeDescription = async (index: number) => {
    const project = projects[index]
    if (!project.description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description to optimize",
        variant: "destructive",
      })
      return
    }

    setOptimizingIndex(index)
    try {
      const optimized = await optimizeProjectDescription(project.description, project.title, project.technologies)

      const newProjects = [...projects]
      newProjects[index] = { ...newProjects[index], description: optimized }
      updateProjects(newProjects)

      toast({
        title: "Description optimized",
        description: "Your project description has been enhanced for ATS compatibility.",
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

  const importFromGitHub = async () => {
    setIsImporting(true)
    try {
      const githubProjects = await fetchGitHubProjects()

      if (githubProjects.length === 0) {
        toast({
          title: "No projects found",
          description: "No public repositories found or GitHub integration is not set up.",
          variant: "destructive",
        })
        return
      }

      // Merge with existing projects, avoiding duplicates
      const existingTitles = projects.map((p) => p.title.toLowerCase())
      const newProjects = githubProjects.filter((p) => !existingTitles.includes(p.title.toLowerCase()))

      if (newProjects.length === 0) {
        toast({
          title: "No new projects",
          description: "All GitHub projects are already in your list.",
        })
        return
      }

      updateProjects([...projects, ...newProjects])

      toast({
        title: "Projects imported",
        description: `Imported ${newProjects.length} projects from GitHub.`,
      })
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Could not import projects from GitHub. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={importFromGitHub} disabled={isImporting}>
          <Github className="mr-2 h-4 w-4" />
          {isImporting ? "Importing..." : "Import from GitHub"}
        </Button>
      </div>

      {projects.map((project, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveProject(index, "up")}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveProject(index, "down")}
                disabled={index === projects.length - 1}
                className="h-8 w-8"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`title-${index}`}>
                  Project Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`title-${index}`}
                  value={project.title}
                  onChange={(e) => updateProjectItem(index, "title", e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                <Input
                  id={`technologies-${index}`}
                  value={project.technologies}
                  onChange={(e) => updateProjectItem(index, "technologies", e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`link-${index}`}>Project Link</Label>
                <Input
                  id={`link-${index}`}
                  value={project.link}
                  onChange={(e) => updateProjectItem(index, "link", e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                <Input
                  id={`start-date-${index}`}
                  value={project.startDate}
                  onChange={(e) => updateProjectItem(index, "startDate", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${index}`}>End Date</Label>
                <Input
                  id={`end-date-${index}`}
                  value={project.endDate}
                  onChange={(e) => updateProjectItem(index, "endDate", e.target.value)}
                  placeholder="MM/YYYY or 'Ongoing'"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor={`description-${index}`}>
                  Description <span className="text-red-500">*</span>
                </Label>
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
                value={project.description}
                onChange={(e) => updateProjectItem(index, "description", e.target.value)}
                placeholder="Describe the project, your role, and key achievements..."
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground">
                Focus on your contributions, technical challenges overcome, and the impact of the project.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Project
      </Button>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for project descriptions:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Highlight technical challenges and how you solved them</li>
          <li>Mention specific technologies and methodologies used</li>
          <li>Quantify results and impact when possible</li>
          <li>Include links to live demos or repositories</li>
          <li>For team projects, clearly state your specific contributions</li>
        </ul>
      </div>
    </div>
  )
}

