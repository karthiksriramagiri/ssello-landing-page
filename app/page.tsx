"use client"

import { HeroSection } from "@/components/landing/hero-section"
import { MarketplacesSection } from "@/components/landing/marketplaces-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { getCalendlyUrl } from "@/lib/calendly"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <>
      <HeroSection />
      <MarketplacesSection />
      <FeaturesSection />
      <TestimonialsSection />
      
      {/* Enhanced Footer Section - Smaller Version for Home */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.common.readyToScale}
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t.common.startSellingAcross}{" "}
              <span className="bg-gradient-to-r from-orange-100 to-amber-100 bg-clip-text text-transparent">
                {t.common.latinAmerica}
              </span>
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg md:text-xl text-slate-100 leading-relaxed">
                {t.common.joinThousands}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-white/90 text-lg px-10 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                asChild
              >
                <Link href="/signup">
                  {t.common.startSelling}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-orange-600 hover:bg-white hover:text-orange-600 text-lg px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                asChild
              >
                <Link href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                  {t.common.scheduleCall}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
