"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitEnquiry } from "./actions/enquiry"
import { 
  Building2, Calculator, Landmark, ArrowRight, ShieldCheck, TrendingUp, 
  Briefcase, Users, Target, ThumbsUp, Handshake, Clock,
  Globe, BookOpen, PieChart, Monitor, Activity, HardHat, Book, 
  Plane, ShoppingCart, Home, Anchor, Truck, Car, Film, Factory, FlaskConical, FileText,
  MapPin, Mail, Phone, Check,
  Settings
} from "lucide-react"
import { Navbar } from "@/components/public/Navbar"
import ServiceCarousel from "@/components/public/ServiceCarousel"
import { Footer } from "@/components/public/Footer"

const HERO_SLIDES = [
  {
    image: "/images/img_26d96e95a8.jpg",
    title: "Precision Driven Growth",
    subtitle: "Delivering strategic financial solutions for emerging startups and established enterprises.",
    buttonText: "About Us",
    buttonLink: "/about"
  },
  {
    image: "/images/img_d8e5aff3a2.jpg",
    title: "Mastery In Taxation",
    subtitle: "Comprehensive advisory and seamless compliance strategies for direct and indirect taxes.",
    buttonText: "Click Here",
    buttonLink: "/#services"
  },
  {
    image: "/images/img_b92d795e53.jpg",
    title: "Your Catalyst For Success",
    subtitle: "Dedicated partners accelerating your financial compliance and business scaling.",
    buttonText: "Know How",
    buttonLink: "/about"
  },
  {
    image: "/images/img_40577aafaa.jpg",
    title: "Excellence In Advisory",
    subtitle: "Uncompromising quality in statutory audit, business structuring, and corporate finance.",
    buttonText: "Get Started",
    buttonLink: "/#contact"
  }
];

export default function LandingPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
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
    <div className="flex flex-col min-h-screen selection:bg-blue-600 selection:text-white bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
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
                className="object-cover opacity-50 mix-blend-luminosity"
                priority={idx === 0}
                quality={75}
              />
              <div className="absolute inset-0 bg-blue-950/60 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/40"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto h-full mt-8">
                <h1 
                  className={`text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 uppercase drop-shadow-lg transition-all duration-700 delay-300 ${idx === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`text-xl md:text-2xl text-white font-medium mb-10 drop-shadow-md max-w-2xl transition-all duration-700 delay-500 ${idx === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {slide.subtitle}
                </p>
                <div className={`transition-all duration-700 delay-700 ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <Link href={slide.buttonLink}>
                    <Button size="lg" className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-10 py-7 text-lg rounded-md shadow-[0_4px_14px_0_rgba(21,128,61,0.39)] transition-transform hover:scale-105">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-transparent border-2 border-blue-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 2. ABOUT US */}
        <section id="about" className="w-full py-16 md:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#032b4e] mb-6 leading-tight">
                  About Us <span className="block text-xl md:text-2xl text-blue-600 mt-2 font-semibold">Chartered Accountants In Bangalore</span>
                </h2>
                <p className="text-slate-600 leading-[1.8] text-[16px] md:text-[18px] mb-6">
                  Shantanu S &amp; Associates is a professionally managed Chartered Accountancy firm based in Bangalore. We specialize in providing comprehensive financial, taxation, and regulatory solutions for both domestic and international enterprises. Our dynamic team comprises seasoned Chartered Accountants, Company Secretaries, and experienced business consultants. Supported by state-of-the-art infrastructure, we deliver end-to-end advisory and compliance services designed to drive your business forward.
                </p>
                <p className="text-slate-600 leading-[1.8] text-[16px] md:text-[18px] mb-8">
                  By investing time to deeply understand your unique business landscape, our experts ensure the delivery of high-value, consistent, and efficient solutions. Drawing from our profound expertise in audit, direct and indirect taxation, and corporate compliances, we align our strategies with your financial objectives. Our ultimate mission is to empower you to focus on your core operations while we handle the complexities of financial management, providing personalized services that perfectly match your specific business requirements.
                </p>
              <Link href="/about">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm px-8 py-6 shadow-md font-bold text-base mt-4 md:mt-0">
                  Read more
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-[500px] shrink-0">
              <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/img_b45366581e.jpg"
                  alt="About Shantanu S &amp; Associates"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3A. CA SERVICES WE OFFER - CAROUSEL */}
        <section id="services" className="w-full py-16 md:py-24 px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto mb-12 text-center md:text-left">
            <div className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">OUR EXPERTISE</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#032b4e] tracking-tight">CA Services We Offer</h2>
          </div>
          <ServiceCarousel />
        </section>

        {/* 3B. BUSINESS REGISTRATION */}
        <section className="w-full py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto mb-12 text-center md:text-left">
            <div className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">ESSENTIAL COMPLIANCE</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#032b4e] tracking-tight">Business Registration Services</h2>
          </div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Professional Tax Registration', slug: 'professional-tax-registration', img: '/images/img_945b206a01.jpg' },
              { title: 'MSME Udyam Registration', slug: 'msme-udyam-registration', img: '/images/img_c87e20c3b6.jpg' },
              { title: 'FSSAI Registration', slug: 'fssai-registration', img: '/images/img_dcaac2e839.jpg' },
              { title: 'RERA Registration', slug: 'rera-registration', img: '/images/img_9c1221ae6f.jpg' },
              { title: 'Shop Act Registration', slug: 'shop-act-registration', img: '/images/img_2974d83ac5.jpg' }
            ].map((srv, i) => (
              <Link href={`/services/${srv.slug}`} key={i} className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg shadow-blue-900/5 border-2 border-slate-100 cursor-pointer hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] hover:-translate-y-1 transition-all duration-500">
                <div className="h-[150px] relative overflow-hidden">
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032b4e]/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="bg-white p-5 flex-1 flex items-center justify-between">
                  <h3 className="font-bold text-[#032b4e] text-[15px] leading-snug group-hover:text-blue-600 transition-colors pr-2">{srv.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3C. COMPANY FORMATION */}
        <section className="w-full pt-16 pb-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">START YOUR JOURNEY</div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#032b4e] tracking-tight mb-4">Company Formation</h2>
              <p className="text-slate-600 text-[16px] md:text-[18px] leading-[1.8] max-w-xl mx-auto md:mx-0">Start your business with a solid legal foundation. We handle the entire incorporation process seamlessly from start to finish.</p>
            </div>
            <Link href="/services/business-registration" className="flex justify-center md:justify-end">
              <Button variant="outline" className="rounded-full px-8 h-14 text-[15px] border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 font-bold text-slate-700 transition-all shadow-sm">View All Services <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Private Limited', subtitle: 'Most popular for startups', slug: 'private-limited-company', img: '/images/img_9c5be9fd7a.jpg' },
              { title: 'One Person Company', subtitle: 'For solo entrepreneurs', slug: 'one-person-company', img: '/images/img_8087159179.jpg' },
              { title: 'LLP Registration', subtitle: 'Flexible partnership model', slug: 'llp-registration', img: '/images/img_f5258efe70.jpg' },
              { title: 'Partnership Firm', subtitle: 'Traditional joint venture', slug: 'partnership-firm-registration', img: '/images/img_4e6adef9f0.jpg' }
            ].map((srv, i) => (
              <Link href={`/services/${srv.slug}`} key={i} className="group relative bg-white border-2 border-slate-100 rounded-[2rem] p-3 shadow-lg shadow-blue-900/5 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden flex flex-col">
                <div className="h-56 w-full rounded-3xl overflow-hidden relative mb-5">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="px-3 pb-4 flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-[#032b4e] text-lg tracking-tight mb-1 group-hover:text-blue-600 transition-colors">{srv.title}</h3>
                    <p className="text-[14px] font-medium text-slate-500">{srv.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/services/business-registration" className="w-full">
              <Button variant="outline" className="w-full rounded-full h-12 text-[15px] border-slate-200 hover:bg-slate-50 font-medium">View All Services</Button>
            </Link>
          </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="w-full py-16 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <div className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">BELIEFS THAT SHAPE OUR CULTURE</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#032b4e] mb-6 tracking-tight">Our Core Values</h2>
            <p className="text-slate-600 text-[16px] md:text-[18px] leading-[1.8] max-w-3xl mx-auto">
              At the heart of our firm lies a steadfast commitment to transparency, ethical practices, and unwavering integrity. We treat our profession as a calling, ensuring that every client interaction is built on a foundation of absolute trust and mutual respect.
            </p>
          </div>
          
          <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
            {[
              { title: 'Commitment', icon: Target },
              { title: 'Integrity', icon: TrendingUp },
              { title: 'Accountability', icon: FileText },
              { title: 'Quality', icon: ThumbsUp },
              { title: 'Respect', icon: Handshake },
              { title: 'Time Value', icon: Clock }
            ].map((val, i) => (
              <div key={i} className="group bg-white flex flex-col items-center text-center gap-5 p-8 w-full rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <val.icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <span className="font-bold text-slate-900 text-[16px]">{val.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT / QUERIES OVERLAY */}
        <section id="contact" className="relative w-full py-24 px-6 lg:px-12 bg-slate-900">
          <Image
            src="/images/img_adf3301b42.jpg"
            alt="Contact background"
            fill
            sizes="100vw"
            className="object-cover z-0 mix-blend-overlay opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-blue-950/80 z-0"></div>
          
          <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/40 mb-2">
                <span className="text-2xl font-bold">24</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-[15ch]">
                Do You Have Any Queries To Discuss? Let's Talk.
              </h2>
              <div className="pt-4">
                <a href="tel:7219308077" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/20 rounded-md px-8 py-4 text-xl font-bold backdrop-blur-sm">
                  <Phone className="h-5 w-5 opacity-70" /> 7219308077
                </a>
              </div>
            </div>
            
            <div className="bg-transparent">
              <form id="enquiry-form" action={onSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input name="name" required placeholder="Name*" className="w-full bg-transparent border-b border-white/30 text-white placeholder:text-white/60 py-3 text-lg outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-0 text-white/60 text-lg">IN +91 ▾</span>
                    <input name="phone" required placeholder="Phone Number*" className="w-full bg-transparent border-b border-white/30 text-white placeholder:text-white/60 py-3 pl-20 text-lg outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <div className="relative col-span-1 sm:col-span-2">
                    <input name="email" type="email" required placeholder="Email ID*" className="w-full bg-transparent border-b border-white/30 text-white placeholder:text-white/60 py-3 text-lg outline-none focus:border-blue-400 transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <p className="text-white/80 text-[16px] font-medium">Services Interested In (Select multiple):</p>
                  <div className="flex flex-wrap gap-2.5">
                    {["Audit & Assurance", "Company Formation", "Taxation", "NRI Services", "Consultancy", "GST Registration", "Other"].map(srv => (
                      <label key={srv} className="cursor-pointer">
                        <input type="checkbox" name="serviceRequested" value={srv} className="peer sr-only" />
                        <div className="px-5 py-2 rounded-full border border-white/30 text-white/80 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white peer-checked:font-medium transition-all hover:border-white/60 text-sm select-none">
                          {srv}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="relative pt-2">
                  <input name="message" required placeholder="Enter Message" className="w-full bg-transparent border-b border-white/30 text-white placeholder:text-white/60 py-3 text-lg outline-none focus:border-blue-400 transition-colors" />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-[#0f4a7b] hover:bg-[#0c3c63] text-white font-medium px-10 py-6 rounded-md text-lg transition-colors border border-blue-400/20 shadow-lg w-full sm:w-auto" disabled={loading}>
                    {loading ? "Submitting..." : "Submit →"}
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



