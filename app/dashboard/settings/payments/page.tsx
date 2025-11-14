"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Crown, CheckCircle2 } from "lucide-react"
import { SettingsTopNav } from "@/components/settings-top-nav"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function SettingsPaymentsPage() {
  const plan = {
    name: "Pro",
    price: "$49/mo",
    status: "Active",
    renewsOn: "Nov 12, 2025",
    features: ["Unlimited products", "Custom domain", "Advanced analytics", "Priority support"],
  }

  const invoices = [
    { id: "INV-1005", date: "Sep 12, 2025", amount: "$49.00", status: "Paid" },
    { id: "INV-1004", date: "Aug 12, 2025", amount: "$49.00", status: "Paid" },
    { id: "INV-1003", date: "Jul 12, 2025", amount: "$49.00", status: "Paid" },
  ]

  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExp, setCardExp] = useState("")
  const [cardCvc, setCardCvc] = useState("")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription to the platform</p>
        </div>

        <SettingsTopNav />

        <Card className="bg-card/50 border-border/40">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 mr-2 text-primary" />
                Current Plan: {plan.name}
              </CardTitle>
              <CardDescription>Renews on {plan.renewsOn}</CardDescription>
            </div>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{plan.status}</Badge>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="text-2xl font-semibold">{plan.price}</div>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Change Plan</Button>
              <Button>Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Billing History
            </CardTitle>
            <CardDescription>Your recent invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono">{inv.id}</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell>{inv.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{inv.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle>Subscription Payment Card</CardTitle>
            <CardDescription>Use this card to pay for your subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="Jane Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardExp">Expiration (MM/YY)</Label>
                <Input id="cardExp" placeholder="12/28" value={cardExp} onChange={(e) => setCardExp(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="cardCvc">CVC</Label>
                <Input
                  id="cardCvc"
                  placeholder="123"
                  inputMode="numeric"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  console.log("[v0] Saving subscription card:", { cardName, cardNumber, cardExp })
                }}
              >
                Save Card
              </Button>
              <Button variant="outline">Remove Saved Card</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Note: This card will be used to renew your subscription. You can update it anytime.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
