"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const analyticsData = {
  overview: {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    totalOrders: 2350,
    ordersChange: 180.1,
    totalCustomers: 12234,
    customersChange: 19.0,
    conversionRate: 3.2,
    conversionChange: -0.5,
  },
  traffic: {
    totalVisitors: 45678,
    visitorsChange: 12.5,
    pageViews: 123456,
    pageViewsChange: 8.3,
    bounceRate: 42.5,
    bounceRateChange: -2.1,
    avgSessionDuration: "2m 34s",
    sessionChange: 15.2,
  },
  topPages: [
    { page: "/", views: 12345, change: 5.2 },
    { page: "/products", views: 8901, change: 12.1 },
    { page: "/product/wireless-headphones", views: 5432, change: -2.3 },
    { page: "/checkout", views: 3210, change: 8.7 },
    { page: "/about", views: 2109, change: 3.4 },
  ],
  topProducts: [
    { name: "Wireless Headphones", sales: 156, revenue: 15600, change: 12.5 },
    { name: "Smart Watch", sales: 89, revenue: 17800, change: 8.3 },
    { name: "Phone Case", sales: 234, revenue: 4680, change: -5.2 },
    { name: "Laptop Stand", sales: 67, revenue: 6700, change: 15.7 },
  ],
  deviceBreakdown: [
    { device: "Desktop", percentage: 45.2, visitors: 20656 },
    { device: "Mobile", percentage: 38.7, visitors: 17677 },
    { device: "Tablet", percentage: 16.1, visitors: 7345 },
  ],
  trafficSources: [
    { source: "Organic Search", percentage: 42.3, visitors: 19322 },
    { source: "Direct", percentage: 28.1, visitors: 12835 },
    { source: "Social Media", percentage: 15.6, visitors: 7126 },
    { source: "Email", percentage: 8.9, visitors: 4065 },
    { source: "Paid Ads", percentage: 5.1, visitors: 2330 },
  ],
  revenueData: [
    { month: "Jan", revenue: 12450, orders: 245 },
    { month: "Feb", revenue: 18230, orders: 356 },
    { month: "Mar", revenue: 22100, orders: 445 },
    { month: "Apr", revenue: 28900, orders: 578 },
    { month: "May", revenue: 35600, orders: 712 },
    { month: "Jun", revenue: 45231, orders: 890 },
  ],
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")

  const formatChange = (change: number) => {
    const isPositive = change > 0
    return (
      <span className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
        {Math.abs(change)}%
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Track your store performance and customer insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
                  {formatChange(analyticsData.overview.revenueChange)}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.totalOrders.toLocaleString()}</div>
                  {formatChange(analyticsData.overview.ordersChange)}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.totalCustomers.toLocaleString()}</div>
                  {formatChange(analyticsData.overview.customersChange)}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
                  {formatChange(analyticsData.overview.conversionChange)}
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.revenueData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium w-8">{data.month}</span>
                        <Progress value={(data.revenue / 50000) * 100} className="w-48 h-2" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${data.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{data.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best selling products this period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${product.revenue.toLocaleString()}</div>
                        {formatChange(product.change)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            {/* Traffic Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.traffic.totalVisitors.toLocaleString()}</div>
                  {formatChange(analyticsData.traffic.visitorsChange)}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.traffic.pageViews.toLocaleString()}</div>
                  {formatChange(analyticsData.traffic.pageViewsChange)}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.traffic.bounceRate}%</div>
                  {formatChange(analyticsData.traffic.bounceRateChange)}
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.traffic.avgSessionDuration}</div>
                  {formatChange(analyticsData.traffic.sessionChange)}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Breakdown */}
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Traffic by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.deviceBreakdown.map((device, index) => {
                      const Icon =
                        device.device === "Desktop" ? Monitor : device.device === "Mobile" ? Smartphone : Globe
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{device.device}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{device.percentage}%</div>
                            <div className="text-sm text-muted-foreground">{device.visitors.toLocaleString()}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card className="bg-card/50 border-border/40">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{source.source}</p>
                          <Progress value={source.percentage} className="w-32 h-2" />
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{source.percentage}%</div>
                          <div className="text-sm text-muted-foreground">{source.visitors.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Pages */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium font-mono text-sm">{page.page}</p>
                        <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                      </div>
                      <div className="text-right">{formatChange(page.change)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Detailed analytics for your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Product Analytics</h3>
                  <p className="text-muted-foreground">Detailed product performance metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Understanding your customer behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Customer Analytics</h3>
                  <p className="text-muted-foreground">
                    Customer behavior and segmentation analytics will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
