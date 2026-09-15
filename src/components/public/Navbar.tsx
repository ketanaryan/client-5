"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ChevronDown, ChevronRight } from "lucide-react"

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

  return (
    <div className="flex flex-col w-full relative z-50">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-100 py-2 px-6 lg:px-12 flex items-center justify-between text-xs sm:text-sm font-medium">
        <div>20+ Years of Excellence</div>
        <div className="flex items-center gap-6">
          <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+91 98765 43210</span>
          </a>
          <a href="mailto:contact@shantanuassociates.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">contact@shantanuassociates.com</span>
          </a>
        </div>
      </div>
      
      {/* Main Navigation Bar */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm sticky top-0">
        <Link className="flex items-center gap-3 group" href="/">
          <div className="h-10 w-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
            CA
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight text-blue-950">Shantanu & Associates</span>
            <span className="text-[10px] tracking-widest text-slate-500 font-medium uppercase mt-1">Chartered Accountants</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center h-full">
          {/* SERVICES DROPDOWN */}
          <div 
            className="relative h-full"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => { setShowDropdown(false); setActiveCategory(0); }}
          >
            <button className="text-sm font-bold text-blue-950 px-4 h-full flex items-center gap-1 border-b-2 border-transparent hover:border-emerald-600 hover:text-emerald-700 transition-colors">
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 flex rounded-b-lg overflow-hidden min-w-[620px]">
                {/* Left Column - Categories */}
                <div className="w-[260px] bg-white border-r border-slate-100 py-2">
                  {SERVICE_CATEGORIES.map((cat, idx) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className={`flex items-center justify-between px-5 py-3 text-[14px] font-medium transition-colors ${
                        activeCategory === idx 
                          ? "bg-emerald-600 text-white" 
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                      onMouseEnter={() => setActiveCategory(idx)}
                    >
                      {cat.name}
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </Link>
                  ))}
                </div>
                
                {/* Right Column - Sub Items */}
                <div className="flex-1 bg-white py-2 px-2">
                  {SERVICE_CATEGORIES[activeCategory]?.subItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2.5 text-[13px] text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link className="text-sm font-bold text-blue-950 px-4 h-full flex items-center border-b-2 border-transparent hover:border-emerald-600 hover:text-emerald-700 transition-colors" href="/about">About Us</Link>
          <Link className="text-sm font-bold text-blue-950 px-4 h-full flex items-center border-b-2 border-transparent hover:border-emerald-600 hover:text-emerald-700 transition-colors" href="/#contact">Contact</Link>
          <div className="w-px h-6 bg-slate-300 mx-4"></div>
          <Link href="/login">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-md px-6">
              Client Portal
            </Button>
          </Link>
        </nav>
      </header>
    </div>
  )
}
