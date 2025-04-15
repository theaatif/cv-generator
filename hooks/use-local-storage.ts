"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const saveToStorage = useCallback(
    (key: string, value: any) => {
      if (isClient) {
        try {
          localStorage.setItem(key, JSON.stringify(value))
          return true
        } catch (error) {
          console.error("Error saving to localStorage:", error)
          return false
        }
      }
      return false
    },
    [isClient],
  )

  const loadFromStorage = useCallback(
    (key: string) => {
      if (isClient) {
        try {
          const item = localStorage.getItem(key)
          return item ? JSON.parse(item) : null
        } catch (error) {
          console.error("Error loading from localStorage:", error)
          return null
        }
      }
      return null
    },
    [isClient],
  )

  const removeFromStorage = useCallback(
    (key: string) => {
      if (isClient) {
        try {
          localStorage.removeItem(key)
          return true
        } catch (error) {
          console.error("Error removing from localStorage:", error)
          return false
        }
      }
      return false
    },
    [isClient],
  )

  const getAllSavedResumes = useCallback(() => {
    if (!isClient) return []

    try {
      const resumes = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith("resume-") && key !== "last-resume") {
          const resume = JSON.parse(localStorage.getItem(key) || "{}")
          resumes.push({
            id: key,
            name: resume.name || `Resume ${resumes.length + 1}`,
            date: resume.date || new Date().toISOString(),
          })
        }
      }
      return resumes
    } catch (error) {
      console.error("Error getting all resumes:", error)
      return []
    }
  }, [isClient])

  return {
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    getAllSavedResumes,
  }
}

