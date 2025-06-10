"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-orange-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ctaBanner.title}</h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          {t.ctaBanner.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-slate-100 px-8 py-6 text-lg rounded-lg shadow-md"
            asChild
          >
            <Link href="/signup">
              {t.common.startSelling}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white/10 hover:text-white px-8 py-6 text-lg rounded-lg"
            asChild
          >
            <Link href="/contact">{t.common.contactSales}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
