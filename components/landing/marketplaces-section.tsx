"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const marketplaces = [
  { name: "Amazon Brazil", logo: "/logos/amazon-brazil.png", location: "Brazil" },
  { name: "Amazon Mexico", logo: "/logos/amazon-mexico.png", location: "Mexico" },
  { name: "Americanas", logo: "/logos/americanas.png", location: "Brazil" },
  { name: "Casas Bahia", logo: "/logos/casas-bahia.png", location: "Brazil" },
  { name: "Claro Shop", logo: "/logos/claro-shop.png", location: "LATAM" },
  { name: "Coppel", logo: "/logos/coppel.png", location: "Mexico" },
  { name: "Falabella", logo: "/logos/falabella.png", location: "Chile & Peru" },
  { name: "Liverpool", logo: "/logos/liverpool.webp", location: "Mexico" },
  { name: "Magazine Luiza", logo: "/logos/magalu.webp", location: "Brazil" },
  { name: "MercadoLibre", logo: "/logos/mercadolibre.png", location: "LATAM" },
  { name: "Shopee", logo: "/logos/shopee.png", location: "LATAM" },
  { name: "Walmart", logo: "/logos/walmart.png", location: "Mexico" },
  { name: "TikTok Shop", logo: "/logos/tiktok-shop.webp", location: "LATAM" },
]

export function MarketplacesSection() {
  const { t } = useLanguage()

  return (
    <section id="marketplaces" className="py-16 md:py-24 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 relative overflow-hidden">
      {/* Reduced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl animate-float delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
            <span className="mr-2">🌎</span>
            {t.marketplaceSection.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {t.marketplaceSection.title}{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              {t.marketplaceSection.titleHighlight}
            </span>{" "}
            {t.marketplaceSection.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            {t.marketplaceSection.description}
          </p>
        </div>
        
        {/* Enhanced Infinite Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {marketplaces.map((marketplace, index) => (
              <div key={marketplace.name} className="group relative">
                <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-orange-200/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-400/50">
                  <div className="aspect-square flex items-center justify-center mb-3 sm:mb-4">
                    <Image
                      src={marketplace.logo}
                      alt={`${marketplace.name} logo`}
                      width={120}
                      height={80}
                      className="object-contain transition-all duration-300 group-hover:scale-110 w-16 h-10 sm:w-20 sm:h-12"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                    />
                  </div>
                  <p className="text-center text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors duration-300">
                    {marketplace.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced call to action button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-12 py-6 text-lg rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            asChild
          >
            <Link href="/marketplaces">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold">💰</div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold">📈</div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold">🚀</div>
                </div>
                <span>{t.common.readyToExpandPlatforms}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
