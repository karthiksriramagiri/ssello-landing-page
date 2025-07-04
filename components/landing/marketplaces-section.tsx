"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const marketplaces = [
  { name: "Amazon US", logo: "/logos/amazon-us.png", location: "United States" },
  { name: "Walmart US", logo: "/logos/walmart-us.png", location: "United States" },
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
  { name: "Walmart Mexico", logo: "/logos/walmart.png", location: "Mexico" },
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
        
        {/* Infinite Carousel */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          {/* Duplicated marketplace logos for seamless infinite scroll */}
          <div className="flex animate-scroll-infinite">
            {/* First set of logos */}
            {[...marketplaces, ...marketplaces].map((marketplace, index) => (
              <div key={`${marketplace.name}-${index}`} className="group relative flex-shrink-0 mx-2 sm:mx-3 w-32 sm:w-36">
                <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-md border border-orange-200/30 hover:shadow-xl transition-all duration-300 -translate-y-1 hover:-translate-y-2 hover:border-orange-400/50">
                  <div className="flex items-center justify-center mb-1 sm:mb-2 h-16 sm:h-20">
                    <Image
                      src={marketplace.logo}
                      alt={`${marketplace.name} logo`}
                      width={100}
                      height={75}
                      className="object-contain transition-all duration-300 group-hover:scale-105 max-w-full max-h-full w-20 h-15 sm:w-24 sm:h-18"
                      sizes="(max-width: 640px) 80px, 100px"
                    />
                  </div>
                  <div className="pb-1 sm:pb-2">
                    <p className="text-center text-xs sm:text-sm font-medium text-slate-700 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                      {marketplace.name}
                    </p>
                    <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-0.5">
                      {marketplace.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fade-out effects */}
          <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-orange-50/30 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-orange-50/30 to-transparent z-10"></div>
        </div>
        
        {/* Enhanced call to action button */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 sm:px-12 py-3 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
            asChild
          >
            <Link href="/signup">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="hidden sm:flex -space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">💰</div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">📈</div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">🚀</div>
                </div>
                <span className="text-center">{t.common.readyToExpandPlatforms}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
