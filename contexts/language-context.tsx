"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { translations, LanguageCode, TranslationKeys } from "@/lib/translations"

interface LanguageContextType {
  currentLanguage: LanguageCode
  setCurrentLanguage: (language: LanguageCode) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en")

  const value = {
    currentLanguage,
    setCurrentLanguage,
    t: translations[currentLanguage]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 