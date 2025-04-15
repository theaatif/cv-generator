"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import { optimizeSummary } from "@/utils/ai-helpers"
import { toast } from "@/components/ui/use-toast"

interface SummaryFormProps {
  summary: string
  updateSummary: (summary: string) => void
}

export function SummaryForm({ summary, updateSummary }: SummaryFormProps) {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [charCount, setCharCount] = useState(summary.length)

  const handleChange = (value: string) => {
    updateSummary(value)
    setCharCount(value.length)
  }

  const handleOptimize = async () => {
    if (!summary.trim()) {
      toast({
        title: "Error",
        description: "Please enter a summary to optimize",
        variant: "destructive",
      })
      return
    }

    setIsOptimizing(true)
    try {
      const optimized = await optimizeSummary(summary)
      updateSummary(optimized)
      setCharCount(optimized.length)
      toast({
        title: "Summary optimized",
        description: "Your professional summary has been enhanced for ATS compatibility.",
      })
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Could not optimize your summary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="summary">Professional Summary</Label>
        <span className={`text-sm ${charCount > 600 ? "text-red-500" : "text-gray-500"}`}>
          {charCount}/600 characters
        </span>
      </div>

      <Textarea
        id="summary"
        placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications..."
        value={summary}
        onChange={(e) => handleChange(e.target.value)}
        className="min-h-[150px] resize-y"
        maxLength={800}
      />

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          A strong summary highlights your key skills and experience in 3-5 sentences.
        </p>
        <Button variant="outline" size="sm" onClick={handleOptimize} disabled={isOptimizing}>
          <Wand2 className="mr-2 h-4 w-4" />
          {isOptimizing ? "Optimizing..." : "Optimize for ATS"}
        </Button>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for an effective summary:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Start with your professional title and years of experience</li>
          <li>Highlight 2-3 key achievements or specialized skills</li>
          <li>Include relevant technologies and methodologies</li>
          <li>Mention your career goals or what you're looking for</li>
          <li>Keep it concise and focused on your target role</li>
        </ul>
      </div>
    </div>
  )
}

