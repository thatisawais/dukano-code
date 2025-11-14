"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type PolicyTemplate = "custom" | "privacy" | "terms" | "refund"

type PageItem = {
  id: string
  title: string
  slug: string
  content: string
  template: PolicyTemplate
  published: boolean
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export default function PagesManager() {
  const [pages, setPages] = useState<PageItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dashboard_pages")
      if (raw) setPages(JSON.parse(raw))
    } catch {
      // ignore parse errors
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-pretty">Pages</h1>
          <Button asChild className="h-9">
            <Link href="/dashboard/pages/new">Create Page</Link>
          </Button>
        </div>

        <Card className="p-4 space-y-4">
          <h2 className="text-sm font-medium">All Pages</h2>
          <div className="rounded-md border border-border/40 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">
                      No pages yet. Click "Create Page" to add your first policy page.
                    </TableCell>
                  </TableRow>
                ) : (
                  pages.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>/{p.slug}</TableCell>
                      <TableCell>{p.published ? "Published" : "Draft"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
