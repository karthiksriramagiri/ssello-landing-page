"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Star, ArrowRight, Sparkles, Zap, Users, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { getCalendlyUrl } from "@/lib/calendly"

export default function PricingPage() {
  const { t } = useLanguage()

  const pricingPlans = [
    {
      name: t.pricing.starter.name,
      description: t.pricing.starter.description,
      price: t.pricing.starter.price,
      period: t.pricing.starter.period,
      limit: t.pricing.starter.limit,
      limitLabel: t.pricing.starter.limitLabel,
      icon: Star,
      gradient: "from-blue-500 to-cyan-600",
      features: t.pricing.starter.features,
      buttonText: t.pricing.starter.buttonText,
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: t.pricing.growth.name,
      description: t.pricing.growth.description,
      price: t.pricing.growth.price,
      period: t.pricing.growth.period,
      limit: t.pricing.growth.limit,
      limitLabel: t.pricing.growth.limitLabel,
      icon: Building2,
      gradient: "from-green-500 to-emerald-600",
      features: t.pricing.growth.features,
      buttonText: t.pricing.growth.buttonText,
      buttonVariant: "outline" as const,
      popular: false
    }
  ]

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.pricing.badge}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            {t.pricing.title}{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              {t.pricing.titleHighlight}
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t.pricing.description}
            <span className="font-semibold text-foreground"> {t.pricing.payOnly}</span>
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={plan.name} className={`relative group ${plan.popular ? 'lg:-mt-8' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      {t.pricing.mostPopular}
                    </div>
                  </div>
                )}
                
                <div className={`bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-lg border transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${
                  plan.popular 
                    ? 'border-orange-300/50 hover:shadow-2xl hover:border-orange-400/50' 
                    : 'border-slate-200/50 hover:shadow-xl hover:border-orange-300/30'
                }`}>
                  {/* Plan header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-slate-600 ml-1">{plan.period}</span>
                        )}
                      </div>
                      {plan.limit && (
                        <div className="text-sm text-slate-600 mt-2">
                          <span className="font-semibold">{plan.limit}</span>
                          {plan.limitLabel && <span> {plan.limitLabel}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full text-white flex-shrink-0 mt-0.5`} />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 mt-auto ${
                      plan.buttonVariant === 'default'
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl`
                        : `border-2 border-orange-400 text-orange-600 hover:bg-orange-600 hover:text-white bg-white shadow-lg hover:shadow-xl`
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                    asChild
                  >
                    <Link href="/signup">
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            {t.pricing.ctaTitle}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            {t.common.startSellingAcross} {t.common.latinAmerica}
            <br />
            <span className="text-orange-100">{t.pricing.ctaSubtitle}</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t.pricing.ctaDescription}
            <span className="font-semibold"> {t.pricing.ctaCommitment}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-white/90 text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              asChild
            >
              <Link href="/signup">
                {t.pricing.startFreeTrial}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-orange-600 hover:bg-white hover:text-orange-600 text-lg px-10 py-6 rounded-2xl font-semibold transition-all duration-300"
              asChild
            >
              <Link href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                {t.common.talkToSales}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 