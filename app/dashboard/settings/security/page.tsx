"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, KeyRound, SmartphoneNfc, LogOut } from "lucide-react"
import { SettingsTopNav } from "@/components/settings-top-nav"

export default function SettingsSecurityPage() {
  const [twoFA, setTwoFA] = useState(false)
  const [apiKeys, setApiKeys] = useState([
    { id: "pk_1", name: "Public Storefront", value: "sk_live_************************abcd", created: "May 1, 2025" },
    { id: "pk_2", name: "Admin Integration", value: "sk_live_************************wxyz", created: "Jun 10, 2025" },
  ])

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security</h1>
          <p className="text-muted-foreground">Manage account security and access</p>
        </div>

        {/* Settings Top Nav */}
        <SettingsTopNav />

        {/* Change Password */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="h-5 w-5 mr-2" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" placeholder="••••••••" />
            </div>
            <div className="sm:col-span-3">
              <Button>Update Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SmartphoneNfc className="h-5 w-5 mr-2" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="max-w-md">
              <p className="text-sm text-muted-foreground">
                Use an authenticator app (TOTP) to secure your account with a 6-digit code on login.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={twoFA} onCheckedChange={setTwoFA} />
              <Button variant="outline">{twoFA ? "Manage 2FA" : "Set up 2FA"}</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}
