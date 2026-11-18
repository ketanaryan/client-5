"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { submitEnquiry } from "./actions/enquiry"
import { 
  Building2, ArrowRight, ShieldCheck, TrendingUp, 
  Briefcase, Users, Clock, Mail, Phone, CheckCircle2 
} from "lucide-react"
import { Navbar } from "@/components/public/Navbar"
import ServiceCarousel from "@/components/public/ServiceCarousel"
import { Footer } from "@/components/public/Footer"

const HERO_SLIDES = [
  {
    image: "/images/img_26d96e95a8.jpg",
    title: "Precision-Driven Financial Architecture",
    subtitle: "High-value statutory audit, taxation, and corporate regulatory advisory for emerging startups and established enterprises.",
    buttonText: "About The Practice",
    buttonLink: "/about"
  },
  {
    image: "/images/img_d8e5aff3a2.jpg",
    title: "Strategic Direct & Indirect Tax Advisory",
    subtitle: "Complete income tax planning, dynamic GST ITC reconciliation, and high-stakes litigation representation.",
    buttonText: "Explore Services",
    buttonLink: "/#services"
  },
  {
    image: "/images/img_b92d795e53.jpg",
    title: "Corporate Governance & Compliance Desk",
    subtitle: "End-to-end company incorporation, MCA secretarial filings, and robust internal financial controls.",
    buttonText: "Schedule Consultation",
    buttonLink: "/#contact"
  },
  {
    image: "/images/img_40577aafaa.jpg",
    title: "Independent Forensic & Assurance Services",
    subtitle: "Objective statutory audits, internal risk reviews, forensic investigations, and dispute support.",
    buttonText: "Get In Touch",
    buttonLink: "/contact"
  }
];

export default function LandingPage() {
  const [loading, setLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

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
    <div className="flex flex-col min-h-screen selection:bg-blue-600 selection:text-white bg-white font-sans antialiased">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[85vh] min-h-[580px] max-h-[780px] flex items-center justify-center bg-[#070e1c] overflow-hidden border-b border-[#15233A]">
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={idx} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover opacity-35"
                priority={idx === 0}
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c] via-[#070e1c]/60 to-[#070e1c]/30"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto h-full">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/25 mb-5 backdrop-blur-sm">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Chartered Accountants • Bengaluru</span>
                </div>

                <h1 
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight transition-all duration-700 delay-200 ${idx === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`text-sm sm:text-base md:text-lg text-slate-300 font-normal mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-400 ${idx === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                  {slide.subtitle}
                </p>
                <div className={`transition-all duration-700 delay-500 ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <Link href={slide.buttonLink}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-5 text-sm rounded-lg shadow-sm hover:shadow-md transition-all">
                      {slide.buttonText} <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Sleek Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-20">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-10 bg-blue-500' 
                    : 'w-3.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 2. ABOUT US */}
        <section id="about" className="w-full py-18 md:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-14 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>About The Practice</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1425] tracking-tight leading-tight">
                Shantanu S &amp; Associates <span className="block text-xl md:text-2xl text-blue-700 font-semibold mt-1">Chartered Accountants • Bengaluru</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px] md:text-[16.5px]">
                Shantanu S &amp; Associates is a professionally managed Chartered Accountancy firm based in Bangalore. We specialize in providing comprehensive financial, taxation, and regulatory solutions for both domestic and international enterprises. Our dynamic team comprises seasoned Chartered Accountants, Company Secretaries, and experienced business consultants. Supported by state-of-the-art infrastructure, we deliver end-to-end advisory and compliance services designed to drive your business forward.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] md:text-[16.5px]">
                By investing time to deeply understand your unique business landscape, our experts ensure the delivery of high-value, consistent, and efficient solutions. Drawing from our profound expertise in audit, direct and indirect taxation, and corporate compliances, we align our strategies with your financial objectives. Our ultimate mission is to empower you to focus on your core operations while we handle the complexities of financial management.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-7 py-5 font-bold text-sm shadow-sm transition-all">
                    Read More About Us <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[480px] shrink-0">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                <Image
                  src="/images/img_b45366581e.jpg"
                  alt="About Shantanu S &amp; Associates"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3A. CA SERVICES WE OFFER - CAROUSEL */}
        <section id="services" className="w-full py-16 md:py-24 px-6 lg:px-12 bg-slate-50/70 border-t border-slate-200/80">
          <div className="max-w-[1200px] mx-auto mb-12 text-center md:text-left">
            <div className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">PRACTICE DOMAINS</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1425] tracking-tight">CA Services We Offer</h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl">Comprehensive statutory, audit, and tax disciplines tailored for growing businesses.</p>
          </div>
          <ServiceCarousel />
        </section>

        {/* 3B. BUSINESS REGISTRATION */}
        <section className="w-full py-16 px-6 lg:px-12 bg-white border-t border-slate-100">
          <div className="max-w-[1200px] mx-auto mb-10 text-center md:text-left">
            <div className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">ESSENTIAL COMPLIANCE</div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1425] tracking-tight">Business Registration Services</h2>
          </div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'Professional Tax Registration', slug: 'business-entity-registration', img: '/images/img_945b206a01.jpg' },
              { title: 'MSME Udyam Registration', slug: 'msme-udyam-registration', img: '/images/img_c87e20c3b6.jpg' },
              { title: 'FSSAI Registration', slug: 'business-entity-registration', img: '/images/img_dcaac2e839.jpg' },
              { title: 'RERA Registration', slug: 'business-entity-registration', img: '/images/img_9c1221ae6f.jpg' },
              { title: 'Shop Act Registration', slug: 'business-entity-registration', img: '/images/img_2974d83ac5.jpg' }
            ].map((srv, i) => (
              <Link href={`/services/${srv.slug}`} key={i} className="group relative flex flex-col rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all duration-300">
                <div className="h-[140px] relative overflow-hidden bg-slate-900">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
                <div className="bg-white p-4 flex-1 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors pr-2">{srv.title}</h3>
                  <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0 border border-slate-200/60">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3C. COMPANY FORMATION */}
        <section className="w-full py-16 px-6 lg:px-12 bg-slate-50/60 border-t border-slate-200/80">
          <div className="max-w-[1200px] mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">ENTITY INCORPORATION</div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1425] tracking-tight mb-2">Company Formation</h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto md:mx-0">Establish your enterprise on solid legal ground with seamless end-to-end incorporation.</p>
            </div>
            <Link href="/services/business-setup-corporate-services" className="flex justify-center md:justify-end">
              <Button variant="outline" className="rounded-lg px-6 h-11 text-xs border-slate-300 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-slate-800 transition-all shadow-sm">
                View All Corporate Services <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Private Limited Company', subtitle: 'Premier choice for venture-backed startups', slug: 'company-incorporation', img: '/images/img_9c5be9fd7a.jpg' },
              { title: 'One Person Company (OPC)', subtitle: 'Limited liability vehicle for solo founders', slug: 'company-incorporation', img: '/images/img_8087159179.jpg' },
              { title: 'LLP Formation', subtitle: 'Tax-efficient flexible partnership model', slug: 'llp-formation', img: '/images/img_f5258efe70.jpg' },
              { title: 'Business Structuring', subtitle: 'Comprehensive founder & capital advisory', slug: 'business-structuring-advisory', img: '/images/img_4e6adef9f0.jpg' }
            ].map((srv, i) => (
              <Link href={`/services/${srv.slug}`} key={i} className="group relative bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                <div className="h-44 w-full rounded-lg overflow-hidden relative mb-4 bg-slate-900">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors mb-1">{srv.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{srv.subtitle}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                    <span>Explore Advisory</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. ENQUIRY FORM */}
        <section id="contact" className="w-full py-20 px-6 lg:px-12 bg-gradient-to-br from-[#070e1c] via-[#0B1425] to-[#14233C] relative overflow-hidden text-white">
          <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/25">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span>Direct Advisory Desk</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white">
                Have Statutory or Advisory Queries? Let's Connect.
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Connect directly with our Chartered Accountants at Shantanu S &amp; Associates for transparent consultations, compliance health-checks, and tax planning.
              </p>
              <div className="pt-2">
                <a 
                  href="tel:+918668555246" 
                  className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/20 rounded-xl px-6 py-3.5 text-base font-bold text-white shadow-sm"
                >
                  <Phone className="h-5 w-5 text-blue-400" /> +91-8668555246
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <form id="enquiry-form" action={onSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Your Full Name*</label>
                    <input 
                      name="name" 
                      required 
                      placeholder="e.g. Rahul Sharma" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Phone Number*</label>
                    <input 
                      name="phone" 
                      required 
                      placeholder="+91 98765 43210" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Corporate / Personal Email*</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="name@company.com" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-1">
                  <p className="text-slate-300 text-xs font-semibold">Practice Area of Interest:</p>
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
                        <div className="px-3.5 py-1.5 rounded-lg border border-white/20 text-slate-300 text-xs font-medium peer-checked:bg-blue-600 peer-checked:border-blue-500 peer-checked:text-white transition-all hover:border-white/40 select-none">
                          {srv}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Specific Requirement / Query*</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={3}
                    placeholder="Brief description of your business structure or statutory requirement..." 
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 focus:bg-white/10 transition-colors resize-none" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg text-sm transition-all shadow-sm w-full sm:w-auto" 
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
      
      {/* 5. MEGA FOOTER */}
      <Footer />
    </div>
  )
}
