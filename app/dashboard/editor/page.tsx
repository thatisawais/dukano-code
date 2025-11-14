"use client"

import type React from "react"
import Link from "next/link"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Type,
  ImageIcon,
  Square,
  Grid3X3,
  ShoppingCart,
  Star,
  Play,
  Save,
  Eye,
  Undo,
  Redo,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Trash2,
  Move,
  Settings,
  ArrowUp,
  ArrowDown,
  Copy,
  Sparkles,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { cn } from "@/lib/utils"

interface Component {
  id: string
  type: string
  name: string
  props: Record<string, any>
  children?: Component[]
}

interface ComponentType {
  id: string
  name: string
  icon: any
  category: string
  defaultProps: Record<string, any>
}

const componentTypes: ComponentType[] = [
  {
    id: "hero",
    name: "Hero Section",
    icon: Square,
    category: "Layout",
    defaultProps: {
      title: "Welcome to Our Store",
      subtitle: "Discover amazing products",
      buttonText: "Shop Now",
      backgroundImage: "/abstract-hero-background.png",
    },
  },
  {
    id: "text",
    name: "Text Block",
    icon: Type,
    category: "Content",
    defaultProps: {
      content: "Your text content here",
      fontSize: "16",
      textAlign: "left",
      color: "#ffffff",
    },
  },
  {
    id: "image",
    name: "Image",
    icon: ImageIcon,
    category: "Media",
    defaultProps: {
      src: "/modern-tech-product.png",
      alt: "Product image",
      width: "400",
      height: "300",
    },
  },
  {
    id: "product-grid",
    name: "Product Grid",
    icon: Grid3X3,
    category: "Ecommerce",
    defaultProps: {
      columns: "3",
      showPrice: true,
      showRating: true,
      products: [
        { name: "Product 1", price: "$29.99", rating: 4.5, image: "/abstract-product-display.png" },
        { name: "Product 2", price: "$39.99", rating: 4.8, image: "/product-lineup-display.png" },
        { name: "Product 3", price: "$19.99", rating: 4.2, image: "/abstract-product-3.png" },
      ],
    },
  },
  {
    id: "button",
    name: "Button",
    icon: ShoppingCart,
    category: "Interactive",
    defaultProps: {
      text: "Click Me",
      variant: "default",
      size: "default",
      link: "#",
    },
  },
  {
    id: "testimonial",
    name: "Testimonial",
    icon: Star,
    category: "Social Proof",
    defaultProps: {
      quote: "This product changed my life!",
      author: "Happy Customer",
      rating: 5,
      avatar: "/customer-avatar.png",
    },
  },
  {
    id: "video",
    name: "Video",
    icon: Play,
    category: "Media",
    defaultProps: {
      src: "https://example.com/video.mp4",
      poster: "/video-thumbnail.png",
      autoplay: false,
    },
  },
]

const categories = Array.from(new Set(componentTypes.map((c) => c.category)))

export default function EditorPage() {
  const [components, setComponents] = useState<Component[]>([
    {
      id: "hero-1",
      type: "hero",
      name: "Hero Section",
      props: {
        title: "Welcome to My Store",
        subtitle: "Discover amazing products at great prices",
        buttonText: "Shop Now",
        backgroundImage: "/store-hero-background.jpg",
      },
    },
  ])
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isDragging, setIsDragging] = useState(false)
  const [draggedType, setDraggedType] = useState<string | null>(null)
  const [history, setHistory] = useState<Component[][]>([components])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const saveToHistory = useCallback(
    (newComponents: Component[]) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push([...newComponents])
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    },
    [history, historyIndex],
  )

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setComponents([...history[historyIndex - 1]])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setComponents([...history[historyIndex + 1]])
    }
  }

  const handleDragStart = (componentType: ComponentType) => {
    setIsDragging(true)
    setDraggedType(componentType.id)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedType(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedType) {
      const componentType = componentTypes.find((c) => c.id === draggedType)
      if (componentType) {
        const newComponent: Component = {
          id: `${componentType.id}-${Date.now()}`,
          type: componentType.id,
          name: componentType.name,
          props: { ...componentType.defaultProps },
        }
        const newComponents = [...components, newComponent]
        setComponents(newComponents)
        saveToHistory(newComponents)
        setSelectedComponent(newComponent)
      }
    }
    handleDragEnd()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const updateComponentProps = (componentId: string, newProps: Record<string, any>) => {
    const newComponents = components.map((comp) =>
      comp.id === componentId ? { ...comp, props: { ...comp.props, ...newProps } } : comp,
    )
    setComponents(newComponents)
    // Don't save to history on every keystroke, only on blur or significant changes
  }

  const saveComponentPropsToHistory = (componentId: string, newProps: Record<string, any>) => {
    const newComponents = components.map((comp) =>
      comp.id === componentId ? { ...comp, props: { ...comp.props, ...newProps } } : comp,
    )
    setComponents(newComponents)
    saveToHistory(newComponents)
  }

  const deleteComponent = (componentId: string) => {
    const newComponents = components.filter((comp) => comp.id !== componentId)
    setComponents(newComponents)
    saveToHistory(newComponents)
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null)
    }
  }

  const moveComponent = (componentId: string, direction: "up" | "down") => {
    const currentIndex = components.findIndex((comp) => comp.id === componentId)
    if (currentIndex === -1) return

    const newComponents = [...components]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (targetIndex >= 0 && targetIndex < components.length) {
      ;[newComponents[currentIndex], newComponents[targetIndex]] = [
        newComponents[targetIndex],
        newComponents[currentIndex],
      ]
      setComponents(newComponents)
      saveToHistory(newComponents)
    }
  }

  const duplicateComponent = (componentId: string) => {
    const componentToDuplicate = components.find((comp) => comp.id === componentId)
    if (componentToDuplicate) {
      const newComponent: Component = {
        ...componentToDuplicate,
        id: `${componentToDuplicate.type}-${Date.now()}`,
        name: `${componentToDuplicate.name} Copy`,
      }
      const componentIndex = components.findIndex((comp) => comp.id === componentId)
      const newComponents = [
        ...components.slice(0, componentIndex + 1),
        newComponent,
        ...components.slice(componentIndex + 1),
      ]
      setComponents(newComponents)
      saveToHistory(newComponents)
      setSelectedComponent(newComponent)
    }
  }

  const renderComponent = (component: Component, index: number) => {
    const isSelected = selectedComponent?.id === component.id

    switch (component.type) {
      case "hero":
        return (
          <div
            key={component.id}
            className={cn(
              "relative min-h-[300px] bg-cover bg-center flex items-center justify-center text-center p-8 rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            style={{ backgroundImage: `url(${component.props.backgroundImage})` }}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <div className="bg-black/50 p-6 rounded-lg text-white">
              <h1 className="text-4xl font-bold mb-4">{component.props.title}</h1>
              <p className="text-xl mb-6">{component.props.subtitle}</p>
              <Button>{component.props.buttonText}</Button>
            </div>
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      case "text":
        return (
          <div
            key={component.id}
            className={cn(
              "relative p-4 rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <p
              style={{
                fontSize: `${component.props.fontSize}px`,
                textAlign: component.props.textAlign,
                color: component.props.color,
              }}
            >
              {component.props.content}
            </p>
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      case "image":
        return (
          <div
            key={component.id}
            className={cn(
              "relative rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <img
              src={component.props.src || "/placeholder.svg"}
              alt={component.props.alt}
              width={component.props.width}
              height={component.props.height}
              className="rounded-lg object-cover"
            />
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      case "product-grid":
        return (
          <div
            key={component.id}
            className={cn(
              "relative p-4 rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <div className={`grid grid-cols-${component.props.columns} gap-4`}>
              {component.props.products.map((product: any, idx: number) => (
                <div key={idx} className="bg-card border rounded-lg p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                  {component.props.showPrice && <p className="text-primary font-bold">{product.price}</p>}
                  {component.props.showRating && (
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      case "button":
        return (
          <div
            key={component.id}
            className={cn(
              "relative p-4 rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <Button variant={component.props.variant} size={component.props.size} asChild>
              <a href={component.props.link}>{component.props.text}</a>
            </Button>
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      case "testimonial":
        return (
          <div
            key={component.id}
            className={cn(
              "relative p-6 bg-card border rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={component.props.avatar || "/placeholder.svg"}
                alt={component.props.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < component.props.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic mb-2">"{component.props.quote}"</blockquote>
                <cite className="font-semibold">— {component.props.author}</cite>
              </div>
            </div>
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      case "video":
        return (
          <div
            key={component.id}
            className={cn(
              "relative rounded-lg cursor-pointer transition-all",
              isSelected && "ring-2 ring-primary",
              !isPreviewMode && "hover:ring-1 hover:ring-primary/50",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <video
              src={component.props.src}
              poster={component.props.poster}
              autoPlay={component.props.autoplay}
              controls
              className="w-full rounded-lg"
            />
            {isSelected && !isPreviewMode && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "up")
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveComponent(component.id, "down")
                  }}
                  disabled={index === components.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateComponent(component.id)
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteComponent(component.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div
            key={component.id}
            className={cn(
              "p-4 border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer",
              isSelected && "ring-2 ring-primary",
            )}
            onClick={() => !isPreviewMode && setSelectedComponent(component)}
          >
            <p className="text-muted-foreground">Unknown component: {component.type}</p>
          </div>
        )
    }
  }

  const renderPropertyPanel = () => {
    if (!selectedComponent) {
      return (
        <div className="text-center text-muted-foreground py-8">
          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a component to edit its properties</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{selectedComponent.name}</h3>
          <Badge variant="secondary">{selectedComponent.type}</Badge>
        </div>

        <Separator />

        {selectedComponent.type === "hero" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={selectedComponent.props.title}
                onChange={(e) => updateComponentProps(selectedComponent.id, { title: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={selectedComponent.props.subtitle}
                onChange={(e) => updateComponentProps(selectedComponent.id, { subtitle: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { subtitle: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={selectedComponent.props.buttonText}
                onChange={(e) => updateComponentProps(selectedComponent.id, { buttonText: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { buttonText: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={selectedComponent.props.backgroundImage}
                onChange={(e) => updateComponentProps(selectedComponent.id, { backgroundImage: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { backgroundImage: e.target.value })}
              />
            </div>
          </div>
        )}

        {selectedComponent.type === "text" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={selectedComponent.props.content}
                onChange={(e) => updateComponentProps(selectedComponent.id, { content: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { content: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size (px)</Label>
              <Input
                id="fontSize"
                type="number"
                value={selectedComponent.props.fontSize}
                onChange={(e) => updateComponentProps(selectedComponent.id, { fontSize: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { fontSize: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="textAlign">Text Alignment</Label>
              <Select
                value={selectedComponent.props.textAlign}
                onValueChange={(value) => {
                  updateComponentProps(selectedComponent.id, { textAlign: value })
                  saveComponentPropsToHistory(selectedComponent.id, { textAlign: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="color">Text Color</Label>
              <Input
                id="color"
                type="color"
                value={selectedComponent.props.color}
                onChange={(e) => updateComponentProps(selectedComponent.id, { color: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { color: e.target.value })}
              />
            </div>
          </div>
        )}

        {selectedComponent.type === "image" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={selectedComponent.props.src}
                onChange={(e) => updateComponentProps(selectedComponent.id, { src: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { src: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={selectedComponent.props.alt}
                onChange={(e) => updateComponentProps(selectedComponent.id, { alt: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { alt: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={selectedComponent.props.width}
                  onChange={(e) => updateComponentProps(selectedComponent.id, { width: e.target.value })}
                  onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { width: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={selectedComponent.props.height}
                  onChange={(e) => updateComponentProps(selectedComponent.id, { height: e.target.value })}
                  onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { height: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {selectedComponent.type === "product-grid" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="columns">Columns</Label>
              <Select
                value={selectedComponent.props.columns}
                onValueChange={(value) => {
                  updateComponentProps(selectedComponent.id, { columns: value })
                  saveComponentPropsToHistory(selectedComponent.id, { columns: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showPrice"
                checked={selectedComponent.props.showPrice}
                onCheckedChange={(checked) => {
                  updateComponentProps(selectedComponent.id, { showPrice: checked })
                  saveComponentPropsToHistory(selectedComponent.id, { showPrice: checked })
                }}
              />
              <Label htmlFor="showPrice">Show Prices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showRating"
                checked={selectedComponent.props.showRating}
                onCheckedChange={(checked) => {
                  updateComponentProps(selectedComponent.id, { showRating: checked })
                  saveComponentPropsToHistory(selectedComponent.id, { showRating: checked })
                }}
              />
              <Label htmlFor="showRating">Show Ratings</Label>
            </div>
          </div>
        )}

        {selectedComponent.type === "button" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Button Text</Label>
              <Input
                id="text"
                value={selectedComponent.props.text}
                onChange={(e) => updateComponentProps(selectedComponent.id, { text: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="variant">Style</Label>
              <Select
                value={selectedComponent.props.variant}
                onValueChange={(value) => {
                  updateComponentProps(selectedComponent.id, { variant: value })
                  saveComponentPropsToHistory(selectedComponent.id, { variant: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size">Size</Label>
              <Select
                value={selectedComponent.props.size}
                onValueChange={(value) => {
                  updateComponentProps(selectedComponent.id, { size: value })
                  saveComponentPropsToHistory(selectedComponent.id, { size: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="icon">Icon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="link">Link URL</Label>
              <Input
                id="link"
                value={selectedComponent.props.link}
                onChange={(e) => updateComponentProps(selectedComponent.id, { link: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { link: e.target.value })}
              />
            </div>
          </div>
        )}

        {selectedComponent.type === "testimonial" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                value={selectedComponent.props.quote}
                onChange={(e) => updateComponentProps(selectedComponent.id, { quote: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { quote: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={selectedComponent.props.author}
                onChange={(e) => updateComponentProps(selectedComponent.id, { author: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { author: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={selectedComponent.props.rating}
                onChange={(e) =>
                  updateComponentProps(selectedComponent.id, { rating: Number.parseInt(e.target.value) })
                }
                onBlur={(e) =>
                  saveComponentPropsToHistory(selectedComponent.id, { rating: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={selectedComponent.props.avatar}
                onChange={(e) => updateComponentProps(selectedComponent.id, { avatar: e.target.value })}
                onBlur={(e) => saveComponentPropsToHistory(selectedComponent.id, { avatar: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Editor Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Store Editor</h1>
            <p className="text-muted-foreground">Drag and drop components to build your store</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/ai-shuffler">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Shuffler
                </Link>
              </Button>
            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? "Exit Preview" : "Preview"}
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/store/user123">
                <Eye className="h-4 w-4 mr-2" />
                View Store
              </Link>
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Component Palette - Hidden in preview mode */}
          {!isPreviewMode && (
            <Card className="w-80 bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Components
                </CardTitle>
                <CardDescription>Drag components to the canvas</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={categories[0]} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    {categories.slice(0, 3).map((category) => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-3 mt-2">
                    {categories.slice(3, 6).map((category) => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {categories.map((category) => (
                    <TabsContent key={category} value={category} className="space-y-2 mt-4">
                      {componentTypes
                        .filter((comp) => comp.category === category)
                        .map((componentType) => {
                          const IconComponent = componentType.icon
                          return (
                            <div
                              key={componentType.id}
                              draggable
                              onDragStart={() => handleDragStart(componentType)}
                              onDragEnd={handleDragEnd}
                              className="flex items-center space-x-3 p-3 rounded-lg border border-border/40 cursor-grab hover:bg-muted/50 transition-colors active:cursor-grabbing"
                            >
                              <IconComponent className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm font-medium">{componentType.name}</span>
                            </div>
                          )
                        })}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Canvas */}
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 bg-card/50 border-border/40">
              <CardContent className="p-0 h-full">
                <div
                  ref={canvasRef}
                  className={cn(
                    "h-full overflow-auto p-6 space-y-4",
                    isDragging && "bg-muted/20 border-2 border-dashed border-primary",
                    isPreviewMode && "bg-background",
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    maxWidth: viewMode === "mobile" ? "375px" : viewMode === "tablet" ? "768px" : "100%",
                    margin: viewMode !== "desktop" ? "0 auto" : "0",
                  }}
                >
                  {components.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto">
                          <Move className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Start Building Your Store</h3>
                          <p className="text-muted-foreground text-sm">
                            Drag components from the left panel to start designing your store
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    components.map((component, index) => renderComponent(component, index))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel - Hidden in preview mode */}
          {!isPreviewMode && (
            <Card className="w-80 bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Properties
                </CardTitle>
                <CardDescription>Edit component properties</CardDescription>
              </CardHeader>
              <CardContent>{renderPropertyPanel()}</CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
