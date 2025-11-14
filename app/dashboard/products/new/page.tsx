"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function NewProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    category: "",
    price: "",
    comparePrice: "",
    costPrice: "",
    trackQuantity: true,
    quantity: "",
    lowStockThreshold: "10",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    seoTitle: "",
    seoDescription: "",
    tags: [] as string[],
    images: [] as string[],
    variants: [] as any[],
    status: "draft",
  })
  const [currentTag, setCurrentTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setProductData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }))
    } else {
      setProductData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !productData.tags.includes(currentTag.trim())) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSave = async (status: "draft" | "active") => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save to your backend here
    console.log("Saving product:", { ...productData, status })

    router.push("/dashboard/products")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Add New Product</h1>
              <p className="text-muted-foreground">Create a new product for your store</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave("active")} disabled={isLoading}>
              <Eye className="h-4 w-4 mr-2" />
              {isLoading ? "Publishing..." : "Publish Product"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Basic details about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={productData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed product description"
                    rows={4}
                    value={productData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Brief product summary"
                    rows={2}
                    value={productData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload images of your product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set your product pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={productData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="comparePrice">Compare at Price</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      placeholder="0.00"
                      value={productData.comparePrice}
                      onChange={(e) => handleInputChange("comparePrice", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="costPrice">Cost per Item</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      placeholder="0.00"
                      value={productData.costPrice}
                      onChange={(e) => handleInputChange("costPrice", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>Manage stock and inventory tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trackQuantity">Track Quantity</Label>
                    <p className="text-sm text-muted-foreground">Enable inventory tracking for this product</p>
                  </div>
                  <Switch
                    id="trackQuantity"
                    checked={productData.trackQuantity}
                    onCheckedChange={(checked) => handleInputChange("trackQuantity", checked)}
                  />
                </div>

                {productData.trackQuantity && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        value={productData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                      <Input
                        id="lowStockThreshold"
                        type="number"
                        placeholder="10"
                        value={productData.lowStockThreshold}
                        onChange={(e) => handleInputChange("lowStockThreshold", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>Physical properties for shipping calculations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="0.0"
                      value={productData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="0"
                      value={productData.dimensions.length}
                      onChange={(e) => handleInputChange("dimensions.length", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="0"
                      value={productData.dimensions.width}
                      onChange={(e) => handleInputChange("dimensions.width", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="0"
                      value={productData.dimensions.height}
                      onChange={(e) => handleInputChange("dimensions.height", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Search Engine Optimization</CardTitle>
                <CardDescription>Improve your product's search visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    placeholder="Product SEO title"
                    value={productData.seoTitle}
                    onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    placeholder="Product SEO description"
                    rows={3}
                    value={productData.seoDescription}
                    onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Status */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={productData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Product Organization */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Product Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={productData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="Product SKU"
                    value={productData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {productData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {productData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
