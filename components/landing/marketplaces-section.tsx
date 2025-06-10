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
        <div className="relative">
          {/* Enhanced gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-orange-50/30 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-orange-50/30 to-transparent z-10 pointer-events-none"></div>
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll-infinite">
              {/* First set of logos */}
              {marketplaces.map((market, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-8 group"
                >
                  <div className="w-48 h-28 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/30 flex items-center justify-center p-4 hover:scale-105 hover:shadow-xl transition-all duration-500 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={market.logo}
                      alt={`${market.name} logo`}
                      width={180}
                      height={90}
                      className="object-contain w-full h-full filter grayscale-0 group-hover:brightness-110 transition-all duration-300 relative z-10"
                      sizes="180px"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors duration-300">{market.name}</p>
                    <p className="text-xs text-slate-500">{market.location}</p>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless infinite scroll */}
              {marketplaces.map((market, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 group"
                >
                  <div className="w-48 h-28 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/30 flex items-center justify-center p-4 hover:scale-105 hover:shadow-xl transition-all duration-500 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={market.logo}
                      alt={`${market.name} logo`}
                      width={180}
                      height={90}
                      className="object-contain w-full h-full filter grayscale-0 group-hover:brightness-110 transition-all duration-300 relative z-10"
                      sizes="180px"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-orange-600 transition-colors duration-300">{market.name}</p>
                    <p className="text-xs text-slate-500">{market.location}</p>
                  </div>
                </div>
              ))}
            </div>
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
