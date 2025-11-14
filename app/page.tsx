import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Store, Palette, BarChart3, Users, ShoppingCart, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Dukano</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Log in
              </Link>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              <Zap className="h-4 w-4 mr-1" />
              Now with AI-powered store optimization
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance">
              The complete platform to <span className="text-primary">build the web</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Your team's toolkit to stop configuring and start innovating. Securely build, deploy, and scale the best
              ecommerce experiences with Dukano.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/signup">
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">50+ days</div>
                <div className="text-sm text-muted-foreground">saved on store builds</div>
                <div className="mt-4 text-xs font-medium text-muted-foreground">SHOPIFY</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">98%</div>
                <div className="text-sm text-muted-foreground">faster time to market</div>
                <div className="mt-4 text-xs font-medium text-muted-foreground">WOOCOMMERCE</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">300%</div>
                <div className="text-sm text-muted-foreground">increase in conversions</div>
                <div className="mt-4 text-xs font-medium text-muted-foreground">MAGENTO</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">6x</div>
                <div className="text-sm text-muted-foreground">faster to build + deploy</div>
                <div className="mt-4 text-xs font-medium text-muted-foreground">BIGCOMMERCE</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  <Palette className="h-4 w-4 mr-1" />
                  Customization
                </Badge>
                <h2 className="text-4xl font-bold text-balance">Faster iteration. More innovation.</h2>
                <p className="text-lg text-muted-foreground text-balance">
                  The platform for rapid progress. Let your team focus on shipping features instead of managing
                  infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Product Management</h3>
                    <p className="text-muted-foreground">Complete inventory and catalog management system</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Advanced Analytics</h3>
                    <p className="text-muted-foreground">Real-time insights and performance tracking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Customer Management</h3>
                    <p className="text-muted-foreground">Comprehensive CRM and customer insights</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-card/50 border-border/40 p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Drag & Drop Editor</span>
                    <Badge variant="secondary">Live Preview</Badge>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-16 bg-muted-foreground/10 rounded"></div>
                      <div className="h-16 bg-muted-foreground/10 rounded"></div>
                      <div className="h-16 bg-muted-foreground/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-balance mb-6">
            Make teamwork seamless.{" "}
            <span className="text-muted-foreground">
              Tools for your team and stakeholders to share feedback and iterate faster.
            </span>
          </h2>

          <div className="mt-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Start Building Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Dukano</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 Dukano. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
