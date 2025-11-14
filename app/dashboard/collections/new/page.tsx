"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { FolderPlus, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewCollectionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isVisible, setIsVisible] = useState(true)

  const handleSave = () => {
    if (!name.trim()) {
      toast({ title: "Name required", description: "Please enter a collection name." })
      return
    }
    // In a real app, call server action / API to persist
    toast({ title: "Collection created", description: `"${name}" has been created.` })
    router.push("/dashboard/collections")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">New Collection</h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/collections">Cancel</Link>
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Name and visibility for your collection</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Collection Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Summer Picks" />
              </div>
              <div>
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this collection features..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="visible">Visible</Label>
                  <p className="text-sm text-muted-foreground">Show this collection on your storefront</p>
                </div>
                <Switch id="visible" checked={isVisible} onCheckedChange={setIsVisible} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Banner Image</Label>
                <div className="aspect-3/1 w-full rounded-lg border border-dashed border-border/40 bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
                  Upload coming soon
                </div>
              </div>
              <div>
                <Label>Preview</Label>
                <div className="rounded-lg border border-border/40 p-4">
                  <div className="text-lg font-semibold">{name || "Collection name"}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {description || "A short description of this collection."}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
