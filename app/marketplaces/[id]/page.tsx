"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Users, TrendingUp, Globe, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { getCalendlyUrl } from "@/lib/calendly"

const marketplacesData = {
  "amazon-brazil": {
    name: "Amazon Brazil",
    logo: "/logos/amazon-brazil.png",
    description: "As the fastest-growing Amazon market globally, it receives +150m monthly visits.",
    fullDescription: "Amazon Brazil has become the fastest-growing Amazon marketplace globally, representing a massive opportunity for international sellers. With over 150 million monthly visits, it offers unparalleled reach to Brazilian consumers who trust the Amazon brand for quality and reliability.",
    monthlyVisits: "150M+",
    marketShare: "45%",
    categories: ["Electronics", "Fashion", "Home & Garden", "Books", "Beauty"],
    benefits: [
      "Fastest-growing Amazon market worldwide",
      "Trusted brand with high customer loyalty", 
      "Advanced logistics and fulfillment network",
      "Strong mobile commerce presence",
      "Premium customer base with high purchasing power"
    ],
    country: "Brazil"
  },
  "amazon-mexico": {
    name: "Amazon Mexico", 
    logo: "/logos/amazon-mexico.png",
    description: "With over 100 million visits per month, Amazon Mexico is one of the largest marketplaces.",
    fullDescription: "Amazon Mexico stands as one of the largest e-commerce platforms in Latin America, offering sellers access to Mexico's rapidly growing online shopping market. The platform benefits from Amazon's global infrastructure while catering to local Mexican preferences.",
    monthlyVisits: "100M+",
    marketShare: "35%", 
    categories: ["Electronics", "Home & Kitchen", "Fashion", "Automotive", "Health"],
    benefits: [
      "Largest e-commerce platform in Mexico",
      "Amazon Prime membership growth",
      "Cross-border selling opportunities",
      "Advanced analytics and seller tools",
      "Strong customer service infrastructure"
    ],
    country: "Mexico"
  },
  "mercadolibre": {
    name: "MercadoLibre",
    logo: "/logos/mercadolibre.png",
    description: "MercadoLibre is the leading ecommerce platform in Latin America.",
    fullDescription: "MercadoLibre is the undisputed leader in Latin American e-commerce, operating across 18 countries. Known as the 'eBay of Latin America,' it offers the largest customer base and most comprehensive ecosystem for online selling in the region.",
    monthlyVisits: "200M+",
    marketShare: "60%",
    categories: ["All Categories", "Electronics", "Fashion", "Home", "Automotive"],
    benefits: [
      "Largest marketplace in Latin America",
      "Integrated payment system (Mercado Pago)",
      "Strong logistics network (Mercado Envios)",
      "High customer trust and loyalty",
      "Comprehensive seller support"
    ],
    country: "LATAM"
  },
  "magalu": {
    name: "Magazine Luiza",
    logo: "/logos/magalu.webp", 
    description: "Brazilian online marketplace that offers a wide range of products across various categories.",
    fullDescription: "Magazine Luiza, known as Magalu, is one of Brazil's most innovative retail companies, successfully transitioning from traditional retail to a digital-first approach. It's known for its strong customer relationships and innovative marketing strategies.",
    monthlyVisits: "80M+",
    marketShare: "25%",
    categories: ["Electronics", "Appliances", "Furniture", "Fashion", "Beauty"],
    benefits: [
      "Strong brand recognition in Brazil",
      "Innovative digital marketing approach",
      "Excellent customer service reputation",
      "Growing marketplace ecosystem",
      "Strong mobile app presence"
    ],
    country: "Brazil"
  },
  "coppel": {
    name: "Coppel",
    logo: "/logos/coppel.png",
    description: "Coppel is a major department store that operates through multiple channels in Mexico.", 
    fullDescription: "Coppel is a leading Mexican retail chain that has successfully expanded into e-commerce, offering a unique combination of physical stores and online presence. It's particularly strong in electronics, furniture, and fashion.",
    monthlyVisits: "30M+",
    marketShare: "15%",
    categories: ["Electronics", "Furniture", "Fashion", "Appliances", "Jewelry"],
    benefits: [
      "Strong omnichannel presence",
      "Flexible payment options",
      "Focus on mid-market consumers",
      "Growing digital transformation",
      "Strong logistics network"
    ],
    country: "Mexico"
  },
  "americanas": {
    name: "Americanas",
    logo: "/logos/americanas.png",
    description: "Launched in 1999 by Lojas Americanas, it is the sixth-largest ecommerce platform in Brazil.",
    fullDescription: "Americanas is one of Brazil's pioneering e-commerce platforms, backed by the traditional Lojas Americanas retail chain. It offers a wide range of products with a focus on competitive pricing and customer convenience.",
    monthlyVisits: "60M+", 
    marketShare: "20%",
    categories: ["Electronics", "Books", "Games", "Home", "Beauty"],
    benefits: [
      "Long-established e-commerce presence",
      "Strong brand recognition",
      "Competitive pricing strategy",
      "Wide product catalog",
      "Reliable logistics network"
    ],
    country: "Brazil"
  },
  "walmart": {
    name: "Walmart Mexico",
    logo: "/logos/walmart.png",
    description: "Walmart Mexico is one of the most reliable online marketplaces in Mexico.",
    fullDescription: "Walmart Mexico leverages the global Walmart brand and infrastructure to provide a reliable, trusted e-commerce platform for Mexican consumers. It combines the convenience of online shopping with the reliability of a well-known retail brand.",
    monthlyVisits: "40M+",
    marketShare: "18%", 
    categories: ["Groceries", "Electronics", "Home", "Fashion", "Health"],
    benefits: [
      "Global brand trust and recognition",
      "Strong logistics and supply chain",
      "Competitive pricing",
      "Wide product selection",
      "Reliable customer service"
    ],
    country: "Mexico"
  },
  "falabella": {
    name: "Falabella",
    logo: "/logos/falabella.png",
    description: "Major retail chain based in Chile and has operations in several countries.",
    fullDescription: "Falabella is a leading South American retail conglomerate with a strong e-commerce presence across Chile, Peru, Colombia, and Argentina. It's known for premium customer service and a wide range of quality products.",
    monthlyVisits: "50M+",
    marketShare: "30%",
    categories: ["Fashion", "Electronics", "Home", "Beauty", "Sports"],
    benefits: [
      "Multi-country presence",
      "Premium brand positioning", 
      "Strong customer loyalty",
      "Comprehensive product range",
      "Excellent customer service"
    ],
    country: "Chile & Peru"
  },
  "casas-bahia": {
    name: "Casas Bahia",
    logo: "/logos/casas-bahia.png",
    description: "Offering a wide range of products, Casas Bahia receives 150m visitors per month.",
    fullDescription: "Casas Bahia is one of Brazil's most recognizable retail brands, particularly strong in electronics and appliances. With 150 million monthly visitors, it represents a massive opportunity for sellers targeting Brazilian consumers.",
    monthlyVisits: "150M+",
    marketShare: "35%",
    categories: ["Electronics", "Appliances", "Furniture", "Phones", "Computers"],
    benefits: [
      "Massive monthly traffic",
      "Strong brand recognition",
      "Focus on electronics and appliances",
      "Flexible payment options",
      "Wide geographic coverage"
    ],
    country: "Brazil"
  },
  "shopee": {
    name: "Shopee",
    logo: "/logos/shopee.png", 
    description: "Launched in Brazil in 2019, it has become one of the fastest-growing marketplaces in the country.",
    fullDescription: "Shopee has rapidly gained market share in Brazil since its 2019 launch, bringing its successful Southeast Asian e-commerce model to Latin America. It's known for competitive pricing, gamification, and mobile-first approach.",
    monthlyVisits: "70M+",
    marketShare: "22%",
    categories: ["Fashion", "Electronics", "Beauty", "Home", "Sports"],
    benefits: [
      "Fastest-growing marketplace",
      "Mobile-first approach",
      "Competitive seller fees",
      "Innovative marketing features",
      "Strong social commerce integration"
    ],
    country: "LATAM"
  },
  "liverpool": {
    name: "Liverpool",
    logo: "/logos/liverpool.webp",
    description: "Liverpool is a leading department store chain and e-commerce platform in Mexico.",
    fullDescription: "Liverpool is Mexico's premier department store with a strong e-commerce presence, focusing on premium and mid-market products. It's particularly strong in fashion, beauty, and home goods categories.",
    monthlyVisits: "25M+",
    marketShare: "12%",
    categories: ["Fashion", "Beauty", "Home", "Electronics", "Jewelry"],
    benefits: [
      "Premium brand positioning",
      "Strong fashion and beauty focus",
      "Loyal customer base",
      "Quality product curation",
      "Excellent omnichannel experience"
    ],
    country: "Mexico"
  },
  "claro-shop": {
    name: "Claro Shop",
    logo: "/logos/claro-shop.png",
    description: "Claro Shop is a major online marketplace operated by telecommunications giant Claro.",
    fullDescription: "Claro Shop leverages the telecommunications giant Claro's massive customer base across Latin America to provide e-commerce services. It's particularly strong in electronics and mobile-related products.",
    monthlyVisits: "35M+",
    marketShare: "16%",
    categories: ["Electronics", "Mobile Phones", "Computers", "Gaming", "Accessories"],
    benefits: [
      "Large telecommunications customer base",
      "Strong in electronics and mobile",
      "Multi-country presence",
      "Integrated services ecosystem",
      "Growing marketplace features"
    ],
    country: "LATAM"
  },
  "tiktok-shop": {
    name: "TikTok Shop",
    logo: "/logos/tiktok-shop.webp",
    description: "TikTok Shop combines social commerce with entertainment, revolutionizing online shopping.",
    fullDescription: "TikTok Shop represents the future of social commerce, combining entertainment and shopping in a unique platform. It's particularly effective for reaching younger demographics and creating viral marketing campaigns.",
    monthlyVisits: "45M+",
    marketShare: "8%",
    categories: ["Fashion", "Beauty", "Electronics", "Home", "Lifestyle"],
    benefits: [
      "Revolutionary social commerce model",
      "High engagement rates",
      "Young demographic reach",
      "Viral marketing potential",
      "Innovative shopping features"
    ],
    country: "LATAM"
  }
}

export default function MarketplacePage({ params }: { params: { id: string } }) {
  const marketplace = marketplacesData[params.id as keyof typeof marketplacesData]
  const { t } = useLanguage()
  
  if (!marketplace) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header with Back Navigation */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="text-orange-700 hover:text-orange-800">
            <Link href="/marketplaces">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.marketplacePage.backToMarketplaces}
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="px-4 mb-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
                {t.marketplacePage.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {marketplace.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
                {marketplace.fullDescription}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">{marketplace.monthlyVisits}</div>
                  <div className="text-sm opacity-90">{t.marketplacePage.monthlyTraffic}</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">{marketplace.marketShare}</div>
                  <div className="text-sm opacity-90">{t.marketplacePage.marketShare}</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">{marketplace.country}</div>
                  <div className="text-sm opacity-90">{t.marketplacePage.primaryMarket}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4 mb-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Logo & CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Logo Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-200/30">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <Image
                        src={marketplace.logo}
                        alt={`${marketplace.name} logo`}
                        width={120}
                        height={80}
                        className="object-contain w-24 h-16"
                        sizes="120px"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{marketplace.name}</h2>
                    <p className="text-slate-600 text-sm">{marketplace.description}</p>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-6 border border-orange-200/50">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">{t.marketplacePage.startSellingToday}</h3>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    asChild
                  >
                    <Link href="/signup">
                      {t.marketplacePage.getStarted}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full mt-3 border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white rounded-xl transition-all duration-300"
                    asChild
                  >
                    <Link href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                      {t.marketplacePage.scheduleCall}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Benefits Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-200/30">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  </div>
                  {t.marketplacePage.keyAdvantages}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {marketplace.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-xl">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-sm">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-200/30">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                    <ShoppingCart className="w-4 h-4 text-amber-600" />
                  </div>
                  {t.marketplacePage.popularCategories}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {marketplace.categories.map((category, index) => (
                    <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200">
                      <p className="text-slate-700 font-medium text-sm">{category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Insights */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-200/30">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Globe className="w-4 h-4 text-orange-600" />
                  </div>
                  {t.marketplacePage.marketInsights}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-orange-100">
                      <span className="text-slate-600">{t.marketplacePage.monthlyTraffic}</span>
                      <span className="font-bold text-orange-600">{marketplace.monthlyVisits}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-orange-100">
                      <span className="text-slate-600">{t.marketplacePage.marketShare}</span>
                      <span className="font-bold text-amber-600">{marketplace.marketShare}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-600">{t.marketplacePage.primaryMarket}</span>
                      <span className="font-bold text-slate-900">{marketplace.country}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6">
                    <h4 className="font-bold text-slate-900 mb-3">{t.marketplacePage.whyChoose}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {marketplace.description} {t.marketplacePage.whyChooseDescription} {marketplace.country} {t.marketplacePage.whyChooseMarket}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.marketplacePage.readyToExpand} {marketplace.name}?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-slate-300">
              {t.marketplacePage.expandDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-6 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link href="/signup">
                  {t.marketplacePage.startSellingNow}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-orange-300 hover:bg-white hover:text-slate-900 px-8 py-6 text-lg rounded-xl font-semibold transition-all duration-300"
                asChild
              >
                <Link href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                  {t.marketplacePage.scheduleCall}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 