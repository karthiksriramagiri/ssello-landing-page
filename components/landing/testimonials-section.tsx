"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const testimonials = [
  {
    id: 1,
    name: "Emily Parker",
    title: "CEO, Swiftbuy.AI",
    quote: "ssello transformed our international expansion. What used to take months now happens in weeks. Their logistics network is unmatched."
  },
  {
    id: 2,
    name: "Marcus Thompson", 
    title: "Operations Director, PalletHub",
    quote: "The simplified shipping process saved us countless hours. Now we just ship to one location and ssello handles everything else."
  },
  {
    id: 3,
    name: "Rachel Martinez",
    title: "E-commerce Manager, BidMate", 
    quote: "Within 3 months of using ssello, our Latin American sales increased by 300%. The platform made expansion effortless."
  }
]

export function TestimonialsSection() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl animate-float delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 text-sm font-semibold mb-6 shadow-sm">
            💬 {t.testimonials.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {t.testimonials.title}{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              {t.testimonials.titleHighlight}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t.testimonials.description}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial display */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-200/30 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-20 h-20 text-orange-500" />
            </div>

            <div className="text-center space-y-8">
              {/* Testimonial content */}
              <blockquote className="text-xl md:text-2xl text-slate-700 leading-relaxed italic max-w-3xl mx-auto">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonials[currentIndex].title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 border-orange-200 hover:bg-orange-50"
            >
              <ChevronLeft className="w-5 h-5 text-orange-600" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 border-orange-200 hover:bg-orange-50"
            >
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-500 scale-125"
                    : "bg-orange-200 hover:bg-orange-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 