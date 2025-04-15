"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, FileText } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

interface SavedResumesProps {
  savedResumes: { id: string; name: string; date: string }[]
  onLoadResume: (id: string) => void
}

export function SavedResumes({ savedResumes, onLoadResume }: SavedResumesProps) {
  const { removeFromStorage } = useLocalStorage()
  const [resumes, setResumes] = useState(savedResumes)

  const handleDeleteResume = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    removeFromStorage(id)
    setResumes(resumes.filter((resume) => resume.id !== id))

    toast({
      title: "Resume deleted",
      description: "The resume has been permanently deleted.",
    })
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (e) {
      return "Unknown date"
    }
  }

  if (resumes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md bg-muted/30">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No saved resumes</h3>
        <p className="text-muted-foreground mb-4">
          You haven't saved any resumes yet. Create and save a resume to see it here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Saved Resumes</h2>

      <div className="grid gap-4">
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onLoadResume(resume.id)}
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{resume.name}</h3>
                <p className="text-sm text-muted-foreground">Last edited: {formatDate(resume.date)}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDeleteResume(resume.id, e)}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

