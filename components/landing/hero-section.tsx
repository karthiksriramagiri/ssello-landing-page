"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = "" 
}: { 
  end: number
  duration?: number
  suffix?: string 
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (end === 0) return

    let startTime: number | null = null
    const startValue = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

// Standard size based on MercadoLibre Argentina image
const standardSize = { width: 420, height: 300 }

const imagesCol1 = [
  { src: "/images/hero-anim/amz-br-shoes.png", alt: "Amazon Brazil - Shoes Product Page" },
  { src: "/images/hero-anim/americanas-br-notebook.png", alt: "Americanas Brazil - Notebook Product Page" },
  { src: "/images/hero-anim/coppel-mx-electronics.png", alt: "Coppel Mexico - Electronics Product Page" },
  { src: "/images/hero-anim/wm-mx-homegoods.png", alt: "Walmart Mexico - Home Goods Product Page" },
]

const imagesCol2 = [
  { src: "/images/hero-anim/americanas-br-infinix.png", alt: "Americanas Brazil - Infinix Smart Phone Product Page" },
  { src: "/images/hero-anim/amz-br-redmi.png", alt: "Amazon Brazil - Xiaomi Redmi Product Page" },
  { src: "/images/hero-anim/ml-mx-products.png", alt: "MercadoLibre Mexico - Product Listings" },
  { src: "/images/hero-anim/amz-mx-vacuum.png", alt: "Amazon Mexico - Vacuum Product Page" },
]

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-white overflow-hidden">
      {/* Reduced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl animate-float delay-2000"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-1/4 left-5 w-3 h-3 bg-orange-400/60 rotate-45 animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-amber-400/60 rounded-full animate-pulse-soft delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-6 shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                {t.hero.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  {t.hero.title}
                </span>{" "}
                <span className="text-slate-900">{t.hero.subtitle}</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-xl font-medium">
                {t.hero.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
                asChild
              >
                <Link href="/signup">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {t.hero.startSelling}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <Link href="https://calendly.com/official-ssello" target="_blank" rel="noopener noreferrer">{t.hero.scheduleCall}</Link>
              </Button>
            </div>

            {/* Enhanced Animated Stats section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8">
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={700} suffix="M+" />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">{t.hero.consumers}</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={13} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">{t.hero.marketplaces}</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={5} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">{t.hero.countries}</div>
              </div>
            </div>
          </div>

          {/* Clean Two Column Animation with staggered start */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden hidden md:flex gap-6 xl:gap-8">
            {/* Column 1 - Scrolls Up, starts from bottom */}
            <div className="w-1/2 animate-scroll-up translate-y-32">
              {[...imagesCol1, ...imagesCol1].map((image, index) => (
                <div
                  key={`col1-${index}`}
                  className="mb-8 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl border border-white/50 bg-white/90 backdrop-blur-sm group"
                  style={{ 
                    width: `${standardSize.width * 0.7}px`,
                    height: `${standardSize.height * 0.7}px`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={standardSize.width}
                    height={standardSize.height}
                    className="w-full h-full object-contain p-2 relative z-10"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
            
            {/* Column 2 - Scrolls Down, starts from top */}
            <div className="w-1/2 animate-scroll-down -translate-y-32">
              {[...imagesCol2, ...imagesCol2].map((image, index) => (
                <div
                  key={`col2-${index}`}
                  className="mb-8 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl border border-white/50 bg-white/90 backdrop-blur-sm group"
                  style={{ 
                    width: `${standardSize.width * 0.7}px`,
                    height: `${standardSize.height * 0.7}px`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={standardSize.width}
                    height={standardSize.height}
                    className="w-full h-full object-contain p-2 relative z-10"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
