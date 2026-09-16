"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function DisclaimerModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if the user has already agreed
    const hasAgreed = localStorage.getItem("icai_disclaimer_agreed")
    if (!hasAgreed) {
      setShow(true)
      // Prevent scrolling while modal is open
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem("icai_disclaimer_agreed", "true")
    setShow(false)
    document.body.style.overflow = 'auto'
  }

  const handleDisagree = () => {
    window.location.href = "https://www.google.com"
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="p-6 md:p-8 space-y-6 text-slate-700 text-[15px] leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-wide">Disclaimer</h2>
          
          <h3 className="text-lg font-bold text-slate-900">Shantanu & Associates, Chartered Accountants</h3>
          
          <p>
            This website pertains to Shantanu & Associates, Chartered Accountants in practice, and is intended solely to provide general information about our professional qualifications, areas of practice and services.
          </p>
          
          <p>
            This website is not intended for advertising or solicitation of professional work or engagements. The website is not sent unsolicited and is intended to be accessed in the context of a specific professional requirement, discussion, expression of interest or request for information.
          </p>
          
          <p>
            The information contained herein is true to the best of our knowledge and belief and is subject to applicable provisions of the <strong className="text-slate-900">ICAI Code of Ethics, 2026</strong>, and other applicable laws, regulations and professional guidelines.
          </p>
          
          <p>
            The information provided on this website does not constitute professional advice. Professional advice or services will be provided only after considering the specific facts and circumstances of an engagement.
          </p>
          
          <p>
            We respect the confidentiality of client information and do not disclose confidential or restricted information through this website.
          </p>
          
          <p className="font-semibold text-slate-900 text-base mt-8 border-l-4 border-emerald-500 pl-4 py-1">
            By proceeding to this website, you acknowledge the above.
          </p>
        </div>
        
        <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sticky bottom-0">
          <Button 
            variant="outline" 
            onClick={handleDisagree}
            className="w-full sm:w-auto hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            I Disagree
          </Button>
          <Button 
            onClick={handleAgree}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            I Agree
          </Button>
        </div>
      </div>
    </div>
  )
}
