import type React from "react"
import type { ResumeData, Template, ColorScheme } from "@/types/resume"

// This function will be called from the client component
export async function generatePDF(
  resumeData: ResumeData,
  template: Template,
  colorScheme: ColorScheme,
  resumeRef: React.RefObject<HTMLDivElement>,
): Promise<void> {
  if (!resumeRef.current) {
    throw new Error("Resume container reference is not available")
  }

  // Dynamically import jsPDF and html2canvas only on the client side
  const { default: jsPDF } = await import("jspdf")
  const { default: html2canvas } = await import("html2canvas")

  const content = resumeRef.current

  // Save original styles
  const originalStyle = {
    height: content.style.height,
    maxHeight: content.style.maxHeight,
    overflow: content.style.overflow,
    position: content.style.position,
  }

  // Temporarily modify the container to show full content
  content.style.height = "auto"
  content.style.maxHeight = "none"
  content.style.overflow = "visible"
  content.style.position = "relative"

  try {
    // Capture the full content
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      windowHeight: content.scrollHeight,
      height: content.scrollHeight,
    })

    const imgData = canvas.toDataURL("image/png")

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Calculate the aspect ratio to fit the content properly
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

    // Center the image horizontally
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 0

    // If the scaled image height is greater than the PDF height,
    // we need to split it across multiple pages
    if (imgHeight * ratio > pdfHeight) {
      let remainingHeight = imgHeight
      let currentPosition = 0

      while (remainingHeight > 0) {
        // Calculate how much of the image can fit on the current page
        const pageHeight = Math.min(remainingHeight, pdfHeight / ratio)

        // Add a portion of the image to the current page
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio,
          "",
          "FAST",
          0,
          -currentPosition / ratio,
        )

        // Reduce remaining height and move to next position
        remainingHeight -= pageHeight
        currentPosition += pageHeight

        // Add a new page if there's more content
        if (remainingHeight > 0) {
          pdf.addPage()
        }
      }
    } else {
      // If the image fits on a single page, just add it
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    }

    pdf.save(`${resumeData.personalDetails.name || "Resume"}.pdf`)
  } finally {
    // Restore original styles
    content.style.height = originalStyle.height
    content.style.maxHeight = originalStyle.maxHeight
    content.style.overflow = originalStyle.overflow
    content.style.position = originalStyle.position
  }
}

