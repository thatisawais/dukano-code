"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HandCoins, Landmark } from "lucide-react"
import { Switch } from "@/components/ui/switch"

type Method = "cod" | "bank"

export default function CheckoutPage() {
  const [method, setMethod] = useState<Method>("cod")
  const [isActive, setIsActive] = useState(true)

  // Cash on Delivery
  const [codInstructions, setCodInstructions] = useState("")

  // Bank Transfer
  const [bankName, setBankName] = useState("")
  const [accountTitle, setAccountTitle] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bankInstructions, setBankInstructions] = useState("")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Choose your payment method and complete your order</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">Secure</Badge>
        </div>

        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
            <CardDescription>Pick a method to enter its details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Method Selection */}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={method === "cod" ? "default" : "outline"}
                onClick={() => setMethod("cod")}
                className="flex items-center gap-2"
              >
                <HandCoins className="h-4 w-4" /> Cash on Delivery
              </Button>
              <Button
                type="button"
                variant={method === "bank" ? "default" : "outline"}
                onClick={() => setMethod("bank")}
                className="flex items-center gap-2"
              >
                <Landmark className="h-4 w-4" /> Bank Transfer
              </Button>
            </div>

            {/* Cash on Delivery Section */}
            {method === "cod" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="codInstructions">Payment Instructions</Label>
                  <Textarea
                    id="codInstructions"
                    placeholder="Add any special delivery or payment instructions..."
                    value={codInstructions}
                    onChange={(e) => setCodInstructions(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Bank Transfer Section */}
            {method === "bank" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="e.g. First National Bank"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountTitle">Account Title</Label>
                    <Input
                      id="accountTitle"
                      placeholder="e.g. Dukano LLC"
                      value={accountTitle}
                      onChange={(e) => setAccountTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number / IBAN</Label>
                    <Input
                      id="accountNumber"
                      placeholder="DE89 3704 0044 0532 0130 00"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bankInstructions">Payment Instructions</Label>
                  <Textarea
                    id="bankInstructions"
                    placeholder="Add transfer details or confirmation notes..."
                    value={bankInstructions}
                    onChange={(e) => setBankInstructions(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Active / Inactive Toggle */}
            <div className="flex items-center justify-between border-t pt-4">
              <Label htmlFor="statusToggle" className="text-sm font-medium">
                Status: {isActive ? "Active" : "Inactive"}
              </Label>
              <Switch
                id="statusToggle"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
