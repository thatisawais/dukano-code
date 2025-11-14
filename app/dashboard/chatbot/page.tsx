"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChatbotSettings() {
  const [enabled, setEnabled] = useState(false)
  const [botName, setBotName] = useState("Shop Assistant")
  const [welcome, setWelcome] = useState("Hi! How can I help you today?")
  const [tone, setTone] = useState("friendly")
  const [kb, setKb] = useState("Company overview, shipping info, returns policy, product FAQs...")

  function save() {
    console.log("[v0] Saving chatbot config", { enabled, botName, welcome, tone, kb })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-pretty">AI Chatbot</h1>
          <div className="flex items-center gap-2">
            <Switch id="enabled" checked={enabled} onCheckedChange={setEnabled} />
            <Label htmlFor="enabled">{enabled ? "Enabled" : "Disabled"}</Label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-4 space-y-4">
            <h2 className="text-sm font-medium">Configuration</h2>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="botName">Bot name</Label>
                <Input
                  id="botName"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="bg-muted/30 border-border/40"
                />
              </div>

              <div className="grid gap-2">
                <Label>Chat tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="welcome">Welcome message</Label>
                <Input
                  id="welcome"
                  value={welcome}
                  onChange={(e) => setWelcome(e.target.value)}
                  className="bg-muted/30 border-border/40"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kb">Knowledge base</Label>
                <Textarea
                  id="kb"
                  value={kb}
                  onChange={(e) => setKb(e.target.value)}
                  placeholder="Paste FAQs, policies, and product details..."
                  className="min-h-40 bg-muted/30 border-border/40"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Include shipping/returns, product details, and store policies.
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={save}>Save</Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h2 className="text-sm font-medium">Preview</h2>
            {!enabled ? (
              <div className="text-sm text-muted-foreground">Enable the chatbot to preview responses.</div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-md border border-border/40 p-3 text-sm">
                  <div className="font-medium mb-1">{botName}</div>
                  <div className="text-muted-foreground">{welcome}</div>
                </div>
                <div className="rounded-md border border-dashed border-border/40 p-3 text-sm text-muted-foreground">
                  Ask a question to test the bot (hook up AI SDK when ready).
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>

  )
}
