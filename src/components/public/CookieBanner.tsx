"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true")
    setIsVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#032b4e] text-white p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border-t border-blue-900/50">
      <div className="text-sm md:text-base text-blue-50 max-w-4xl">
        We use cookies to improve your experience on our site, analyze site traffic, and provide secure client portal access. By clicking "Accept", you consent to our use of cookies.
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <Button onClick={handleAccept} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium">
          Accept All
        </Button>
        <button onClick={() => setIsVisible(false)} className="p-2 text-white/70 hover:text-white transition-colors md:hidden">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
