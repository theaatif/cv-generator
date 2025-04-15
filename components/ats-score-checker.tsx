"use client"

import { Progress } from "@/components/ui/progress"

interface ATSScoreCheckerProps {
  score: number
}

export function ATSScoreChecker({ score }: ATSScoreCheckerProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    if (score >= 80) return "Excellent! Your resume is highly ATS-friendly."
    if (score >= 60) return "Good. Your resume should pass most ATS scans."
    if (score >= 40) return "Fair. Consider adding more relevant content."
    return "Needs improvement. Add more content to pass ATS scans."
  }

  const getProgressColor = () => {
    if (score >= 80) return "bg-green-600"
    if (score >= 60) return "bg-amber-600"
    return "bg-red-600"
  }

  return (
    <div className="mt-4 p-4 border rounded-md bg-muted/50">
      <h3 className="text-sm font-medium mb-2">ATS Compatibility Score</h3>
      <div className="flex items-center gap-2 mb-2">
        <Progress value={score} className="h-2" indicatorclassname={getProgressColor()} />
        <span className={`font-medium ${getScoreColor()}`}>{score}%</span>
      </div>
      <p className="text-xs text-muted-foreground">{getScoreMessage()}</p>
    </div>
  )
}

