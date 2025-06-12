"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { useState } from "react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { getCalendlyUrl } from "@/lib/calendly"

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/marketplaces", label: t.nav.marketplaces },
    { href: "/solutions", label: t.nav.solutions },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <Image
                src="/logos/ssello-logo.png"
                alt="ssello Logo"
                width={160}
                height={64}
                className="h-14 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-semibold text-slate-700 transition-all duration-300 hover:text-slate-900 group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -m-2"></div>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Temporarily hidden language switcher */}
            {/* <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-lg blur-sm"></div>
              <LanguageSwitcher />
            </div> */}
            <Button 
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2.5 group" 
              asChild
            >
              <Link href="/signup">
                <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {t.nav.getStarted}
              </Link>
            </Button>
          </div>
          
          <div className="md:hidden flex items-center space-x-3">
            {/* Temporarily hidden language switcher */}
            {/* <LanguageSwitcher /> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-slate-100/80 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/98 backdrop-blur-xl">
          <nav className="flex flex-col space-y-2 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-slate-100/80 hover:to-slate-50/80 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 mt-4 border-t border-slate-200/60">
              <Button 
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                asChild
              >
                <Link href="/signup">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.nav.getStarted}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
