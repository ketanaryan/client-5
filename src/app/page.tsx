"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitEnquiry } from "./actions/enquiry"
import { 
  Building2, ArrowRight, ShieldCheck, TrendingUp, 
  Briefcase, Users, Clock, Mail, Phone, CheckCircle2,
  FileCheck, Scale, Check
} from "lucide-react"
import { Navbar } from "@/components/public/Navbar"
import ServiceCarousel from "@/components/public/ServiceCarousel"
import { Footer } from "@/components/public/Footer"

export default function LandingPage() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    const result = await submitEnquiry(formData)
    setLoading(false)
    alert(result.message)
    if (result.success) {
      const form = document.getElementById("enquiry-form") as HTMLFormElement
      form?.reset()
    }
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-600 selection:text-white bg-white font-sans antialiased text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* 1. CLEAN EXECUTIVE DAYLIGHT HERO (HUMAN & PROFESSIONAL) */}
        <section className="relative w-full bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80 pt-12 pb-16 lg:pt-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Direct Human Positioning & Clear Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80 mb-5">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>Chartered Accountants &bull; Bengaluru &amp; Pan-India Practice</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold text-[#0B1425] tracking-tight leading-[1.18] mb-3">
                Audit, Taxation &amp; Corporate Advisory Services
              </h1>

              <p className="text-base sm:text-lg text-blue-800 font-semibold mb-4">
                Shantanu S &amp; Associates &bull; Chartered Accountants
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Partner-led statutory audits, corporate tax planning, GST compliance, and entity incorporation for growing businesses, startups, and established enterprises.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link href="/#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 h-12 text-sm rounded-lg shadow-sm hover:shadow transition-all w-full sm:w-auto">
                    Schedule Consultation <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/#services">
                  <button className="h-12 px-6 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-xs flex items-center justify-center w-full sm:w-auto">
                    Explore Practice Areas
                  </button>
                </Link>
              </div>

              {/* Sub-credibility checklist */}
              <div className="pt-8 mt-8 border-t border-slate-200 w-full flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Direct Partner Engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>ICAI Standards on Auditing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Head Office: JP Nagar, Bengaluru</span>
                </div>
              </div>
            </div>

            {/* Right Column: Real Professional Photography */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100 group">
                <Image
                  src="/images/finance_taxation.jpg"
                  alt="Shantanu S &amp; Associates Chartered Accountants Bengaluru"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Floating Bottom Info Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-white/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900">Direct Partner Consultation</p>
                      <p className="text-[11px] text-slate-600">Statutory Audit &bull; Taxation &bull; Corporate Desk</p>
                    </div>
                    <a 
                      href="tel:8668555246" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> 8668555246
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 3-PILLAR INSTITUTIONAL TRUST STRIP */}
        <section className="w-full bg-slate-50 border-b border-slate-200/80 py-10 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-xs border border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-2 sm:p-3">
            <div className="p-5 sm:p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] tracking-tight">ICAI Regulatory Rigor</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 font-normal mt-1 leading-relaxed">
                  Strict adherence to ICAI Standards on Auditing (SAs) and statutory financial reporting guidelines.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] tracking-tight">Strategic Tax Architecture</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 font-normal mt-1 leading-relaxed">
                  Direct and Indirect tax planning, proactive GST reconciliations, and representation before authorities.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] tracking-tight">Single-Window Corporate Advisory</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 font-normal mt-1 leading-relaxed">
                  End-to-end incorporation, ROC secretarial filings, and ongoing compliance under partner supervision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT US */}
        <section id="about" className="w-full pt-20 pb-20 md:pt-28 md:pb-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>About The Practice</span>
              </div>
              
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1425] tracking-tight leading-tight">
                  Shantanu S &amp; Associates
                </h2>
                <p className="text-base sm:text-lg text-blue-700 font-medium mt-1">
                  Chartered Accountants &bull; Bengaluru
                </p>
              </div>

              {/* High-Impact Institutional Thesis */}
              <p className="text-slate-700 leading-relaxed text-sm sm:text-[15.5px]">
                We deliver institutional-grade statutory audit, forward-looking taxation architecture, and comprehensive corporate regulatory governance. Headquartered in Bengaluru, our practice combines meticulous statutory precision with partner-led strategic counsel to safeguard corporate compliance and empower sustainable growth.
              </p>

              {/* 3 Scannable Practice Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    01
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Partner-Led</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct partner supervision on audits, tax assessments, and structuring matters.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    02
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Multi-Disciplinary</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cohesive coordination across CAs, CS professionals, and tax specialists.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    03
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Audit-Ready</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proactive internal controls and full ICAI compliance for total legal confidence.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link href="/about">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-5 font-semibold text-xs sm:text-sm shadow-xs transition-all">
                    Explore Firm Profile &amp; Leadership <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/contact" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors">
                  Meet Our Advisors &rarr;
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 group">
                <Image
                  src="/images/img_b45366581e.jpg"
                  alt="Shantanu S &amp; Associates Chartered Accountants"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Institutional Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Shantanu S &amp; Associates</p>
                      <p className="text-[11px] text-slate-600">Bengaluru Head Office &bull; Regulatory Advisory Desk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CA SERVICES WE OFFER - CAROUSEL */}
        <section id="services" className="w-full py-18 md:py-24 px-6 lg:px-12 bg-slate-50/70 border-t border-slate-200/80">
          <div className="max-w-[1200px] mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-blue-700 font-semibold uppercase tracking-wider text-xs mb-2">PRACTICE DOMAINS</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1425] tracking-tight">Core Chartered Accountancy Services</h2>
              <p className="text-slate-600 text-sm md:text-[15px] mt-2 max-w-2xl leading-relaxed">
                Eight specialized practice domains delivering technical rigor, tax optimization, and regulatory governance for modern enterprises.
              </p>
            </div>
            <Link href="/services/audit-and-assurance" className="hidden md:inline-flex">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:text-blue-700 hover:border-blue-600 font-semibold text-xs rounded-lg px-4 h-10">
                View All Practices &rarr;
              </Button>
            </Link>
          </div>
          
          <ServiceCarousel />
        </section>

        {/* 5. CORPORATE SETUP & ENTITY ADVISORY HUB */}
        <section className="w-full py-18 md:py-24 px-6 lg:px-12 bg-white border-t border-slate-200/80">
          <div className="max-w-[1200px] mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-blue-700 font-semibold uppercase tracking-wider text-xs mb-2">CORPORATE ADVISORY</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1425] tracking-tight">Entity Incorporation &amp; Corporate Structuring</h2>
              <p className="text-slate-600 text-sm md:text-[15px] mt-2 max-w-2xl leading-relaxed">
                Establish and structure your business on rock-solid legal foundations with end-to-end entity incorporation and statutory licensing.
              </p>
            </div>
            <Link href="/services/business-setup-corporate-services">
              <Button variant="outline" className="rounded-lg px-5 h-10 text-xs border-slate-300 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold text-slate-800 transition-all shadow-xs">
                All Corporate Services <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Private Limited Company', 
                badge: 'Venture & Growth', 
                desc: 'Premier incorporation vehicle for scalable startups, external equity investment, and limited liability.', 
                slug: 'company-incorporation', 
                img: '/images/img_9c5be9fd7a.jpg' 
              },
              { 
                title: 'LLP Formation', 
                badge: 'Professional & Flexible', 
                desc: 'Tax-efficient corporate partnership combining limited liability with organizational flexibility.', 
                slug: 'llp-formation', 
                img: '/images/img_f5258efe70.jpg' 
              },
              { 
                title: 'One Person Company', 
                badge: 'Solo Founders', 
                desc: 'Corporate status, legal identity, and limited liability for single entrepreneurs and founders.', 
                slug: 'company-incorporation', 
                img: '/images/img_8087159179.jpg' 
              },
              { 
                title: 'Business Structuring & Licences', 
                badge: 'Statutory Licensing', 
                desc: 'Founder structuring, capital tables, MSME Udyam, Professional Tax, and trade registrations.', 
                slug: 'business-structuring-advisory', 
                img: '/images/img_4e6adef9f0.jpg' 
              }
            ].map((item, i) => (
              <Link 
                href={`/services/${item.slug}`} 
                key={i} 
                className="group relative bg-white border border-slate-200/90 hover:border-blue-500 rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full rounded-lg overflow-hidden relative mb-4 bg-slate-900">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Explore Structuring</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. ENQUIRY / DIRECT ADVISORY DESK */}
        <section id="contact" className="w-full py-20 md:py-24 px-6 lg:px-12 bg-gradient-to-br from-[#070e1c] via-[#0B1425] to-[#14233C] relative overflow-hidden text-white">
          <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/25">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span>Direct Advisory Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white">
                Have Statutory or Advisory Queries? Let's Connect.
              </h2>
              <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed">
                Connect directly with our Chartered Accountants at Shantanu S &amp; Associates for transparent consultations, statutory audits, tax planning, and corporate compliance health-checks.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Partner response within 24 business hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Confidential and non-disclosure advisory protocol</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="tel:+918668555246" 
                  className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/20 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-xs"
                >
                  <Phone className="h-4 w-4 text-blue-400" /> +91-8668555246
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <form id="enquiry-form" action={onSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">Your Full Name*</label>
                    <input 
                      name="name" 
                      required 
                      placeholder="e.g. Rahul Sharma" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">Phone Number*</label>
                    <input 
                      name="phone" 
                      required 
                      placeholder="+91 98765 43210" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">Corporate / Personal Email*</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="name@company.com" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-1">
                  <p className="text-slate-300 text-xs font-medium">Practice Area of Interest:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Audit & Assurance", 
                      "Accounting & Financial Services", 
                      "Direct Taxation", 
                      "Goods & Services Tax", 
                      "AML & KYC Services", 
                      "Forensic Accounting", 
                      "Business Setup & Corporate", 
                      "Regulatory & Compliance", 
                      "Other"
                    ].map(srv => (
                      <label key={srv} className="cursor-pointer">
                        <input type="checkbox" name="serviceRequested" value={srv} className="peer sr-only" />
                        <div className="px-3 py-1.5 rounded-lg border border-white/20 text-slate-300 text-xs font-medium peer-checked:bg-blue-600 peer-checked:border-blue-500 peer-checked:text-white transition-all hover:border-white/40 select-none">
                          {srv}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Specific Requirement / Query*</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={3}
                    placeholder="Brief description of your business structure or statutory requirement..." 
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors resize-none" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all shadow-xs w-full sm:w-auto" 
                    disabled={loading}
                  >
                    {loading ? "Submitting Inquiry..." : "Submit Enquiry →"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      {/* 7. FOOTER */}
      <Footer />
    </div>
  )
}
