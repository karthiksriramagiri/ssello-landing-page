"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Mail, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { getCalendlyUrl } from "@/lib/calendly"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "contact"
  
  const isSignup = type === "signup"
  const isContact = type === "contact"

  return (
    <div className="bg-background text-foreground">
      {/* Thank You Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-white relative overflow-hidden min-h-screen flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>

        <div className="container text-center relative z-10 max-w-4xl mx-auto">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 text-green-800 text-sm font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {isSignup ? "Registration Successful" : "Message Sent"}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              {isSignup ? (
                <>Thank you for{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                  joining ssello!
                </span></>
              ) : (
                <>Thank you for{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                  reaching out!
                </span></>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {isSignup ? (
                <>
                  Welcome to ssello! Our team will review your application and contact you soon to get you started.
                  <span className="font-semibold text-foreground"> Your LATAM expansion journey begins now!</span>
                </>
              ) : (
                <>
                  We've received your message and our team will get back to you as soon as possible.
                  <span className="font-semibold text-foreground"> Thank you for your interest in ssello!</span>
                </>
              )}
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-orange-200/50 mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">What happens next?</h2>
            <div className="space-y-4 text-left">
              {isSignup ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Account Review</h3>
                      <p className="text-slate-600">Our team will review your application and verify your business details.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Onboarding Call</h3>
                      <p className="text-slate-600">We'll schedule a call to discuss your expansion strategy and set up your account.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Start Selling</h3>
                      <p className="text-slate-600">Begin selling across 13+ Latin American marketplaces with full support.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Message Review</h3>
                      <p className="text-slate-600">Our team will review your message and determine the best way to help you.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Personal Response</h3>
                      <p className="text-slate-600">You'll receive a personalized response from our team soon.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Next Steps</h3>
                      <p className="text-slate-600">We'll guide you through the next steps for your LATAM expansion journey.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-12 py-6 text-lg rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
            
            {!isSignup && (
              <Button
                size="lg"
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 px-10 py-6 text-lg rounded-2xl font-semibold transition-all duration-300"
                asChild
              >
                <Link href={getCalendlyUrl()} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Link>
              </Button>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-orange-200/50">
            <p className="text-slate-600 mb-4">Need immediate assistance?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <a href="mailto:official@ssello.com" className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                official@ssello.com
              </a>
              <span className="hidden sm:block text-slate-400">•</span>
              <a href="tel:+1(470)760-9437" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                +1 (470)760-9437
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
} 