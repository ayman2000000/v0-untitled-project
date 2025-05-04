"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "ar", name: "العربية" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
]

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("ar")

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code)
    // In a real app, you would change the language here
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white">
          <Globe className="h-5 w-5 mr-2" />
          {languages.find((lang) => lang.code === currentLanguage)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? "bg-gray-100" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
