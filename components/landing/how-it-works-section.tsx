"use client"

import { UploadCloud, Send, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Step {
  icon: React.ElementType
  title: string
  description: string
}

export function HowItWorksSection() {
  const { t } = useLanguage()

  const steps: Step[] = [
    {
      icon: UploadCloud,
      title: t.howItWorks.step1.title,
      description: t.howItWorks.step1.description,
    },
    {
      icon: Send,
      title: t.howItWorks.step2.title,
      description: t.howItWorks.step2.description,
    },
    {
      icon: TrendingUp,
      title: t.howItWorks.step3.title,
      description: t.howItWorks.step3.description,
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.howItWorks.title}</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            {t.howItWorks.description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="text-center p-6 border border-border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
