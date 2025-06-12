"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Calendar, Sparkles, Clock, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function MeetingConfirmedPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Meeting Confirmed Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-white relative overflow-hidden min-h-screen flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-2xl animate-float delay-1000"></div>
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
              <Calendar className="w-4 h-4 mr-2" />
              Meeting Confirmed
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Thank you for{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                scheduling your intro meeting!
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're excited to connect with you and learn more about your business goals.
              <span className="font-semibold text-foreground"> Your LATAM expansion journey starts here!</span>
            </p>
          </div>

          {/* What to Expect */}
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-green-200/50 mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center justify-center">
              <Clock className="w-8 h-8 mr-3 text-green-600" />
              What to expect in your intro meeting
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Business Discovery</h3>
                    <p className="text-slate-600 text-sm">We'll learn about your products, target markets, and expansion goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">LATAM Strategy</h3>
                    <p className="text-slate-600 text-sm">Discuss which Latin American marketplaces are best for your business.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Our Services</h3>
                    <p className="text-slate-600 text-sm">We'll walk you through our comprehensive platform and discuss how it can transform your business operations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Next Steps</h3>
                    <p className="text-slate-600 text-sm">We'll share the onboarding meeting details with you to ensure a smooth start.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Preparation */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-8 md:p-10 mb-12 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-3 text-green-600" />
              How to prepare for your meeting
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Bring Your Team</h4>
                <p className="text-slate-600 text-sm">Include key decision-makers and stakeholders in the call.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Share Your Goals</h4>
                <p className="text-slate-600 text-sm">Think about your expansion timeline and target markets.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Questions Ready</h4>
                <p className="text-slate-600 text-sm">Prepare any specific questions about LATAM marketplaces.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-lg rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-green-300 text-green-600 hover:bg-green-50 px-10 py-6 text-lg rounded-2xl font-semibold transition-all duration-300"
              asChild
            >
              <Link href="/about">
                Learn More About ssello
              </Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-green-200/50">
            <p className="text-slate-600 mb-4">Questions before our meeting?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <a href="mailto:official@ssello.com" className="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                official@ssello.com
              </a>
              <span className="hidden sm:block text-slate-400">•</span>
              <a href="tel:+1(470)760-9437" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                +1 (470)760-9437
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 