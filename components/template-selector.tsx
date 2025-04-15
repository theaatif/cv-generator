"use client"

import type { Template } from "@/types/resume"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a Template</h2>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={(value) => onSelectTemplate(value as Template)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem value="clean-minimalist" id="clean-minimalist" className="sr-only" />
          <Label htmlFor="clean-minimalist" className="cursor-pointer">
            <Card
              className={`overflow-hidden transition-all ${selectedTemplate === "clean-minimalist" ? "ring-2 ring-primary" : ""}`}
            >
              <div className="aspect-[1/1.414] bg-gray-100 relative">
                <div className="absolute inset-0 p-4 flex flex-col">
                  <div className="h-8 bg-white rounded-sm mb-2"></div>
                  <div className="flex-1 bg-white rounded-sm p-2">
                    <div className="w-1/3 h-4 bg-gray-200 rounded-sm mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-sm mb-4"></div>

                    <div className="w-1/2 h-3 bg-gray-300 rounded-sm mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-4"></div>

                    <div className="w-1/2 h-3 bg-gray-300 rounded-sm mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">Clean Minimalist</h3>
                <p className="text-sm text-muted-foreground">Professional and clean design with a focus on content</p>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="modern-tech" id="modern-tech" className="sr-only" />
          <Label htmlFor="modern-tech" className="cursor-pointer">
            <Card
              className={`overflow-hidden transition-all ${selectedTemplate === "modern-tech" ? "ring-2 ring-primary" : ""}`}
            >
              <div className="aspect-[1/1.414] bg-gray-100 relative">
                <div className="absolute inset-0 p-4 flex flex-col">
                  <div className="flex mb-2">
                    <div className="w-1/3 h-8 bg-blue-500 rounded-sm"></div>
                    <div className="flex-1 h-8 bg-white rounded-sm"></div>
                  </div>
                  <div className="flex flex-1">
                    <div className="w-1/3 bg-gray-200 rounded-sm p-2">
                      <div className="w-full h-3 bg-gray-300 rounded-sm mb-2"></div>
                      <div className="w-full h-2 bg-gray-300 rounded-sm mb-1"></div>
                      <div className="w-full h-2 bg-gray-300 rounded-sm mb-4"></div>

                      <div className="w-full h-3 bg-gray-300 rounded-sm mb-2"></div>
                      <div className="w-full h-2 bg-gray-300 rounded-sm mb-1"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-sm p-2">
                      <div className="w-1/2 h-3 bg-blue-500 rounded-sm mb-2"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-sm mb-4"></div>

                      <div className="w-1/2 h-3 bg-blue-500 rounded-sm mb-2"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">Modern Tech</h3>
                <p className="text-sm text-muted-foreground">Contemporary design with a technical focus</p>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="academic-focus" id="academic-focus" className="sr-only" />
          <Label htmlFor="academic-focus" className="cursor-pointer">
            <Card
              className={`overflow-hidden transition-all ${selectedTemplate === "academic-focus" ? "ring-2 ring-primary" : ""}`}
            >
              <div className="aspect-[1/1.414] bg-gray-100 relative">
                <div className="absolute inset-0 p-4 flex flex-col">
                  <div className="h-10 bg-gray-700 rounded-sm mb-2 flex items-center justify-center">
                    <div className="w-1/2 h-3 bg-white rounded-sm"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-sm p-2">
                    <div className="w-full h-3 bg-gray-700 rounded-sm mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-sm mb-4"></div>

                    <div className="w-full h-3 bg-gray-700 rounded-sm mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-4"></div>

                    <div className="w-full h-3 bg-gray-700 rounded-sm mb-2"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-sm mb-1"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">Academic Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Traditional format ideal for academic and research positions
                </p>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

