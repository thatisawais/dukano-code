"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DashboardLayout } from "@/components/dashboard-layout"


type Asset = {
  id: string
  name: string
  type: string
  size: number
  optimizedSize: number
  url: string
}

async function optimizeImage(file: File): Promise<Blob> {
  // Non-images bypass optimization
  if (!file.type.startsWith("image/")) return file

  const img = new Image()
  img.crossOrigin = "anonymous" // avoid CORS when drawing to canvas
  const fileReader = new FileReader()
  const dataURL: string = await new Promise((resolve, reject) => {
    fileReader.onload = () => resolve(fileReader.result as string)
    fileReader.onerror = reject
    fileReader.readAsDataURL(file)
  })
  img.src = dataURL

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  const maxDim = 1600
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)

  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return file

  ctx.drawImage(img, 0, 0, w, h)
  const quality = 0.8
  const type = file.type === "image/png" ? "image/png" : "image/jpeg"
  const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b || file), type, quality))
  return blob
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<Asset[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const totalOriginal = useMemo(() => assets.reduce((acc, a) => acc + a.size, 0), [assets])
  const totalOptimized = useMemo(() => assets.reduce((acc, a) => acc + a.optimizedSize, 0), [assets])

  const onFilesSelected = useCallback(async (files: FileList | null) => {
    if (!files) return
    const newAssets: Asset[] = []
    for (const file of Array.from(files)) {
      const optimizedBlob = await optimizeImage(file)
      const url = URL.createObjectURL(optimizedBlob)
      newAssets.push({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        optimizedSize: optimizedBlob.size,
        url,
      })
    }
    setAssets((prev) => [...newAssets, ...prev])
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  return (
    <DashboardLayout>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-pretty">Media Library</h1>
        </div>

        <Card className="p-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="assets">Upload assets</Label>
            <Input
              ref={inputRef}
              id="assets"
              type="file"
              multiple
              className="bg-muted/30 border-border/40"
              onChange={(e) => onFilesSelected(e.target.files)}
            />
            <p className="text-xs text-muted-foreground">
              Images are automatically optimized on upload (max 1600px, ~80% quality).
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Original: {(totalOriginal / 1024).toFixed(1)} KB</span>
            <span>Optimized: {(totalOptimized / 1024).toFixed(1)} KB</span>
            <span>Saved: {((1 - (totalOptimized || 1) / (totalOriginal || 1)) * 100).toFixed(1)}%</span>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-medium mb-3">Library</h2>
          <ScrollArea className="h-[480px]">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {assets.length === 0 ? (
                <div className="col-span-full text-sm text-muted-foreground">
                  No assets yet. Upload files to populate your media library.
                </div>
              ) : (
                assets.map((a) => (
                  <div key={a.id} className="rounded-md border border-border/40 overflow-hidden">
                    {a.type.startsWith("image/") ? (
                      <img
                        src={a.url || "/placeholder.svg"}
                        alt={a.name}
                        className="block h-32 w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-32 w-full flex items-center justify-center text-xs text-muted-foreground">
                        {a.name}
                      </div>
                    )}
                    <div className="px-2 py-2 text-xs">
                      <div className="truncate" title={a.name}>
                        {a.name}
                      </div>
                      <div className="text-muted-foreground">{(a.optimizedSize / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </DashboardLayout>

  )
}
