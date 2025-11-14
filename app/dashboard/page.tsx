"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit3,
  Plus,
  ArrowUpRight,
  DollarSign,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

const recentOrders = [
  { id: "#3210", customer: "Sarah Johnson", amount: "$129.99", status: "completed", date: "2 hours ago" },
  { id: "#3209", customer: "Mike Chen", amount: "$89.50", status: "processing", date: "4 hours ago" },
  { id: "#3208", customer: "Emma Davis", amount: "$199.99", status: "shipped", date: "6 hours ago" },
  { id: "#3207", customer: "Alex Wilson", amount: "$45.00", status: "pending", date: "8 hours ago" },
]

const topProducts = [
  { name: "Wireless Headphones", sales: 156, revenue: "$15,600", trend: "up" },
  { name: "Smart Watch", sales: 89, revenue: "$17,800", trend: "up" },
  { name: "Phone Case", sales: 234, revenue: "$4,680", trend: "down" },
  { name: "Laptop Stand", sales: 67, revenue: "$6,700", trend: "up" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/store/user123">
                <Eye className="h-4 w-4 mr-2" />
                Preview Store
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/editor">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Store
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +201 since last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Revenue Overview
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Your revenue performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">January</span>
                  <span className="text-sm font-medium">$12,450</span>
                </div>
                <Progress value={65} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">February</span>
                  <span className="text-sm font-medium">$18,230</span>
                </div>
                <Progress value={85} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">March</span>
                  <span className="text-sm font-medium">$22,100</span>
                </div>
                <Progress value={95} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">April</span>
                  <span className="text-sm font-medium">$28,900</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Orders
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/orders">
                    View All <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{order.id}</span>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "secondary"
                                : order.status === "shipped"
                                  ? "outline"
                                  : "destructive"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Top Products
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/products">
                    View All <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>Your best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{product.revenue}</span>
                      {product.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/products/new">
                    <Plus className="h-5 w-5" />
                    <span className="text-sm">Add Product</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/orders">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-sm">View Orders</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/customers">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Customers</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/analytics">
                    <Activity className="h-5 w-5" />
                    <span className="text-sm">Analytics</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Store Status */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Store Status
              <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                Live
              </Badge>
            </CardTitle>
            <CardDescription>Your store is live and accepting orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Domain Connected</span>
                </div>
                <p className="text-xs text-muted-foreground">mystore.Dukano.com</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">SSL Certificate</span>
                </div>
                <p className="text-xs text-muted-foreground">Secure connection active</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Payment Setup</span>
                </div>
                <p className="text-xs text-muted-foreground">Configure payment methods</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
