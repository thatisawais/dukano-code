"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard-layout"


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

function loadPages(): PageItem[] {
  try {
    const raw = localStorage.getItem("dashboard_pages")
    return raw ? (JSON.parse(raw) as PageItem[]) : []
  } catch {
    return []
  }
}

function savePages(pages: PageItem[]) {
  try {
    localStorage.setItem("dashboard_pages", JSON.stringify(pages))
  } catch {
    // ignore
  }
}

export default function PageCreator() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [template, setTemplate] = useState<PolicyTemplate>("custom")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)

  const computedSlug = useMemo(() => (slug ? slugify(slug) : slugify(title)), [slug, title])

  function insertTemplate(t: PolicyTemplate) {
    switch (t) {
      case "privacy":
        setContent("This Privacy Policy describes how we handle your data...")
        break
      case "terms":
        setContent("These Terms of Service govern your use of our site...")
        break
      case "refund":
        setContent("Our Refund Policy explains when and how refunds are issued...")
        break
      default:
        setContent("")
    }
  }

  function onSave() {
    if (!title) return
    const newPage: PageItem = {
      id: crypto.randomUUID(),
      title,
      slug: computedSlug,
      template,
      content,
      published,
    }
    const current = loadPages()
    savePages([newPage, ...current])
    router.push("/dashboard/pages")
  }

  function onCancel() {
    router.push("/dashboard/pages")
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-pretty">Create Page</h1>
        </div>

        <Card className="p-4 space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Privacy Policy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-muted/30 border-border/40"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="privacy-policy"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-muted/30 border-border/40"
              />
              <p className="text-xs text-muted-foreground">Final slug: {computedSlug || "n/a"}</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="template">Template</Label>
              <select
                id="template"
                className="h-9 rounded-md border border-border/40 bg-background px-3 text-sm"
                value={template}
                onChange={(e) => {
                  const t = e.target.value as PolicyTemplate
                  setTemplate(t)
                  insertTemplate(t)
                }}
              >
                <option value="custom">Custom</option>
                <option value="privacy">Privacy Policy</option>
                <option value="terms">Terms of Service</option>
                <option value="refund">Refund Policy</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your policy content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-40 bg-muted/30 border-border/40"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="published" checked={published} onCheckedChange={setPublished} />
                <Label htmlFor="published">Published</Label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={onSave}>Save Page</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>

  )
}
