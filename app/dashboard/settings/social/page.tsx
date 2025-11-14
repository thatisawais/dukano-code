"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsTopNav } from "@/components/settings-top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { LinkIcon, Facebook, Instagram, Twitter, Youtube, Globe, Megaphone } from "lucide-react"

const socialPlatforms = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    connected: true,
    followers: "12.5K",
    lastSync: "2 hours ago",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    connected: true,
    followers: "8.3K",
    lastSync: "1 hour ago",
  }
]

const adPlatforms = [
  { name: "Facebook Ads", icon: Facebook, color: "text-blue-600", connected: false },
  { name: "Google Ads", icon: Globe, color: "text-emerald-600", connected: false },
  { name: "TikTok Ads", icon: Megaphone, color: "text-fuchsia-600", connected: false },
]

export default function SettingsSocialPage() {
  const [autoPost, setAutoPost] = useState(true)
  const [includePrice, setIncludePrice] = useState(true)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [defaultHashtags, setDefaultHashtags] = useState("#ecommerce #shopping #deals")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Social Media</h1>
          <p className="text-muted-foreground">Connect social accounts and ad platforms for your store</p>
        </div>

        {/* Settings Top Nav */}
        <SettingsTopNav />

        {/* Social Connections */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="h-5 w-5 mr-2" />
              Social Media Connections
            </CardTitle>
            <CardDescription>Connect accounts to sync posts and product feeds</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon
              return (
                <Card key={platform.name} className="bg-muted/20 border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${platform.color}`} />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      {platform.connected ? (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Connected</Badge>
                      ) : (
                        <Badge variant="outline">Not Connected</Badge>
                      )}
                    </div>
                    {platform.connected ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Followers:</span>
                          <span className="font-medium">{platform.followers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last sync:</span>
                          <span className="font-medium">{platform.lastSync}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" className="w-full">
                        Connect {platform.name}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
