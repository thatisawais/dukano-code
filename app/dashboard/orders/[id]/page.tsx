"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  User,
  Mail,
  Phone,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock order data - in real app this would come from API
const orderData = {
  id: "#3210",
  customer: {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/customer-avatar.png",
  },
  date: "2024-01-20T10:30:00Z",
  status: "completed",
  paymentStatus: "paid",
  fulfillmentStatus: "delivered",
  total: 129.99,
  subtotal: 129.99,
  tax: 10.4,
  shipping: 0,
  discount: 0,
  shippingAddress: {
    name: "Sarah Johnson",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  billingAddress: {
    name: "Sarah Johnson",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  products: [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      quantity: 1,
      price: 99.99,
      image: "/modern-tech-product.png",
    },
    {
      id: "2",
      name: "Premium Phone Case",
      sku: "PPC-003",
      quantity: 1,
      price: 29.99,
      image: "/abstract-product-3.png",
    },
  ],
  timeline: [
    { date: "2024-01-20T10:30:00Z", event: "Order placed", status: "completed" },
    { date: "2024-01-20T11:15:00Z", event: "Payment confirmed", status: "completed" },
    { date: "2024-01-20T14:30:00Z", event: "Order processed", status: "completed" },
    { date: "2024-01-21T09:00:00Z", event: "Shipped", status: "completed" },
    { date: "2024-01-23T16:45:00Z", event: "Delivered", status: "completed" },
  ],
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <RefreshCw className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Truck className="h-3 w-3 mr-1" />
            Shipped
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Order {orderData.id}</h1>
              <p className="text-muted-foreground">
                Placed on {new Date(orderData.date).toLocaleDateString()} at{" "}
                {new Date(orderData.date).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Update Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Items
                  {getStatusBadge(orderData.status)}
                </CardTitle>
                <CardDescription>{orderData.products.length} items in this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-4 border border-border/40 rounded-lg"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(product.price * product.quantity).toFixed(2)} total
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
                <CardDescription>Track the progress of this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={orderData.customer.avatar || "/placeholder.svg"}
                    alt={orderData.customer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{orderData.customer.name}</p>
                    <p className="text-sm text-muted-foreground">Customer since Jan 2024</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {orderData.customer.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {orderData.customer.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${orderData.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{orderData.shipping === 0 ? "Free" : `$${orderData.shipping.toFixed(2)}`}</span>
                  </div>
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${orderData.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{orderData.shippingAddress.name}</p>
                  <p>{orderData.shippingAddress.address1}</p>
                  {orderData.shippingAddress.address2 && <p>{orderData.shippingAddress.address2}</p>}
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                  </p>
                  <p>{orderData.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Fulfillment Status */}
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Fulfillment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select defaultValue={orderData.fulfillmentStatus}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Update Fulfillment</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
