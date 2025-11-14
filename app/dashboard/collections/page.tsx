"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FolderPlus, Folder, Search, MoveRight } from "lucide-react"

const initialCollections = [
  { id: "c1", name: "New Arrivals", products: 8 },
  { id: "c2", name: "Best Sellers", products: 5 },
  { id: "c3", name: "Work Essentials", products: 6 },
]

export default function CollectionsPage() {
  const [collections, setCollections] = useState(initialCollections)
  const [search, setSearch] = useState("")

  const filtered = collections.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Collections</h1>
            <p className="text-muted-foreground">Create and manage curated groups for your storefront</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/dashboard/collections/new">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Collection
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card className="bg-card/50 border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Collections</CardTitle>
              <CardDescription>Only collections are displayed here</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <Card key={c.id} className="border-border/40 bg-muted/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-foreground">{c.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {c.products} product{c.products === 1 ? "" : "s"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        const ok = confirm(`Remove collection "${c.name}"?`)
                        if (!ok) return
                        setCollections((prev) => prev.filter((x) => x.id !== c.id))
                      }}
                      aria-label={`Remove ${c.name}`}
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="mt-4">
                    <Button asChild variant="outline" size="sm">
                      <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center">
                        Manage
                        <MoveRight className="h-3.5 w-3.5 ml-2" />
                      </a>
                    </Button>
                    <Badge variant="secondary" className="ml-2">
                      Static
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-sm text-muted-foreground p-6">
                No collections found. Try adjusting your search.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
