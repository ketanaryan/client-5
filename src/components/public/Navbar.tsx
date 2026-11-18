"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ChevronDown, ChevronRight, Menu, X } from "lucide-react"

const SERVICE_CATEGORIES = [
  {
    name: "Audit & Assurance",
    href: "/services/audit-and-assurance",
    subItems: [
      { name: "Statutory Audit", href: "/services/statutory-audit" },
      { name: "Internal Audit & Risk Review", href: "/services/internal-audit-risk-review" },
      { name: "Tax Audit", href: "/services/tax-audit" },
      { name: "Special Purpose Audit & Assurance", href: "/services/special-purpose-audit" },
    ]
  },
  {
    name: "Accounting & Financial Services",
    href: "/services/accounting-financial-services",
    subItems: [
      { name: "Accounting & Bookkeeping", href: "/services/accounting-and-bookkeeping" },
      { name: "Financial Reporting", href: "/services/financial-reporting" },
      { name: "Reconstruction & Restructuring of Accounts", href: "/services/reconstruction-restructuring-accounts" },
    ]
  },
  {
    name: "Direct Taxation",
    href: "/services/direct-taxation",
    subItems: [
      { name: "Income Tax Compliance & Return Filing", href: "/services/income-tax-compliance-return-filing" },
      { name: "Tax Planning & Advisory", href: "/services/tax-planning-advisory" },
      { name: "Income Tax Litigation & Appeals", href: "/services/income-tax-litigation-appeals" },
    ]
  },
  {
    name: "Goods & Services Tax",
    href: "/services/goods-and-services-tax",
    subItems: [
      { name: "GST Compliance & Return Filing", href: "/services/gst-compliance-return-filing" },
      { name: "GST Advisory", href: "/services/gst-advisory" },
      { name: "GST Litigation & Appeals", href: "/services/gst-litigation-appeals" },
    ]
  },
  {
    name: "AML & KYC Services",
    href: "/services/aml-kyc-services",
    subItems: [
      { name: "KYC & Customer Due Diligence", href: "/services/kyc-customer-due-diligence" },
      { name: "AML Compliance & Risk Assessment", href: "/services/aml-compliance-risk-assessment" },
      { name: "Transaction Monitoring & Review", href: "/services/transaction-monitoring-review" },
      { name: "Sanctions & PEP Screening", href: "/services/sanctions-pep-screening" },
      { name: "AML Policies & Procedures", href: "/services/aml-policies-procedures" },
    ]
  },
  {
    name: "Forensic Accounting Services",
    href: "/services/forensic-accounting-services",
    subItems: [
      { name: "Forensic Audit & Investigation", href: "/services/forensic-audit-investigation" },
      { name: "Fraud Examination & Financial Analysis", href: "/services/fraud-examination-financial-analysis" },
      { name: "Asset Tracing & Recovery Analysis", href: "/services/asset-tracing-recovery-analysis" },
      { name: "Fraud Risk Assessment", href: "/services/fraud-risk-assessment" },
      { name: "Litigation Support", href: "/services/litigation-support" },
    ]
  },
  {
    name: "Business Setup & Corporate Services",
    href: "/services/business-setup-corporate-services",
    subItems: [
      { name: "Business & Entity Registration", href: "/services/business-entity-registration" },
      { name: "Company Incorporation", href: "/services/company-incorporation" },
      { name: "LLP Formation", href: "/services/llp-formation" },
      { name: "Business Structuring & Advisory", href: "/services/business-structuring-advisory" },
      { name: "Ongoing Compliance & Filings", href: "/services/ongoing-compliance-filings" },
    ]
  },
  {
    name: "Regulatory & Compliance Services",
    href: "/services/regulatory-compliance-services",
    subItems: [
      { name: "Statutory & Regulatory Compliance", href: "/services/statutory-regulatory-compliance" },
      { name: "Corporate Compliance", href: "/services/corporate-compliance" },
      { name: "Regulatory Advisory", href: "/services/regulatory-advisory" },
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
      <div className="bg-[#1e3a8a] text-slate-100 py-2 px-6 lg:px-12 flex items-center justify-between text-xs sm:text-sm font-medium">
        <div className="text-slate-200">Chartered Accountants &bull; Bengaluru</div>
        <div className="flex items-center gap-6">
          <a href="tel:8668555246" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">8668555246</span>
          </a>
          <a href="mailto:shantanus.associates@gmail.com" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">shantanus.associates@gmail.com</span>
          </a>
        </div>
      </div>
      
      {/* Main Navigation Bar */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm sticky top-0">
        <Link className="flex items-center gap-3 group" href="/">
          <img src="/ca-logo-cropped.png" alt="CA Logo" className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl leading-none tracking-tight text-[#0f172a]">Shantanu S &amp; Associates</span>
            <span className="text-[10px] md:text-xs tracking-widest text-[#1e3a8a] font-semibold uppercase mt-1">Chartered Accountants</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center h-full">
          <Link className="text-[14px] font-medium text-slate-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 hover:text-blue-700 transition-colors" href="/">
            Home
          </Link>

          <Link className="text-[14px] font-medium text-slate-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 hover:text-blue-700 transition-colors" href="/about">
            About
          </Link>

          {/* SERVICES DROPDOWN */}
          <div 
            className="relative h-full"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => { setShowDropdown(false); setActiveCategory(0); }}
          >
            <button className="text-[14px] font-medium text-slate-700 px-3.5 h-full flex items-center gap-1.5 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-700 transition-colors">
              <span>Services</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-transform" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 bg-white shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-slate-200/90 flex rounded-b-xl overflow-hidden min-w-[740px]">
                {/* Left Column - Categories */}
                <div className="w-[290px] bg-slate-50/80 border-r border-slate-100 py-2.5">
                  {SERVICE_CATEGORIES.map((cat, idx) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className={`flex items-center justify-between px-4 py-2.5 text-[13.5px] transition-colors ${
                        activeCategory === idx 
                          ? "bg-blue-600 text-white font-semibold shadow-xs" 
                          : "text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700"
                      }`}
                      onMouseEnter={() => setActiveCategory(idx)}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className={`h-3.5 w-3.5 ${activeCategory === idx ? "text-white" : "text-slate-400"}`} />
                    </Link>
                  ))}
                </div>
                
                {/* Right Column - Sub Items */}
                <div className="flex-1 bg-white py-3 px-4">
                  <div className="px-3 pb-2.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                      {SERVICE_CATEGORIES[activeCategory]?.name}
                    </span>
                    <Link 
                      href={SERVICE_CATEGORIES[activeCategory]?.href || "#"} 
                      className="text-xs text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
                    >
                      Overview &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {SERVICE_CATEGORIES[activeCategory]?.subItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-[13px] font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link className="text-[14px] font-medium text-slate-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 hover:text-blue-700 transition-colors" href="/news-and-resources">
            News &amp; Resources
          </Link>

          <Link className="text-[14px] font-medium text-slate-700 px-3.5 h-full flex items-center border-b-2 border-transparent hover:border-blue-600 hover:text-blue-700 transition-colors" href="/contact">
            Contact Us
          </Link>

          <div className="w-px h-6 bg-slate-200 mx-3"></div>

          <div className="flex items-center gap-2.5">
            <Link href="/#contact">
              <Button variant="outline" className="border border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg px-4 h-9 shadow-xs text-xs transition-colors">
                Enquire Now
              </Button>
            </Link>

            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 h-9 shadow-xs text-xs font-semibold transition-colors">
                Login
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile / Tablet Toggle */}
        <div className="xl:hidden flex items-center gap-2">
          <Link href="/login">
            <Button size="sm" className="bg-[#1e3a8a] text-white font-bold text-xs">
              Login
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-xl flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            Home
          </Link>

          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            About
          </Link>

          <div>
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-sm font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-3 py-2 flex flex-col gap-1.5 bg-slate-50 rounded-md my-1">
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
            className="text-sm font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            News &amp; Resources
          </Link>

          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600"
          >
            Contact Us
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-blue-600 text-blue-700 font-bold">
                Enquire Now
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#1e3a8a] text-white font-bold">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
