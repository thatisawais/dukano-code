"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Save } from "lucide-react"
import { SettingsTopNav } from "@/components/settings-top-nav"

export default function SettingsNotificationsPage() {
  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    customerNotifications: true,
    inventoryAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyReports: true,
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Choose what notifications you want to receive</p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
        {/* Insert settings top nav */}
        <SettingsTopNav />
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Configure email and in-app notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                id: "orderNotifications",
                label: "Order Notifications",
                desc: "Get notified when new orders are placed",
              },
              {
                id: "customerNotifications",
                label: "Customer Notifications",
                desc: "Get notified about customer inquiries",
              },
              { id: "inventoryAlerts", label: "Inventory Alerts", desc: "Get alerted when products are low in stock" },
            ].map((row) => (
              <div key={row.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={row.id}>{row.label}</Label>
                  <p className="text-sm text-muted-foreground">{row.desc}</p>
                </div>
                <Switch
                  id={row.id}
                  checked={(notifications as any)[row.id]}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [row.id]: checked }))}
                />
              </div>
            ))}
            <Separator />
            {[
              { id: "weeklyReports", label: "Weekly Reports", desc: "Receive weekly performance summaries" },
              { id: "monthlyReports", label: "Monthly Reports", desc: "Receive monthly analytics reports" },
              { id: "marketingEmails", label: "Marketing Emails", desc: "Product updates, promotions, and tips" },
            ].map((row) => (
              <div key={row.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={row.id}>{row.label}</Label>
                  <p className="text-sm text-muted-foreground">{row.desc}</p>
                </div>
                <Switch
                  id={row.id}
                  checked={(notifications as any)[row.id]}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [row.id]: checked }))}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
