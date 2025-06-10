"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, BarChart3, Package, ShoppingCart, Wallet, Settings, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type React from "react"
import { useLanguage } from "@/contexts/language-context"

interface SolutionDetail {
  id: string
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  features: string[]
  imageSrc: string
  imageAlt: string
  images?: { src: string; alt: string; caption?: string }[]
  gradient: string
}

const solutionDetails: SolutionDetail[] = [
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Centralized Dashboard",
    subtitle: "See all your data in one place.",
    description:
      "Get a complete overview of your business with our comprehensive dashboard. Monitor all your products, orders, sales data, and key metrics from a single, intuitive interface that gives you the insights you need to make informed decisions.",
    features: [
      "Real-time sales and performance analytics",
      "Centralized product catalog management",
      "Order tracking across all marketplaces",
      "Revenue insights and customizable reporting",
    ],
    imageSrc: "/images/solutions/ssello_dashboard.png",
    imageAlt: "ssello centralized dashboard showing sales metrics and analytics",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: "products",
    icon: Package,
    title: "Effortless Product Management",
    subtitle: "Add products in one click.",
    description:
      "Simplify your product listing process with our intelligent product management system. Whether you're adding products via ASIN, UPC, EAN, or manual entry, our platform makes it incredibly easy to get your products listed across all marketplaces.",
    features: [
      "One-click product import via ASIN/UPC/EAN",
      "Automated product data enrichment",
      "Bulk product upload and management",
      "Smart product categorization and optimization",
    ],
    imageSrc: "/images/solutions/ssello_product.png",
    imageAlt: "ssello product management interface",
    gradient: "from-green-500 to-teal-600",
    images: [
      {
        src: "/images/solutions/ssello_product.png",
        alt: "Product management dashboard",
        caption: "Easy product listing interface"
      },
      {
        src: "/images/solutions/ssello_productfind.png",
        alt: "Product search and import tool",
        caption: "Search and import products by ASIN/UPC/EAN"
      }
    ]
  },
  {
    id: "orders",
    icon: ShoppingCart,
    title: "Unified Order Management",
    subtitle: "Manage all Latin American orders seamlessly.",
    description:
      "Streamline your order management with our centralized system that consolidates orders from across Latin America into one easy-to-use interface. Track, process, and fulfill orders efficiently while maintaining excellent customer service standards.",
    features: [
      "Centralized order processing from all marketplaces",
      "Real-time order status tracking and updates",
      "Automated order routing and fulfillment",
      "Integrated shipping and logistics coordination",
    ],
    imageSrc: "/images/solutions/ssello_orders.png",
    imageAlt: "ssello order management system showing Latin American orders",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "balance",
    icon: Wallet,
    title: "Comprehensive Balance Management",
    subtitle: "Keep your finances organized in one place.",
    description:
      "Maintain complete control over your financial operations with our integrated balance management system. Track earnings, expenses, payouts, and financial performance across all your marketplaces and regions from a single, comprehensive interface.",
    features: [
      "Real-time balance tracking across all marketplaces",
      "Automated payout scheduling and management",
      "Detailed financial reporting and analytics",
      "Multi-currency balance and transparent fee tracking",
    ],
    imageSrc: "/images/solutions/ssello_balance.png",
    imageAlt: "ssello balance management dashboard showing financial overview",
    gradient: "from-purple-500 to-pink-600"
  },
]

export default function SolutionsPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Platform Solutions
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            The all-in-one{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              ssello
            </span>{" "}
            solution
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Everything you need to scale your business across Latin America's biggest marketplaces - 
            <span className="font-semibold text-foreground"> all in one powerful platform</span>
          </p>
        </div>
      </section>

      {/* Detailed Solutions */}
      {solutionDetails.map((solution, index) => (
        <section
          key={solution.id}
          id={solution.id}
          className="py-12 md:py-16 relative overflow-hidden"
        >
          {/* Background gradient specific to each section */}
          <div className={`absolute inset-0 bg-gradient-to-br ${
            index % 2 === 0 
              ? 'from-slate-50 via-orange-50/30 to-amber-50/50' 
              : 'from-white via-slate-50/50 to-orange-50/30'
          }`}></div>
          
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute ${
              index % 2 === 0 ? 'top-20 left-20' : 'bottom-20 right-20'
            } w-72 h-72 bg-gradient-to-r ${solution.gradient} opacity-10 rounded-full blur-3xl animate-float`}></div>
            <div className={`absolute ${
              index % 2 === 0 ? 'bottom-32 right-32' : 'top-32 left-32'
            } w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000`}></div>
          </div>

          <div className="container relative z-10">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <div className={index % 2 !== 0 ? "lg:order-last" : ""}>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${solution.gradient} text-white text-sm font-semibold shadow-lg`}>
                      <solution.icon className="h-5 w-5 mr-2" />
                      {solution.id.charAt(0).toUpperCase() + solution.id.slice(1)} Solution
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      <span className={`bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                        {solution.title}
                      </span>
                    </h2>
                    <p className="text-xl md:text-2xl font-semibold text-slate-600">{solution.subtitle}</p>
                    <p className="text-lg text-slate-600 leading-relaxed">{solution.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={feature} className={`flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200/30 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in-up delay-${featureIndex * 100}`}>
                        <CheckCircle className={`h-6 w-6 bg-gradient-to-r ${solution.gradient} rounded-full text-white mr-4 flex-shrink-0 mt-0.5`} />
                        <span className="text-slate-600 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    asChild
                  >
                    <Link href={`/contact?subject=Inquiry%20about%20${solution.title}`}>
                      Learn More
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className={index % 2 !== 0 ? "lg:order-first" : ""}>
                {solution.images && solution.images.length > 1 ? (
                  <div className="space-y-8">
                    {solution.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                        <div className="relative">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={700}
                            height={500}
                            className="rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-all duration-500 border border-white/50"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {img.caption && (
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                              <p className="text-sm font-semibold text-slate-700 text-center">
                                {img.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                    <div className="relative">
                      <Image
                        src={solution.imageSrc}
                        alt={solution.imageAlt}
                        width={700}
                        height={500}
                        className="rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-all duration-500 border border-white/50"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Enhanced CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Scale Your Business?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            {t.common.startSellingAcross} {t.common.latinAmerica}
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t.common.joinThousands}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-white/90 text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              asChild
            >
              <Link href="/signup">
                {t.common.startSelling}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-orange-600 hover:bg-white hover:text-orange-600 text-lg px-10 py-6 rounded-2xl font-semibold transition-all duration-300"
              asChild
            >
              <Link href="https://calendly.com/official-ssello" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
