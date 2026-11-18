"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ChevronDown, ChevronRight, Menu, X, ArrowRight } from "lucide-react"

const SERVICE_CATEGORIES = [
  {
    name: "Business Registration",
    href: "/services/business-registration",
    subItems: [
      { name: "GST Registration", href: "/services/gst-registration" },
      { name: "MSME Udyam Registration", href: "/services/msme-udyam-registration" },
      { name: "PF Registration", href: "/services/pf-registration" },
      { name: "ESIC Registration", href: "/services/esic-registration" },
      { name: "Professional Tax Registration", href: "/services/professional-tax-registration" },
      { name: "FSSAI Registration", href: "/services/fssai-registration" },
      { name: "Rera Registration", href: "/services/rera-registration" },
      { name: "Shop Act Registration", href: "/services/shop-act-registration" },
      { name: "IEC Registration", href: "/services/iec-registration" },
      { name: "Trademark Registration", href: "/services/trademark-registration" },
    ]
  },
  {
    name: "Company Formation",
    href: "/services/corporate-laws",
    subItems: [
      { name: "Private Limited Company", href: "/services/private-limited-company" },
      { name: "One Person Company (OPC)", href: "/services/one-person-company" },
      { name: "Limited Liability Partnership (LLP)", href: "/services/llp-registration" },
      { name: "Partnership Firm Registration", href: "/services/partnership-firm-registration" },
      { name: "Section 8 Company / NGO", href: "/services/section-8-company" },
      { name: "Sole Proprietorship Registration", href: "/services/sole-proprietorship" },
    ]
  },
  {
    name: "Audit & Assurance",
    href: "/services/audit-and-assurance",
    subItems: [
      { name: "Statutory Audit", href: "/services/statutory-audit" },
      { name: "Internal Audit", href: "/services/internal-audit" },
      { name: "Tax Audit", href: "/services/tax-audit" },
      { name: "GST Audit", href: "/services/gst-audit" },
      { name: "Bank Audit", href: "/services/bank-audit" },
      { name: "Concurrent Audit", href: "/services/concurrent-audit" },
    ]
  },
  {
    name: "Direct Tax",
    href: "/services/taxation-services",
    subItems: [
      { name: "Income Tax Return Filing", href: "/services/income-tax-return-filing" },
      { name: "Advance Tax Planning", href: "/services/advance-tax-planning" },
      { name: "TDS Compliance & Returns", href: "/services/tds-compliance" },
      { name: "Tax Litigation Support", href: "/services/tax-litigation" },
      { name: "Capital Gains Advisory", href: "/services/capital-gains-advisory" },
    ]
  },
  {
    name: "Indirect Tax",
    href: "/services/taxation-services",
    subItems: [
      { name: "GST Return Filing", href: "/services/gst-return-filing" },
      { name: "GST Compliance & Advisory", href: "/services/gst-compliance" },
      { name: "GST Refund", href: "/services/gst-refund" },
      { name: "GST Audit & Assessment", href: "/services/gst-audit-assessment" },
      { name: "Input Tax Credit Advisory", href: "/services/input-tax-credit" },
    ]
  },
  {
    name: "NRI Tax and Allied Services",
    href: "/services/nri-tax-services",
    subItems: [
      { name: "NRI Income Tax Filing", href: "/services/nri-income-tax-filing" },
      { name: "FEMA Compliance", href: "/services/fema-compliance" },
      { name: "Repatriation of Funds", href: "/services/repatriation-of-funds" },
      { name: "DTAA Advisory", href: "/services/dtaa-advisory" },
      { name: "NRI Property Tax", href: "/services/nri-property-tax" },
    ]
  },
  {
    name: "Corporate Laws",
    href: "/services/corporate-laws",
    subItems: [
      { name: "Annual ROC Filings", href: "/services/annual-roc-filings" },
      { name: "Board Meeting Compliance", href: "/services/board-meeting-compliance" },
      { name: "Director KYC & Appointments", href: "/services/director-kyc" },
      { name: "Corporate Governance", href: "/services/corporate-governance" },
    ]
  },
  {
    name: "Consultancy",
    href: "/services/consultancy",
    subItems: [
      { name: "Business Advisory", href: "/services/business-advisory" },
      { name: "M&A Advisory", href: "/services/ma-advisory" },
      { name: "Due Diligence", href: "/services/due-diligence" },
      { name: "Valuation Services", href: "/services/valuation-services" },
      { name: "Strategic Planning", href: "/services/strategic-planning" },
    ]
  },
]

export function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  return (
    <div className="flex flex-col w-full relative z-50">
      {/* Top Utility Bar */}
      <div className="bg-[#032b4e] text-slate-200 py-2.5 px-6 lg:px-12 flex items-center justify-between text-xs sm:text-[13px] border-b border-blue-950">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
          <span className="font-medium tracking-wide">Chartered Accountants &bull; Tax, Audit &amp; Corporate Advisory</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:8668555246" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
            <Phone className="h-3.5 w-3.5 text-blue-300" />
            <span className="hidden sm:inline font-medium">8668555246</span>
          </a>
          <a href="mailto:shantanus.associates@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
            <Mail className="h-3.5 w-3.5 text-blue-300" />
            <span className="hidden sm:inline font-medium">shantanus.associates@gmail.com</span>
          </a>
        </div>
      </div>
      
      {/* Main Navigation Bar */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
        <Link className="flex items-center gap-3 group" href="/">
          <img src="/ca-logo-cropped.png" alt="CA Logo" className="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg md:text-[20px] leading-none tracking-tight text-[#032b4e]">Shantanu &amp; Associates</span>
            <span className="text-[10px] md:text-[11px] tracking-[0.2em] text-blue-700 font-bold uppercase mt-1">Chartered Accountants</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full gap-1">
          <Link 
            className="text-[14px] font-semibold text-slate-700 hover:text-blue-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 transition-colors" 
            href="/"
          >
            Home
          </Link>

          <Link 
            className="text-[14px] font-semibold text-slate-700 hover:text-blue-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 transition-colors" 
            href="/about"
          >
            About
          </Link>

          {/* SERVICES DROPDOWN */}
          <div 
            className="relative h-full"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => { setShowDropdown(false); setActiveCategory(0); }}
          >
            <button className="text-[14px] font-semibold text-slate-700 hover:text-blue-700 px-3.5 h-full flex items-center gap-1 border-b-2 border-transparent hover:border-blue-600 transition-colors">
              Services <ChevronDown className="h-3.5 w-3.5 transition-transform" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 bg-white shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-slate-200 flex rounded-b-lg overflow-hidden min-w-[660px]">
                {/* Left Column - Categories */}
                <div className="w-[280px] bg-slate-50/80 border-r border-slate-200 py-2">
                  {SERVICE_CATEGORIES.map((cat, idx) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className={`flex items-center justify-between px-5 py-2.5 text-[13.5px] font-semibold transition-colors ${
                        activeCategory === idx 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "text-slate-700 hover:bg-slate-200/60 hover:text-blue-800"
                      }`}
                      onMouseEnter={() => setActiveCategory(idx)}
                    >
                      {cat.name}
                      <ChevronRight className={`h-4 w-4 ${activeCategory === idx ? 'text-white' : 'text-slate-400'}`} />
                    </Link>
                  ))}
                </div>
                
                {/* Right Column - Sub Items */}
                <div className="flex-1 bg-white py-3 px-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-2 mb-1 border-b border-slate-100">
                    {SERVICE_CATEGORIES[activeCategory]?.name}
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {SERVICE_CATEGORIES[activeCategory]?.subItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 rounded transition-colors flex items-center justify-between group"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link 
            className="text-[14px] font-semibold text-slate-700 hover:text-blue-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 transition-colors" 
            href="/news-and-resources"
          >
            News &amp; Resources
          </Link>

          <div className="flex items-center gap-3 ml-4">
            <Link href="/#contact">
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-bold rounded px-4 h-10 text-[13.5px] transition-all"
              >
                Enquire Now
              </Button>
            </Link>

            <Link href="/login">
              <Button className="bg-[#032b4e] hover:bg-[#021f38] text-white font-bold rounded px-5 h-10 text-[13.5px] shadow-sm transition-all">
                Login
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link href="/login">
            <Button size="sm" className="bg-[#032b4e] hover:bg-blue-900 text-white font-bold text-xs h-9 px-3">
              Login
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-xl flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[15px] font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            Home
          </Link>

          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[15px] font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            About
          </Link>

          <div>
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-[15px] font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-3 py-2 flex flex-col gap-2 bg-slate-50 rounded-md my-2">
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-700 py-1"
                  >
                    • {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/news-and-resources" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-[15px] font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            News &amp; Resources
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="outline" className="w-full border-blue-600 text-blue-700 font-bold">
                Enquire Now
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button className="w-full bg-[#032b4e] hover:bg-[#021f38] text-white font-bold">
                Client &amp; Admin Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
