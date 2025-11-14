"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Store, ArrowRight, ArrowLeft, Palette, Sparkles, ShoppingBag, Coffee, Shirt, Gamepad2 } from "lucide-react"
import { useRouter } from "next/navigation"

const colorSchemes = [
  { name: "Midnight", primary: "#000000", secondary: "#1a1a1a", accent: "#ffffff" },
  { name: "Ocean", primary: "#0ea5e9", secondary: "#0284c7", accent: "#f0f9ff" },
  { name: "Forest", primary: "#059669", secondary: "#047857", accent: "#f0fdf4" },
  { name: "Sunset", primary: "#ea580c", secondary: "#dc2626", accent: "#fff7ed" },
  { name: "Purple", primary: "#9333ea", secondary: "#7c3aed", accent: "#faf5ff" },
  { name: "Rose", primary: "#e11d48", secondary: "#be185d", accent: "#fff1f2" },
]

const storeStyles = [
  { name: "Modern", description: "Clean, minimalist design with bold typography" },
  { name: "Classic", description: "Traditional layout with elegant styling" },
  { name: "Trendy", description: "Contemporary design with vibrant colors" },
  { name: "Professional", description: "Corporate-focused with structured layout" },
]

const templates = [
  {
    id: "fashion",
    name: "Fashion Store",
    description: "Perfect for clothing and accessories",
    icon: Shirt,
    category: "Retail",
  },
  {
    id: "electronics",
    name: "Electronics Hub",
    description: "Tech products and gadgets",
    icon: Gamepad2,
    category: "Technology",
  },
  {
    id: "coffee",
    name: "Coffee Shop",
    description: "Food and beverage business",
    icon: Coffee,
    category: "Food & Drink",
  },
  {
    id: "general",
    name: "General Store",
    description: "Multi-category marketplace",
    icon: ShoppingBag,
    category: "General",
  },
]

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    colorScheme: colorSchemes[0],
    style: storeStyles[0],
    template: templates[0],
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    setIsLoading(true)
    // Simulate store creation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/dashboard")
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Let's start with the basics</h2>
              <p className="text-muted-foreground">Tell us about your store</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  placeholder="Enter your store name"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  placeholder="Describe what your store sells..."
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose your color scheme</h2>
              <p className="text-muted-foreground">Pick colors that represent your brand</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {colorSchemes.map((scheme) => (
                <Card
                  key={scheme.name}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    formData.colorScheme.name === scheme.name ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleInputChange("colorScheme", scheme)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: scheme.primary }}></div>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: scheme.secondary }}></div>
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: scheme.accent }}></div>
                      </div>
                      <span className="font-medium">{scheme.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Select your style</h2>
              <p className="text-muted-foreground">Choose the design aesthetic for your store</p>
            </div>

            <div className="space-y-3">
              {storeStyles.map((style) => (
                <Card
                  key={style.name}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    formData.style.name === style.name ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleInputChange("style", style)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{style.name}</h3>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                      <Palette className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose your template</h2>
              <p className="text-muted-foreground">Start with a template designed for your industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      formData.template.id === template.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleInputChange("template", template)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="relative max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Store className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create Your Store</h1>
            <p className="text-muted-foreground">Let's set up your ecommerce store in just a few steps</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="bg-card/50 border-border/40 backdrop-blur-sm">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button onClick={handleFinish} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Creating Store...
                    </>
                  ) : (
                    <>
                      Create Store
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {formData.storeName && (
          <Card className="mt-6 bg-card/30 border-border/40">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
              <CardDescription>Here's how your store will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.storeName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Style:</span>
                  <span className="font-medium">{formData.style.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Colors:</span>
                  <span className="font-medium">{formData.colorScheme.name}</span>
                  <div className="flex space-x-1 ml-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: formData.colorScheme.primary }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: formData.colorScheme.secondary }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Template:</span>
                  <span className="font-medium">{formData.template.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
