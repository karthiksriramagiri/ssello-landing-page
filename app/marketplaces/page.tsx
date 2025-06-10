"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Globe, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

const marketplaces = [
  {
    id: "amazon-brazil",
    name: "Amazon Brazil",
    logo: "/logos/amazon-brazil.png",
  },
  {
    id: "amazon-mexico", 
    name: "Amazon Mexico",
    logo: "/logos/amazon-mexico.png",
  },
  {
    id: "mercadolibre",
    name: "MercadoLibre",
    logo: "/logos/mercadolibre.png",
  },
  {
    id: "magalu",
    name: "Magazine Luiza", 
    logo: "/logos/magalu.webp",
  },
  {
    id: "coppel",
    name: "Coppel",
    logo: "/logos/coppel.png",
  },
  {
    id: "americanas",
    name: "Americanas",
    logo: "/logos/americanas.png",
  },
  {
    id: "walmart",
    name: "Walmart Mexico",
    logo: "/logos/walmart.png",
  },
  {
    id: "falabella",
    name: "Falabella",
    logo: "/logos/falabella.png",
  },
  {
    id: "casas-bahia",
    name: "Casas Bahia",
    logo: "/logos/casas-bahia.png",
  },
  {
    id: "shopee",
    name: "Shopee",
    logo: "/logos/shopee.png",
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "/logos/liverpool.webp",
  },
  {
    id: "claro-shop", 
    name: "Claro Shop",
    logo: "/logos/claro-shop.png",
  },
  {
    id: "tiktok-shop",
    name: "TikTok Shop",
    logo: "/logos/tiktok-shop.webp",
  }
]

export default function MarketplacesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
            <Globe className="w-4 h-4 mr-2" />
            {t.marketplaceSection.badge}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              {t.common.expandYourReach}
            </span>
            <br />
            <span className="text-slate-900">{t.common.acrossLatinAmerica}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t.marketplaceSection.connectWith}
          </p>
        </div>
      </section>

      {/* Marketplaces Grid */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {marketplaces.map((marketplace, index) => (
              <Link
                key={marketplace.id}
                href={`/marketplaces/${marketplace.id}`}
                className="group block"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200/50 hover:shadow-2xl hover:border-orange-300/50 transition-all duration-500 hover:-translate-y-3 group">
                  {/* Gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="text-center relative z-10">
                    {/* Logo container with enhanced styling */}
                    <div className="relative w-48 h-40 mx-auto mb-6 bg-white/90 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-sm group-hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Image
                        src={marketplace.logo}
                        alt={`${marketplace.name} logo`}
                        width={180}
                        height={120}
                        className={`object-contain relative z-10 ${
                          marketplace.id === 'amazon-brazil' 
                            ? 'w-52 h-36' 
                            : marketplace.id === 'amazon-mexico'
                            ? 'w-48 h-32'
                            : marketplace.id === 'claro-shop'
                            ? 'w-44 h-32'
                            : 'w-36 h-24'
                        }`}
                        sizes="180px"
                      />
                    </div>
                    
                    {/* Marketplace name with enhanced styling */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {marketplace.name}
                    </h3>
                    
                    {/* Enhanced learn more text */}
                    <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold text-sm group-hover:text-amber-600 transition-colors duration-300">
                      <span>{t.common.learnMore}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Bottom Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.common.allInOneSolution}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {t.marketplaceSection.oneSolution}{" "}
              <span className="bg-gradient-to-r from-orange-100 to-amber-100 bg-clip-text text-transparent">
                {t.marketplaceSection.oneSolutionHighlight}
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-orange-100">
                {t.common.readyToExpand}
              </h3>
              <p className="text-xl md:text-2xl text-slate-100 leading-relaxed">
                {t.marketplaceSection.connectWithMillions}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-white/90 text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                asChild
              >
                <Link href="/signup">
                  {t.common.startSelling}
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-orange-600 hover:bg-white hover:text-orange-600 text-lg px-10 py-6 rounded-2xl font-semibold transition-all duration-300"
                asChild
              >
                <Link href="https://calendly.com/official-ssello" target="_blank" rel="noopener noreferrer">
                  {t.common.scheduleCall}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 