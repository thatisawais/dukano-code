"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Search, Menu, User, X, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Component {
  id: string
  type: string
  name: string
  props: Record<string, any>
  children?: Component[]
}

const demoStoreData = {
  storeName: "TechHub Demo Store",
  storeDescription: "Premium electronics and gadgets",
  logo: "/generic-store-logo.png",
  components: [
    {
      id: "hero-1",
      type: "hero",
      name: "Hero Section",
      props: {
        title: "Welcome to TechHub",
        subtitle: "Discover the latest in technology and innovation",
        buttonText: "Shop Now",
        backgroundImage: "/store-hero-background.jpg",
      },
    },
    {
      id: "product-grid-1",
      type: "product-grid",
      name: "Featured Products",
      props: {
        columns: "4",
        showPrice: true,
        showRating: true,
        products: [
          { name: "Premium Headphones", price: "$299.99", rating: 4.8, image: "/modern-tech-product.png" },
          { name: "Smart Watch Pro", price: "$399.99", rating: 4.9, image: "/abstract-product-display.png" },
          { name: "Wireless Speaker", price: "$149.99", rating: 4.7, image: "/product-lineup-display.png" },
          { name: "Phone Case Elite", price: "$49.99", rating: 4.5, image: "/abstract-product-3.png" },
          { name: "Laptop Stand Pro", price: "$89.99", rating: 4.6, image: "/modern-tech-product.png" },
          { name: "USB-C Hub", price: "$79.99", rating: 4.4, image: "/abstract-product-display.png" },
          { name: "Gaming Mouse", price: "$129.99", rating: 4.8, image: "/product-lineup-display.png" },
          { name: "Webcam 4K", price: "$199.99", rating: 4.7, image: "/abstract-product-3.png" },
        ],
      },
    },
    {
      id: "testimonial-1",
      type: "testimonial",
      name: "Customer Review",
      props: {
        quote: "Incredible selection and lightning-fast shipping! TechHub is my go-to for all tech needs.",
        author: "Alex Thompson",
        rating: 5,
        avatar: "/customer-avatar.png",
      },
    },
  ],
}

export default function DemoStorePage() {
  const [components, setComponents] = useState<Component[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  useEffect(() => {
    setComponents(demoStoreData.components)
  }, [])

  const addToCart = (productName: string) => {
    setCartItems((prev) => prev + 1)
  }

  const toggleWishlist = (productId: string) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const renderStoreComponent = (component: Component) => {
    switch (component.type) {
      case "hero":
        return (
          <div
            key={component.id}
            className="relative min-h-[500px] bg-cover bg-center flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${component.props.backgroundImage})` }}
          >
            <div className="bg-black/60 p-8 rounded-lg text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">{component.props.title}</h1>
              <p className="text-xl mb-8">{component.props.subtitle}</p>
              <Button size="lg" className="px-8 py-3">
                {component.props.buttonText}
              </Button>
            </div>
          </div>
        )

      case "product-grid":
        return (
          <div key={component.id} className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${component.props.columns} gap-6`}>
                {component.props.products.map((product: any, idx: number) => (
                  <Card key={idx} className="group hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleWishlist(`${component.id}-${idx}`)}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            wishlistItems.includes(`${component.id}-${idx}`) && "fill-red-500 text-red-500",
                          )}
                        />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      {component.props.showRating && (
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">({product.rating})</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        {component.props.showPrice && (
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                        )}
                        <Button size="sm" onClick={() => addToCart(product.name)} className="ml-auto">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "testimonial":
        return (
          <div key={component.id} className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <Card className="max-w-2xl mx-auto p-8">
                <div className="flex items-start space-x-6">
                  <img
                    src={component.props.avatar || "/placeholder.svg"}
                    alt={component.props.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < component.props.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg text-muted-foreground italic mb-4">
                      "{component.props.quote}"
                    </blockquote>
                    <cite className="font-semibold text-lg">— {component.props.author}</cite>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Demo Store</Badge>
            <span className="text-sm text-muted-foreground">This is a sample store built with Dukano</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/demo">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Demo
            </Link>
          </Button>
        </div>
      </div>

      {/* Store Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img src={demoStoreData.logo || "/placeholder.svg"} alt={demoStoreData.storeName} className="h-8" />
              <div className="hidden md:block">
                <h1 className="font-bold text-xl">{demoStoreData.storeName}</h1>
                <p className="text-sm text-muted-foreground">{demoStoreData.storeDescription}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-4 w-4" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">{wishlistItems.length}</Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItems > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">{cartItems}</Badge>}
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10" />
                </div>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Store Content */}
      <main>{components.map((component) => renderStoreComponent(component))}</main>

      {/* Store Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{demoStoreData.storeName}</h3>
              <p className="text-sm text-muted-foreground">{demoStoreData.storeDescription}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  Facebook
                </Button>
                <Button variant="ghost" size="sm">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm">
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 {demoStoreData.storeName}. All rights reserved. Built with Dukano.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
