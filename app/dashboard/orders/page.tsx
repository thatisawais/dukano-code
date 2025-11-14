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
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

const orders = [
  {
    id: "#3210",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/customer-avatar.png",
    },
    date: "2024-01-20T10:30:00Z",
    status: "completed",
    paymentStatus: "paid",
    fulfillmentStatus: "delivered",
    total: 129.99,
    items: 2,
    shippingAddress: "123 Main St, New York, NY 10001",
    products: [
      { name: "Wireless Headphones", quantity: 1, price: 99.99 },
      { name: "Phone Case", quantity: 1, price: 29.99 },
    ],
  },
  {
    id: "#3209",
    customer: {
      name: "Mike Chen",
      email: "mike@example.com",
      avatar: "/customer-avatar.png",
    },
    date: "2024-01-20T08:15:00Z",
    status: "processing",
    paymentStatus: "paid",
    fulfillmentStatus: "processing",
    total: 89.5,
    items: 1,
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    products: [{ name: "Smart Watch", quantity: 1, price: 89.5 }],
  },
  {
    id: "#3208",
    customer: {
      name: "Emma Davis",
      email: "emma@example.com",
      avatar: "/customer-avatar.png",
    },
    date: "2024-01-19T16:45:00Z",
    status: "shipped",
    paymentStatus: "paid",
    fulfillmentStatus: "shipped",
    total: 199.99,
    items: 1,
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    products: [{ name: "Laptop Stand", quantity: 1, price: 199.99 }],
  },
  {
    id: "#3207",
    customer: {
      name: "Alex Wilson",
      email: "alex@example.com",
      avatar: "/customer-avatar.png",
    },
    date: "2024-01-19T14:20:00Z",
    status: "pending",
    paymentStatus: "pending",
    fulfillmentStatus: "pending",
    total: 45.0,
    items: 3,
    shippingAddress: "321 Elm St, Miami, FL 33101",
    products: [
      { name: "Phone Case", quantity: 2, price: 29.99 },
      { name: "Screen Protector", quantity: 1, price: 15.0 },
    ],
  },
  {
    id: "#3206",
    customer: {
      name: "Lisa Brown",
      email: "lisa@example.com",
      avatar: "/customer-avatar.png",
    },
    date: "2024-01-18T11:30:00Z",
    status: "cancelled",
    paymentStatus: "refunded",
    fulfillmentStatus: "cancelled",
    total: 75.99,
    items: 1,
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
    products: [{ name: "Wireless Charger", quantity: 1, price: 75.99 }],
  },
]

const orderStatuses = [
  { name: "All Orders", count: orders.length },
  { name: "Pending", count: orders.filter((o) => o.status === "pending").length },
  { name: "Processing", count: orders.filter((o) => o.status === "processing").length },
  { name: "Shipped", count: orders.filter((o) => o.status === "shipped").length },
  { name: "Completed", count: orders.filter((o) => o.status === "completed").length },
  { name: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Orders")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Orders" || order.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <RefreshCw className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Truck className="h-3 w-3 mr-1" />
            Shipped
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
      case "refunded":
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Manage and track your store orders</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total order value</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(orders.reduce((sum, o) => sum + o.total, 0) / orders.length).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Per order average</p>
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
                    placeholder="Search orders by ID, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                  <TabsList>
                    {orderStatuses.slice(0, 4).map((status) => (
                      <TabsTrigger key={status.name} value={status.name} className="text-xs">
                        {status.name} ({status.count})
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

        {/* Orders Table */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              {filteredOrders.length} of {orders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.customer.avatar || "/placeholder.svg"}
                          alt={order.customer.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(order.date).toLocaleDateString()}
                        <div className="text-xs text-muted-foreground">{new Date(order.date).toLocaleTimeString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
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
                            <Link href={`/dashboard/orders/${order.id.replace("#", "")}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Update Fulfillment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Invoice
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
