import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import ThemeInit from "@/components/theme-init"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dukano - Build Your Dream Ecommerce Store",
  description:
    "The complete platform to build, customize, and manage your ecommerce store with drag-and-drop simplicity.",
  generator: "Dukano",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeInit />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
