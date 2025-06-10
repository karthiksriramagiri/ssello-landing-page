"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageCode } from "@/lib/translations"

const languages = [
  { code: "en" as LanguageCode, name: "English", flag: "🇺🇸" },
  { code: "es" as LanguageCode, name: "Español", flag: "🇪🇸" },
  { code: "pt" as LanguageCode, name: "Português", flag: "🇧🇷" },
  { code: "zh" as LanguageCode, name: "中文", flag: "🇨🇳" },
  { code: "ko" as LanguageCode, name: "한국어", flag: "🇰🇷" },
]

export function LanguageSwitcher() {
  const { currentLanguage, setCurrentLanguage } = useLanguage()
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (languageCode: LanguageCode) => {
    setCurrentLanguage(languageCode)
  }

  return (
    <div className="relative z-[9999]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-orange-50">
            <span className="text-lg">{currentLang.flag}</span>
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 z-[9999] bg-white border border-slate-200 shadow-xl"
          sideOffset={8}
        >
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center gap-3 cursor-pointer p-3 hover:bg-orange-50 ${
                currentLanguage === language.code ? "bg-orange-50 text-orange-600" : ""
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <span className="ml-auto text-orange-600">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 