"use client"

import { useEffect } from "react"

export default function ThemeInit() {
  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null
      const prefersDark =
        typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

      const shouldDark = stored ? stored === "dark" : prefersDark
      const root = document.documentElement
      root.classList.toggle("dark", shouldDark)
    } catch {
      // no-op
    }
  }, [])
  return null
}
