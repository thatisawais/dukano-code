"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle,
  Package,
  Plus,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    status: "active",
    sales: 156,
    revenue: 20274.44,
    image: "/modern-tech-product.png",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    sku: "SFW-002",
    category: "Electronics",
    price: 199.99,
    stock: 23,
    status: "active",
    sales: 89,
    revenue: 17799.11,
    image: "/abstract-product-display.png",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Premium Phone Case",
    sku: "PPC-003",
    category: "Accessories",
    price: 24.99,
    stock: 0,
    status: "out_of_stock",
    sales: 234,
    revenue: 5847.66,
    image: "/abstract-product-3.png",
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Ergonomic Laptop Stand",
    sku: "ELS-004",
    category: "Office",
    price: 89.99,
    stock: 67,
    status: "active",
    sales: 67,
    revenue: 6029.33,
    image: "/product-lineup-display.png",
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Wireless Charging Pad",
    sku: "WCP-005",
    category: "Electronics",
    price: 39.99,
    stock: 12,
    status: "low_stock",
    sales: 145,
    revenue: 5798.55,
    image: "/modern-tech-product.png",
    createdAt: "2024-01-03",
  },
]

const categories = [
  { name: "All Products", count: products.length },
  { name: "Electronics", count: products.filter((p) => p.category === "Electronics").length },
  { name: "Accessories", count: products.filter((p) => p.category === "Accessories").length },
  { name: "Office", count: products.filter((p) => p.category === "Office").length },
]

const initialCollections = [
  { id: "c1", name: "New Arrivals", products: ["1", "2", "5"] },
  { id: "c2", name: "Best Sellers", products: ["1", "3"] },
  { id: "c3", name: "Work Essentials", products: ["2", "4"] },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string, stock: number) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
            Active
          </Badge>
        )
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      case "low_stock":
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Low Stock
          </Badge>
        )
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  const getStockIcon = (stock: number) => {
    if (stock === 0) return <AlertCircle className="h-4 w-4 text-red-500" />
    if (stock < 20) return <AlertCircle className="h-4 w-4 text-yellow-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your store inventory and product catalog</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Import Products
            </Button>
            <Button asChild>
              <Link href="/dashboard/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((products.filter((p) => p.status === "active").length / products.length) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter((p) => p.stock < 20).length}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Inventory value</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList>
                    {categories.map((category) => (
                      <TabsTrigger key={category.name} value={category.name} className="text-xs">
                        {category.name} ({category.count})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>
              {filteredProducts.length} of {products.length} products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Created {new Date(product.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">${product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStockIcon(product.stock)}
                        <span>{product.stock}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell className="font-medium">${product.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/${product.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/${product.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Product
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
