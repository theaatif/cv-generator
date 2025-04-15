"use client"

import { useState } from "react"
import type { ColorScheme } from "@/types/resume"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface ColorSelectorProps {
  colorScheme: ColorScheme
  onColorChange: (colorScheme: ColorScheme) => void
}

export function ColorSelector({ colorScheme, onColorChange }: ColorSelectorProps) {
  const [activeColor, setActiveColor] = useState<keyof ColorScheme | null>(null)

  const presetColorSchemes: ColorScheme[] = [
    {
      primary: "#0f766e",
      secondary: "#f59e0b",
      text: "#1f2937",
      background: "#ffffff",
      accent: "#e0f2fe",
    },
    {
      primary: "#1d4ed8",
      secondary: "#ec4899",
      text: "#111827",
      background: "#ffffff",
      accent: "#dbeafe",
    },
    {
      primary: "#7c3aed",
      secondary: "#10b981",
      text: "#1f2937",
      background: "#ffffff",
      accent: "#f3e8ff",
    },
    {
      primary: "#be123c",
      secondary: "#0284c7",
      text: "#1f2937",
      background: "#ffffff",
      accent: "#fee2e2",
    },
    {
      primary: "#374151",
      secondary: "#6b7280",
      text: "#1f2937",
      background: "#ffffff",
      accent: "#f3f4f6",
    },
    {
      primary: "#1e293b",
      secondary: "#475569",
      text: "#0f172a",
      background: "#ffffff",
      accent: "#f1f5f9",
    },
  ]

  const handleColorChange = (color: string) => {
    if (activeColor) {
      onColorChange({
        ...colorScheme,
        [activeColor]: color,
      })
    }
  }

  const handlePresetSelect = (preset: ColorScheme) => {
    onColorChange(preset)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Color Scheme</h2>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Preset Color Schemes</h3>
        <div className="grid grid-cols-3 gap-2">
          {presetColorSchemes.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-1 h-auto flex flex-col items-center gap-1 border-2"
              style={{
                borderColor:
                  preset.primary === colorScheme.primary && preset.secondary === colorScheme.secondary
                    ? preset.primary
                    : "transparent",
              }}
              onClick={() => handlePresetSelect(preset)}
            >
              <div className="flex gap-1">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
              </div>
              <span className="text-xs">Preset {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Custom Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-color" className="block text-xs" onClick={() => setActiveColor("primary")}>
              Primary Color
            </Label>
            <div
              className={`w-full h-10 rounded-md cursor-pointer border-2 ${activeColor === "primary" ? "ring-2 ring-offset-2 ring-ring" : ""}`}
              style={{ backgroundColor: colorScheme.primary, borderColor: colorScheme.primary }}
              onClick={() => setActiveColor("primary")}
            ></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-color" className="block text-xs" onClick={() => setActiveColor("secondary")}>
              Secondary Color
            </Label>
            <div
              className={`w-full h-10 rounded-md cursor-pointer border-2 ${activeColor === "secondary" ? "ring-2 ring-offset-2 ring-ring" : ""}`}
              style={{ backgroundColor: colorScheme.secondary, borderColor: colorScheme.secondary }}
              onClick={() => setActiveColor("secondary")}
            ></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text-color" className="block text-xs" onClick={() => setActiveColor("text")}>
              Text Color
            </Label>
            <div
              className={`w-full h-10 rounded-md cursor-pointer border-2 ${activeColor === "text" ? "ring-2 ring-offset-2 ring-ring" : ""}`}
              style={{ backgroundColor: colorScheme.text, borderColor: colorScheme.text }}
              onClick={() => setActiveColor("text")}
            ></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background-color" className="block text-xs" onClick={() => setActiveColor("background")}>
              Background Color
            </Label>
            <div
              className={`w-full h-10 rounded-md cursor-pointer border-2 ${activeColor === "background" ? "ring-2 ring-offset-2 ring-ring" : ""}`}
              style={{ backgroundColor: colorScheme.background, borderColor: "#e2e8f0" }}
              onClick={() => setActiveColor("background")}
            ></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent-color" className="block text-xs" onClick={() => setActiveColor("accent")}>
              Accent Color
            </Label>
            <div
              className={`w-full h-10 rounded-md cursor-pointer border-2 ${activeColor === "accent" ? "ring-2 ring-offset-2 ring-ring" : ""}`}
              style={{ backgroundColor: colorScheme.accent, borderColor: colorScheme.accent }}
              onClick={() => setActiveColor("accent")}
            ></div>
          </div>
        </div>

        {activeColor && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Select {activeColor} color</h4>
            <div className="grid grid-cols-8 gap-2">
              {[
                "#0f766e",
                "#0e7490",
                "#0369a1",
                "#1d4ed8",
                "#4f46e5",
                "#7c3aed",
                "#9333ea",
                "#c026d3",
                "#be185d",
                "#be123c",
                "#b91c1c",
                "#c2410c",
                "#ca8a04",
                "#65a30d",
                "#16a34a",
                "#059669",
                "#0d9488",
                "#0891b2",
                "#0284c7",
                "#2563eb",
                "#4f46e5",
                "#7c3aed",
                "#9333ea",
                "#c026d3",
                "#db2777",
                "#e11d48",
                "#dc2626",
                "#ea580c",
                "#eab308",
                "#84cc16",
                "#22c55e",
                "#10b981",
              ].map((color, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-8 h-8 p-0 rounded-md"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                >
                  {color === colorScheme[activeColor] && <Check className="h-4 w-4 text-white" />}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

