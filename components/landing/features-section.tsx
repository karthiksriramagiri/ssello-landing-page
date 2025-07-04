"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Globe, BarChart3, Shield, Sparkles, MapPin, Package, Building, DollarSign, Users, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const allMarketplaceLogos = [
  { src: "/logos/amazon-us.png", name: "Amazon US" },
  { src: "/logos/walmart-us.png", name: "Walmart US" },
  { src: "/logos/amazon-brazil.png", name: "Amazon Brazil" },
  { src: "/logos/amazon-mexico.png", name: "Amazon Mexico" },
  { src: "/logos/americanas.png", name: "Americanas" },
  { src: "/logos/casas-bahia.png", name: "Casas Bahia" },
  { src: "/logos/claro-shop.png", name: "Claro Shop" },
  { src: "/logos/coppel.png", name: "Coppel" },
  { src: "/logos/falabella.png", name: "Falabella" },
  { src: "/logos/liverpool.webp", name: "Liverpool" },
  { src: "/logos/magalu.webp", name: "Magazine Luiza" },
  { src: "/logos/mercadolibre.png", name: "MercadoLibre" },
  { src: "/logos/shopee.png", name: "Shopee" },
  { src: "/logos/walmart.png", name: "Walmart Mexico" },
  { src: "/logos/tiktok-shop.webp", name: "TikTok Shop" },
]

const barriers = [
  {
    icon: MapPin,
    title: "International Customs & Duties",
    description: "Complex customs regulations, duty calculations, and import/export requirements"
  },
  {
    icon: Package,
    title: "Shipping & Logistics",
    description: "International delivery, reliable partners, cross-border returns management"
  },
  {
    icon: Building,
    title: "Entity Formation & Legal",
    description: "Business registration, tax obligations, and legal compliance requirements"
  },
  {
    icon: DollarSign,
    title: "Payment Processing",
    description: "Local payment setup, currency management, and financial regulations"
  },
  {
    icon: Users,
    title: "Language & Cultural Barriers",
    description: "Local communication and understanding regional buying behaviors"
  },
  {
    icon: TrendingUp,
    title: "Marketplace Requirements",
    description: "Platform-specific rules, requirements, and optimization strategies"
  },
]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-to-br from-orange-50 via-amber-50/50 to-white relative overflow-hidden">
      {/* Reduced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl animate-float delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.features.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {t.features.title}{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              {t.features.titleHighlight}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            {t.features.description}
          </p>
        </div>

        <div className="space-y-24 md:space-y-28">
          {/* Section 1: Maximize your exposure */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8 lg:pl-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-semibold shadow-lg">
                  <Globe className="h-5 w-5 mr-2" />
                  {t.features.section1.badge}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                    {t.features.section1.title}
                  </span>{" "}
                  {t.features.section1.subtitle}
                </h3>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                  {t.features.section1.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-2">{t.features.section1.stat1}</div>
                  <div className="text-sm text-slate-600 font-medium">{t.features.section1.stat1Label}</div>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">{t.features.section1.stat2}</div>
                  <div className="text-sm text-slate-600 font-medium">{t.features.section1.stat2Label}</div>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-full shadow-2xl hover:scale-105 transition-all duration-500 w-96 h-96 flex items-center justify-center">
                  <Image
                    src="/images/features/globe-latam.png"
                    alt="Latin America market opportunities"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain animate-float"
                    sizes="400px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Focus on Selling - We Handle the Rest */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold shadow-lg">
                  <Shield className="h-5 w-5 mr-2" />
                  {t.features.section2.focusBadge}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                    {t.features.section2.shipToUs}
                  </span>{" "}
                  {t.features.section2.weHandleRest}
                </h3>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                  {t.features.section2.shipToUsDescription}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barriers.map((barrier, index) => (
                  <div key={barrier.title} className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <barrier.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{barrier.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{barrier.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:order-1 relative">
              <div className="relative group">
                <Image
                  src="/images/features/workers.png"
                  alt="Team working on logistics and shipping"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain hover:scale-105 transition-all duration-500 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Section 3: All-in-one dashboard */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-semibold shadow-lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  {t.features.section3.badge}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                    {t.features.section3.title}
                  </span>{" "}
                  {t.features.section3.subtitle}
                </h3>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                  {t.features.section3.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">📈</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-700">{t.features.section3.analytics}</span>
                  </div>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">📦</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-700">{t.features.section3.inventory}</span>
                  </div>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">💰</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-700">{t.features.section3.payments}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Dashboard stack with mobile optimization */}
                <div className="relative">
                  {/* Main dashboard (back) */}
                  <div className="relative transform rotate-1 sm:rotate-2 hover:rotate-1 transition-all duration-500">
                    <Image
                      src="/images/features/main-dashboard.png"
                      alt="Main dashboard interface"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-2xl shadow-2xl border border-white/50"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Products page (middle) - adjusted for mobile */}
                  <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 transform -rotate-1 hover:rotate-0 transition-all duration-500 z-10">
                    <Image
                      src="/images/features/products-dashboard.png"
                      alt="Products page interface"
                      width={450}
                      height={300}
                      className="w-2/3 sm:w-3/4 h-auto rounded-2xl shadow-xl border border-white/50 hover:scale-105 transition-all duration-300"
                      sizes="(max-width: 768px) 67vw, 37.5vw"
                    />
                  </div>
                  
                  {/* Balance page (front) - adjusted for mobile */}
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 transform rotate-2 sm:rotate-3 hover:rotate-1 transition-all duration-500 z-20">
                    <Image
                      src="/images/features/balance-dashboard.png"
                      alt="Balance page interface"
                      width={350}
                      height={250}
                      className="w-1/2 sm:w-3/5 h-auto rounded-2xl shadow-xl border border-white/50 hover:scale-110 transition-all duration-300"
                      sizes="(max-width: 768px) 50vw, 30vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
