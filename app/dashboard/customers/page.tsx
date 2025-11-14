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
  Mail,
  Phone,
  MapPin,
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Download,
  UserPlus,
  Star,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

const customers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/customer-avatar.png",
    location: "New York, NY",
    joinDate: "2024-01-15",
    totalOrders: 8,
    totalSpent: 1247.92,
    lastOrder: "2024-01-20",
    status: "active",
    segment: "vip",
    tags: ["VIP", "Repeat Customer"],
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "/customer-avatar.png",
    location: "Los Angeles, CA",
    joinDate: "2024-01-10",
    totalOrders: 3,
    totalSpent: 456.78,
    lastOrder: "2024-01-18",
    status: "active",
    segment: "regular",
    tags: ["Tech Enthusiast"],
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "/customer-avatar.png",
    location: "Chicago, IL",
    joinDate: "2024-01-08",
    totalOrders: 12,
    totalSpent: 2134.56,
    lastOrder: "2024-01-19",
    status: "active",
    segment: "vip",
    tags: ["VIP", "Fashion"],
  },
  {
    id: "4",
    name: "Alex Wilson",
    email: "alex@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "/customer-avatar.png",
    location: "Miami, FL",
    joinDate: "2024-01-05",
    totalOrders: 1,
    totalSpent: 89.99,
    lastOrder: "2024-01-15",
    status: "active",
    segment: "new",
    tags: ["New Customer"],
  },
  {
    id: "5",
    name: "Lisa Brown",
    email: "lisa@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "/customer-avatar.png",
    location: "Seattle, WA",
    joinDate: "2023-12-20",
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: null,
    status: "inactive",
    segment: "inactive",
    tags: ["Inactive"],
  },
]

const customerSegments = [
  { name: "All Customers", count: customers.length },
  { name: "VIP", count: customers.filter((c) => c.segment === "vip").length },
  { name: "Regular", count: customers.filter((c) => c.segment === "regular").length },
  { name: "New", count: customers.filter((c) => c.segment === "new").length },
  { name: "Inactive", count: customers.filter((c) => c.segment === "inactive").length },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("All Customers")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesSegment = selectedSegment === "All Customers" || customer.segment === selectedSegment.toLowerCase()
    return matchesSearch && matchesSegment
  })

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case "vip":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Star className="h-3 w-3 mr-1" />
            VIP
          </Badge>
        )
      case "regular":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Regular</Badge>
      case "new":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">New</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{segment}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
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
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground">Manage your customer relationships and data</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((customers.filter((c) => c.status === "active").length / customers.length) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Average lifetime value</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repeat Rate</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((customers.filter((c) => c.totalOrders > 1).length / customers.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Customers with 2+ orders</p>
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
                    placeholder="Search customers by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={selectedSegment} onValueChange={setSelectedSegment}>
                  <TabsList>
                    {customerSegments.slice(0, 4).map((segment) => (
                      <TabsTrigger key={segment.name} value={segment.name} className="text-xs">
                        {segment.name} ({segment.count})
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

        {/* Customers Table */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>
              {filteredCustomers.length} of {customers.length} customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={customer.avatar || "/placeholder.svg"}
                          alt={customer.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(customer.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-2" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                        {customer.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getSegmentBadge(customer.segment)}
                        {customer.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {customer.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                    <TableCell className="font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "Never"}
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
                            <Link href={`/dashboard/customers/${customer.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
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
