"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitEnquiry } from "./actions/enquiry"
import { 
  Building2, Calculator, Landmark, ArrowRight, ShieldCheck, TrendingUp, 
  Target, ThumbsUp, Handshake, Clock, FileText,
  Phone, Mail, CheckCircle2, Award, Sparkles, Check
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
    <div className="flex flex-col min-h-screen selection:bg-blue-600 selection:text-white bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION - Single Sharp Static Hero (No slider) */}
        <section className="relative w-full bg-[#032b4e] py-20 md:py-28 px-6 lg:px-12 text-white overflow-hidden border-b border-blue-950">
          {/* Subtle background glow and geometric grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-200 text-xs sm:text-[13px] font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Chartered Accountants &bull; Bengaluru &amp; Pan-India Advisory
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Precision Financial Architecture &amp; Strategic Compliance
              </h1>

              <p className="text-slate-300 text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-2xl font-normal">
                Delivering high-value statutory audit, taxation, business structuring, and corporate regulatory advisory for emerging businesses, established enterprises, and global investors.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="#contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 text-[15px] rounded shadow-md transition-all">
                    Enquire Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link href="#services">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold px-6 h-12 text-[15px] rounded backdrop-blur-sm transition-all">
                    Our Services
                  </Button>
                </Link>

                <Link href="/login">
                  <Button variant="outline" className="border-blue-400/30 text-blue-200 hover:bg-blue-900/40 hover:text-white font-semibold px-6 h-12 text-[15px] rounded transition-all">
                    Client Portal
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium">Direct &amp; Indirect Tax</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium">Statutory &amp; Internal Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium">ROC &amp; Corporate Laws</span>
                </div>
              </div>
            </div>

            {/* Right Card - Sharp Practice Profile Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-8 shadow-2xl relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Shantanu &amp; Associates</h3>
                    <p className="text-xs text-blue-300 font-medium mt-0.5">Chartered Accountants &bull; Practice Desk</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white font-bold text-sm">
                    CA
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-200">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block text-[13.5px]">End-to-End Compliance</strong>
                      <span className="text-xs text-slate-300">GST, Income Tax, TDS, ROC, and Secretarial Filings under one unified roof.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block text-[13.5px]">Strategic Enterprise Growth</strong>
                      <span className="text-xs text-slate-300">Structuring Pvt Ltd, LLP, JV agreements, and cross-border tax efficiencies.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block text-[13.5px]">Led by CA Shantanu</strong>
                      <span className="text-xs text-slate-300">Partner-led advisory ensuring senior attention on every audit and compliance matter.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Fast consultation scheduling</span>
                  <Link href="#contact" className="text-blue-300 font-bold hover:text-white flex items-center gap-1">
                    Book Call <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT US - Sharp Clean Presentation */}
        <section id="about" className="w-full py-16 md:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
              <div className="text-blue-700 font-bold uppercase tracking-widest text-xs">PRACTICE PROFILE</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#032b4e] leading-tight tracking-tight">
                About Us <span className="block text-xl md:text-2xl text-blue-700 mt-2 font-semibold">Chartered Accountants in Bangalore</span>
              </h2>
              <p className="text-slate-600 leading-[1.8] text-[15px] sm:text-[16px]">
                Shantanu &amp; Associates is a premier, professionally managed Chartered Accountancy firm based in Bangalore. We specialize in providing comprehensive financial, taxation, and regulatory solutions for both domestic and international enterprises. Our dynamic team comprises seasoned Chartered Accountants, Company Secretaries, and experienced business consultants. Supported by state-of-the-art infrastructure, we deliver end-to-end advisory and compliance services designed to drive your business forward.
              </p>
              <p className="text-slate-600 leading-[1.8] text-[15px] sm:text-[16px]">
                By investing time to deeply understand your unique business landscape, our experts ensure the delivery of high-value, consistent, and efficient solutions. Drawing from our profound expertise in audit, direct and indirect taxation, and corporate compliances, we align our strategies with your financial objectives.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button className="bg-[#032b4e] hover:bg-blue-900 text-white rounded px-8 h-12 shadow-sm font-bold text-sm">
                    Read More About Firm <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Card: Executive "Shantanu" Profile Card (Replaces generic stock photo) */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div className="bg-gradient-to-br from-[#032b4e] via-[#093d6b] to-[#021f38] text-white rounded-xl p-8 sm:p-10 shadow-xl border border-blue-900 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-extrabold text-xl text-white">
                    CA
                  </div>
                  <span className="text-xs font-bold tracking-widest text-blue-200 uppercase">
                    Managing Partner
                  </span>
                </div>

                <div className="py-8 space-y-2">
                  <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold block">
                    FOUNDER &amp; FIRM LEAD
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
                    Shantanu
                  </h3>
                  <p className="text-blue-100 text-sm font-medium">
                    B.Com, FCA, DISA (ICAI) &bull; Chartered Accountant
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed pt-3">
                    Providing strategic clarity, regulatory audits, and proactive tax architecture for high-growth enterprises and business families.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded bg-white/5 border border-white/10">
                    <span className="text-xl font-bold text-white block">15+</span>
                    <span className="text-[11px] text-slate-300">Years Domain Mastery</span>
                  </div>
                  <div className="p-3 rounded bg-white/5 border border-white/10">
                    <span className="text-xl font-bold text-white block">500+</span>
                    <span className="text-[11px] text-slate-300">Enterprises Advised</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3A. CA SERVICES WE OFFER - CAROUSEL */}
        <section id="services" className="w-full py-16 md:py-24 px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto mb-12 text-center md:text-left">
            <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">OUR EXPERTISE</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#032b4e] tracking-tight">CA Services We Offer</h2>
          </div>
          <ServiceCarousel />
        </section>

        {/* 3B. BUSINESS REGISTRATION */}
        <section className="w-full py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto mb-10 text-center md:text-left">
            <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">ESSENTIAL COMPLIANCE</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#032b4e] tracking-tight">Business Registration Services</h2>
          </div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'Professional Tax Registration', slug: 'professional-tax-registration', img: '/images/img_945b206a01.jpg' },
              { title: 'MSME Udyam Registration', slug: 'msme-udyam-registration', img: '/images/img_c87e20c3b6.jpg' },
              { title: 'FSSAI Registration', slug: 'fssai-registration', img: '/images/img_dcaac2e839.jpg' },
              { title: 'RERA Registration', slug: 'rera-registration', img: '/images/img_9c1221ae6f.jpg' },
              { title: 'Shop Act Registration', slug: 'shop-act-registration', img: '/images/img_2974d83ac5.jpg' }
            ].map((srv, i) => (
              <Link href={`/services/${srv.slug}`} key={i} className="group relative flex flex-col rounded-lg overflow-hidden bg-white shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <div className="h-[140px] relative overflow-hidden">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032b4e]/85 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-white p-4 flex-1 flex items-center justify-between">
                  <h3 className="font-bold text-[#032b4e] text-[14px] leading-snug group-hover:text-blue-700 transition-colors pr-2">{srv.title}</h3>
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3C. COMPANY FORMATION */}
        <section className="w-full pt-12 pb-20 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">START YOUR ENTERPRISE</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#032b4e] tracking-tight mb-2">Company Formation</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
                Incorporate your business with a solid legal foundation. We handle name approval, digital signatures, MOA/AOA drafting, and MCA filing end-to-end.
              </p>
            </div>
            <Link href="/services/corporate-laws" className="flex justify-center md:justify-end">
              <Button variant="outline" className="rounded px-6 h-11 text-sm border-slate-300 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-slate-700 transition-all">
                View All Structures <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Private Limited', subtitle: 'Most popular for startups & ventures', slug: 'private-limited-company', img: '/images/img_9c5be9fd7a.jpg' },
              { title: 'One Person Company', subtitle: 'For solo entrepreneurs & directors', slug: 'one-person-company', img: '/images/img_8087159179.jpg' },
              { title: 'LLP Registration', subtitle: 'Flexible limited liability partnership', slug: 'llp-registration', img: '/images/img_f5258efe70.jpg' },
              { title: 'Partnership Firm', subtitle: 'Traditional joint venture model', slug: 'partnership-firm-registration', img: '/images/img_4e6adef9f0.jpg' }
            ].map((srv, i) => (
              <Link href={`/services/${srv.slug}`} key={i} className="group bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="h-48 w-full rounded overflow-hidden relative mb-4">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 pb-2 flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-[#032b4e] text-base tracking-tight mb-1 group-hover:text-blue-700 transition-colors">{srv.title}</h3>
                    <p className="text-xs font-medium text-slate-500">{srv.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="w-full py-16 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto text-center mb-12">
            <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">OUR PROFESSIONAL CODE</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#032b4e] mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Built on transparency, ethical independence, and strict adherence to ICAI standards. Every engagement is executed with confidentiality and fiduciary responsibility.
            </p>
          </div>
          
          <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Commitment', icon: Target },
              { title: 'Integrity', icon: TrendingUp },
              { title: 'Accountability', icon: FileText },
              { title: 'Quality', icon: ThumbsUp },
              { title: 'Respect', icon: Handshake },
              { title: 'Time Value', icon: Clock }
            ].map((val, i) => (
              <div key={i} className="group bg-white flex flex-col items-center text-center gap-4 p-6 rounded-lg shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <val.icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="font-bold text-slate-800 text-sm">{val.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT / ENQUIRY SECTION */}
        <section id="contact" className="relative w-full py-20 px-6 lg:px-12 bg-[#032b4e] text-white">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
                <Phone className="w-3.5 h-3.5" /> Direct Consultation
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                Have Queries To Discuss? Let&apos;s Connect.
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Whether you need advice on company incorporation, GST compliance, or comprehensive statutory audit, our advisory desk is ready to assist.
              </p>

              <div className="pt-2 space-y-3">
                <a 
                  href="tel:8668555246" 
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/15 rounded p-4 text-base font-bold text-white w-full sm:w-auto"
                >
                  <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                  <span>Call: 8668555246 / 7219308077</span>
                </a>

                <a 
                  href="mailto:shantanus.associates@gmail.com" 
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/15 rounded p-4 text-sm font-medium text-slate-200"
                >
                  <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                  <span>shantanus.associates@gmail.com</span>
                </a>
              </div>
            </div>
            
            {/* Right Form */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-8 sm:p-10 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Send An Enquiry</h3>
              <p className="text-xs text-slate-300 mb-6">Fill out your details below and our practice desk will get back within 24 hours.</p>

              <form id="enquiry-form" action={onSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name *</label>
                    <input 
                      name="name" 
                      required 
                      placeholder="e.g. Rajesh Kumar" 
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 py-2.5 px-3.5 rounded text-sm outline-none focus:border-blue-400 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number *</label>
                    <input 
                      name="phone" 
                      required 
                      placeholder="+91 98765 43210" 
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 py-2.5 px-3.5 rounded text-sm outline-none focus:border-blue-400 transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email ID *</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="name@company.com" 
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 py-2.5 px-3.5 rounded text-sm outline-none focus:border-blue-400 transition-colors" 
                  />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Services Interested In:</label>
                  <div className="flex flex-wrap gap-2">
                    {["Audit & Assurance", "Company Formation", "Taxation", "NRI Services", "Consultancy", "GST Registration", "Other"].map(srv => (
                      <label key={srv} className="cursor-pointer">
                        <input type="checkbox" name="serviceRequested" value={srv} className="peer sr-only" />
                        <div className="px-3.5 py-1.5 rounded border border-white/20 text-slate-200 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white peer-checked:font-semibold transition-all hover:border-white/40 text-xs select-none">
                          {srv}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Message or Requirement *</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={3}
                    placeholder="Briefly describe your requirements..." 
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 py-2.5 px-3.5 rounded text-sm outline-none focus:border-blue-400 transition-colors resize-none" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 rounded text-sm transition-all shadow-md w-full sm:w-auto" 
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Enquiry →"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      {/* 8. MEGA FOOTER */}
      <Footer />
    </div>
  )
}
