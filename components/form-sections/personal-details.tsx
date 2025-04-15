"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PersonalDetails } from "@/types/resume"
import { validateEmail, validateUrl } from "@/utils/validators"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface PersonalDetailsFormProps {
  personalDetails: PersonalDetails
  updatePersonalDetails: (details: PersonalDetails) => void
}

export function PersonalDetailsForm({ personalDetails, updatePersonalDetails }: PersonalDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof PersonalDetails, value: string) => {
    const newDetails = { ...personalDetails, [field]: value }

    // Validate fields
    const newErrors = { ...errors }

    if (field === "email") {
      if (value && !validateEmail(value)) {
        newErrors.email = "Please enter a valid email address"
      } else {
        delete newErrors.email
      }
    }

    if (field === "linkedin") {
      if (value && !validateUrl(value, "linkedin.com")) {
        newErrors.linkedin = "Please enter a valid LinkedIn URL"
      } else {
        delete newErrors.linkedin
      }
    }

    if (field === "github") {
      if (value && !validateUrl(value, "github.com")) {
        newErrors.github = "Please enter a valid GitHub URL"
      } else {
        delete newErrors.github
      }
    }

    if (field === "website") {
      if (value && !validateUrl(value)) {
        newErrors.website = "Please enter a valid URL"
      } else {
        delete newErrors.website
      }
    }

    setErrors(newErrors)
    updatePersonalDetails(newDetails)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={personalDetails.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            placeholder="Senior Software Engineer"
            value={personalDetails.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            value={personalDetails.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "pr-10 border-red-300" : "pr-10"}
            required
          />
          {personalDetails.email && !errors.email && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {errors.email && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
          )}
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={personalDetails.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="San Francisco, CA"
            value={personalDetails.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <div className="relative">
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/johndoe"
            value={personalDetails.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className={errors.linkedin ? "pr-10 border-red-300" : "pr-10"}
          />
          {personalDetails.linkedin && !errors.linkedin && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {errors.linkedin && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
          )}
        </div>
        {errors.linkedin && <p className="text-sm text-red-500">{errors.linkedin}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub URL</Label>
        <div className="relative">
          <Input
            id="github"
            placeholder="https://github.com/johndoe"
            value={personalDetails.github || ""}
            onChange={(e) => handleChange("github", e.target.value)}
            className={errors.github ? "pr-10 border-red-300" : "pr-10"}
          />
          {personalDetails.github && !errors.github && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {errors.github && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
          )}
        </div>
        {errors.github && <p className="text-sm text-red-500">{errors.github}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Personal Website</Label>
        <div className="relative">
          <Input
            id="website"
            placeholder="https://johndoe.com"
            value={personalDetails.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
            className={errors.website ? "pr-10 border-red-300" : "pr-10"}
          />
          {personalDetails.website && !errors.website && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {errors.website && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
          )}
        </div>
        {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
      </div>
    </div>
  )
}

