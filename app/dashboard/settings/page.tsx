"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Bell, LinkIcon, CreditCard, Shield, Globe, Store } from "lucide-react"
import { SettingsTopNav } from "@/components/settings-top-nav"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "My Awesome Store",
    storeDescription: "The best products at amazing prices",
    storeEmail: "contact@mystore.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Main St, New York, NY 10001",
    currency: "USD",
  })

  const handleStoreSettingChange = (field: string, value: string) => {
    setStoreSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your store settings and preferences</p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Top Nav */}
        <SettingsTopNav />

        {/* General */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="h-5 w-5 mr-2" />
              Store Information
            </CardTitle>
            <CardDescription>Basic information about your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={storeSettings.storeName}
                  onChange={(e) => handleStoreSettingChange("storeName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={storeSettings.storeEmail}
                  onChange={(e) => handleStoreSettingChange("storeEmail", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                rows={3}
                value={storeSettings.storeDescription}
                onChange={(e) => handleStoreSettingChange("storeDescription", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storePhone">Phone Number</Label>
                <Input
                  id="storePhone"
                  value={storeSettings.storePhone}
                  onChange={(e) => handleStoreSettingChange("storePhone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={storeSettings.currency}
                  onChange={(e) => handleStoreSettingChange("currency", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="storeAddress">Store Address</Label>
              <Textarea
                id="storeAddress"
                rows={2}
                value={storeSettings.storeAddress}
                onChange={(e) => handleStoreSettingChange("storeAddress", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Domain & SEO */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Domain & SEO
            </CardTitle>
            <CardDescription>Configure your store's web presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Custom Domain</Label>
              <div className="flex gap-2">
                <Input id="domain" placeholder="mystore.com" />
                <Button variant="outline">Connect</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Current: mystore.Dukano.com</p>
            </div>
            <div>
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input id="seoTitle" placeholder="My Awesome Store - Best Products Online" />
            </div>
            <div>
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea id="seoDescription" rows={2} placeholder="Discover amazing products at unbeatable prices..." />
            </div>
          </CardContent>
        </Card>

        {/* Quick links to subpages */}
      </div>
    </DashboardLayout>
  )
}
