"use client"

import { Button } from "@/components/ui/button"
import { Building, Target, Users, Handshake, Globe, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { getCalendlyUrl } from "@/lib/calendly"

export default function AboutPage() {
  const { t } = useLanguage()

  const teamMembers = [
    {
      ...t.about.team.karthik,
      image: "/images/team/karthik.jpeg",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      ...t.about.team.jason,
      image: "/images/team/jason.jpeg",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      ...t.about.team.collins,
      image: "/images/team/collins.jpeg",
      gradient: "from-purple-500 to-pink-500"
    }
  ]

  const values = [
    {
      icon: Target,
      title: t.about.values.sellerCentricity.title,
      description: t.about.values.sellerCentricity.description,
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Globe,
      title: t.about.values.removingBarriers.title,
      description: t.about.values.removingBarriers.description,
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: Handshake,
      title: t.about.values.partnership.title,
      description: t.about.values.partnership.description,
      gradient: "from-orange-600 to-amber-600"
    },
    {
      icon: Users,
      title: t.about.values.simplicity.title,
      description: t.about.values.simplicity.description,
      gradient: "from-amber-600 to-orange-500"
    },
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
            <Building className="w-4 h-4 mr-2" />
            {t.about.badge}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            {t.about.title}{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              {t.about.titleHighlight}
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t.about.description}
            <span className="font-semibold text-foreground"> {t.about.descriptionHighlight}</span>
          </p>
        </div>
      </section>

      {/* Our Origin Story */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>

        <div className="container max-w-7xl mx-auto relative z-10">
          {/* LATAM Opportunity Section - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold shadow-lg">
                <Globe className="w-4 h-4 mr-2" />
                {t.about.marketOpportunity.badge}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t.about.marketOpportunity.title}{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {t.about.marketOpportunity.titleHighlight}
                </span>{" "}
                {t.about.marketOpportunity.subtitle}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t.about.marketOpportunity.description}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.about.marketOpportunity.description2}
              </p>
            </div>
            
            {/* Right Column - Market Stats */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  1B+
                </div>
                <div className="text-xl font-semibold text-slate-900 mb-3">{t.about.marketOpportunity.activeConsumers}</div>
                <div className="text-slate-600 leading-relaxed">{t.about.marketOpportunity.activeConsumersDesc}</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  $85B+
                </div>
                <div className="text-xl font-semibold text-slate-900 mb-3">{t.about.marketOpportunity.marketSize}</div>
                <div className="text-slate-600 leading-relaxed">{t.about.marketOpportunity.marketSizeDesc}</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-orange-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  15+
                </div>
                <div className="text-xl font-semibold text-slate-900 mb-3">{t.about.marketOpportunity.topMarketplaces}</div>
                <div className="text-slate-600 leading-relaxed">{t.about.marketOpportunity.topMarketplacesDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-orange-50/30"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-32 left-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
              <Users className="w-4 h-4 mr-2" />
              {t.about.team.badge}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
              {t.about.team.title}{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {t.about.team.titleHighlight}
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t.about.team.description}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="group">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                      {member.role}
                    </p>
                    <p className="text-sm font-medium text-slate-600 mb-4">{member.education}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {member.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${member.gradient} rounded-full flex-shrink-0 mt-2`}></div>
                        <p className="text-sm text-slate-600 leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Sellers to Solution Builders */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-2000"></div>
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.about.origin.badge}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
              {t.about.origin.title}{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {t.about.origin.titleHighlight}
              </span>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg border border-orange-200/50">
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                <p className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">
                  {t.about.origin.introduction}
                </p>
                
                <p className="mb-6">
                  {t.about.origin.paragraph1}
                </p>
                
                <p className="mb-6">
                  {t.about.origin.paragraph2}
                </p>
                
                <p className="mb-6">
                  {t.about.origin.paragraph3}
                </p>
                
                <p className="mb-6">
                  {t.about.origin.paragraph4}
                </p>
                
                <p className="text-xl font-semibold text-slate-900 mb-8">
                  {t.about.origin.conclusion}
                </p>
                
                <div className="flex justify-start">
                  <div className="text-left">
                    <p className="text-lg font-semibold text-slate-900">{t.about.origin.signature}</p>
                    <p className="text-sm text-slate-600">{t.about.origin.signatureTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-32 left-32 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.about.values.badge}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
              {t.about.values.title}{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {t.about.values.titleHighlight}
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t.about.values.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-orange-200/50 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[280px] flex flex-col">
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-1">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <Handshake className="w-4 h-4 mr-2" />
            {t.about.cta.badge}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            {t.about.cta.title}
            <br />
            <span className="text-orange-100">{t.about.cta.titleHighlight}</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t.about.cta.description}
            <span className="font-semibold"> {t.about.cta.descriptionHighlight}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-white/90 text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              asChild
            >
              <Link href="/signup">
                {t.about.cta.buttonText}
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
                {t.common.scheduleCall}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
