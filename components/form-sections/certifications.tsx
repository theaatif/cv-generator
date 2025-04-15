"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { Certification } from "@/types/resume"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"

interface CertificationsFormProps {
  certifications: Certification[]
  updateCertifications: (certifications: Certification[]) => void
}

export function CertificationsForm({ certifications, updateCertifications }: CertificationsFormProps) {
  const addCertification = () => {
    updateCertifications([
      ...certifications,
      {
        name: "",
        issuer: "",
        date: "",
        expiry: "",
        credentialId: "",
        url: "",
      },
    ])
  }

  const removeCertification = (index: number) => {
    const newCertifications = [...certifications]
    newCertifications.splice(index, 1)
    updateCertifications(newCertifications)
  }

  const updateCertificationItem = (index: number, field: keyof Certification, value: string) => {
    const newCertifications = [...certifications]
    newCertifications[index] = { ...newCertifications[index], [field]: value }
    updateCertifications(newCertifications)
  }

  const moveCertification = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === certifications.length - 1)) {
      return
    }

    const newCertifications = [...certifications]
    const newIndex = direction === "up" ? index - 1 : index + 1
    ;[newCertifications[index], newCertifications[newIndex]] = [newCertifications[newIndex], newCertifications[index]]

    updateCertifications(newCertifications)
  }

  return (
    <div className="space-y-6">
      {certifications.map((cert, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveCertification(index, "up")}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveCertification(index, "down")}
                disabled={index === certifications.length - 1}
                className="h-8 w-8"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${index}`}>
                  Certification Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`cert-name-${index}`}
                  value={cert.name}
                  onChange={(e) => updateCertificationItem(index, "name", e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${index}`}>
                  Issuing Organization <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`cert-issuer-${index}`}
                  value={cert.issuer}
                  onChange={(e) => updateCertificationItem(index, "issuer", e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-date-${index}`}>Issue Date</Label>
                <Input
                  id={`cert-date-${index}`}
                  value={cert.date}
                  onChange={(e) => updateCertificationItem(index, "date", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-expiry-${index}`}>Expiration Date (if applicable)</Label>
                <Input
                  id={`cert-expiry-${index}`}
                  value={cert.expiry}
                  onChange={(e) => updateCertificationItem(index, "expiry", e.target.value)}
                  placeholder="MM/YYYY or 'No Expiration'"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-id-${index}`}>Credential ID</Label>
                <Input
                  id={`cert-id-${index}`}
                  value={cert.credentialId}
                  onChange={(e) => updateCertificationItem(index, "credentialId", e.target.value)}
                  placeholder="ABC123XYZ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-url-${index}`}>Credential URL</Label>
                <Input
                  id={`cert-url-${index}`}
                  value={cert.url}
                  onChange={(e) => updateCertificationItem(index, "url", e.target.value)}
                  placeholder="https://www.credential.net/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addCertification} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Certification
      </Button>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for certifications:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>List the most relevant and recent certifications first</li>
          <li>Include credential IDs and verification URLs when available</li>
          <li>For technical roles, prioritize technical certifications</li>
          <li>Include expiration dates to show that certifications are current</li>
          <li>Only include certifications relevant to your target role</li>
        </ul>
      </div>
    </div>
  )
}

