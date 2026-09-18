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
  Star, MapPin, Mail, Phone, Check,
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
                  Shantanu & Associates, Chartered Accountant in Bangalore is a professionally managed firm catering to domestic and international clients with wide range of services in domestic and international taxation, regulatory and advisory services and cross border transaction related services. The team at S&A is a Firm of CA in Bangalore and has dedicated, experienced and expert professionals and associates like Chartered Accountants, Company Secretary and Consultants and high-end infrastructure to provide end to end services to your business. 
                </p>
                <p className="text-slate-600 leading-[1.8] text-[16px] md:text-[18px] mb-8">
                  With effort of gaining deep understanding of your business, our qualified team is committed to provide valuable, consistent and efficient services based on its in-depth knowledge and wide experience in the areas of audit, taxation, regulatory compliances and related business services. Our objective is to help our clients to focus on and achieve their business and financial goals by providing them services that is personalized and tailored to meet our client&apos;s requirements and suit their business the best.
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
                  alt="About Shantanu & Associates"
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
              Our firm believes in and follows a culture of faith, integrity, and ethics at all levels when delivering services to every client. Our profession is our faith.
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

        {/* 5. INDUSTRIES */}
        <section className="w-full py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <div className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-3">OUR INDUSTRIES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Business We Served</h2>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-slate-100 shadow-sm">
            {[
              { title: 'Information Technology', icon: Monitor, img: '/images/img_040257aafd.jpg' },
              { title: 'Pharmaceuticals & Healthcare', icon: Activity, img: '/images/finance_taxation.jpg' },
              { title: 'Engineering & Infra', icon: HardHat, img: '/images/img_5945e74e47.jpg' },
              { title: 'Education Sector', icon: Book, img: '/images/corporate_registration.jpg' },
              { title: 'Banking & Financial', icon: Landmark, img: '/images/img_f89b625898.jpg' },
              { title: 'Import & Export', icon: Plane, img: '/images/img_ba3ceb5181.jpg' },
              { title: 'E-Commerce & Retail', icon: ShoppingCart, img: '/images/img_eb1c0f1ffb.jpg' },
              { title: 'Real Estate', icon: Home, img: '/images/img_b2b2b96a7f.jpg' },
              { title: 'Vessels & Marine', icon: Anchor, img: '/images/audit_advisory.jpg' },
              { title: 'Logistics Services', icon: Truck, img: '/images/img_cc67e33ce5.jpg' },
              { title: 'Automobiles Industry', icon: Car, img: '/images/img_8b7a385dd4.jpg' },
              { title: 'Media & Entertainment', icon: Film, img: '/images/img_1b0592f97b.jpg' },
              { title: 'Manufacturing', icon: Factory, img: '/images/img_e029799d49.jpg' },
              { title: 'Non Profit Org', icon: Users, img: '/images/img_d5604c9f88.jpg' },
              { title: 'Chemical Sector', icon: FlaskConical, img: '/images/img_849418b560.jpg' }
            ].map((ind, i) => (
              <Link href="/#contact" key={i} className="group relative p-8 border border-slate-100 flex flex-col items-center justify-center text-center aspect-[4/3] hover:z-10 cursor-pointer bg-white overflow-hidden">
                {/* Default State: Clean White Background (no ghost image) */}
                <div className="absolute inset-0 bg-white z-0 group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Hover State: Image fades in and scales */}
                <Image
                  src={ind.img}
                  alt={ind.title}
                  fill
                  sizes="(max-width: 1024px) 25vw, 20vw"
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 z-0"
                  loading="lazy"
                />
                {/* Hover Dark Overlay */}
                <div className="absolute inset-0 bg-blue-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                
                {/* Content (z-20 keeps it above the image/overlay) */}
                <div className="relative z-20 flex flex-col items-center">
                  <ind.icon className="h-10 w-10 text-blue-500 mb-4 group-hover:text-white transition-colors duration-300 stroke-[1.5] group-hover:-translate-y-2 transform" />
                  <h3 className="font-semibold text-slate-800 text-[14px] leading-snug group-hover:text-white transition-all duration-300 px-2 group-hover:translate-y-1 transform">{ind.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. HAPPY CLIENTS */}
        <section className="w-full py-28 bg-[#f8fafc] border-y border-slate-200 overflow-hidden relative">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="max-w-[1200px] mx-auto text-center mb-16 px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">Happy Clients</h2>
            
            <div className="inline-flex flex-col items-center justify-center gap-1 bg-white px-8 py-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <span className="font-bold text-xl text-slate-900 tracking-tight">EXCELLENT</span>
              <div className="flex gap-1 mb-1">
                {[1,2,3,4,5].map(star => <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm text-slate-500 mt-1 font-medium">Based on <strong>100+ reviews</strong></span>
              <div className="mt-2 text-2xl font-bold text-blue-500 tracking-tighter">Google</div>
            </div>
          </div>
          
          <div className="relative w-full max-w-[100vw]">
            {/* Gradient Masks for smooth fading edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-[max-content] animate-marquee pb-8 pt-4">
              {/* Duplicate the array to create the infinite scroll effect */}
              {[...[
                { name: 'Haresh Dudani', initial: 'H', bg: 'bg-blue-600', time: '2 years ago', review: 'We recently had the pleasure of working with Mr. Jitesh for my tax filing needs, and I am thoroughly impressed with his professionalism and accuracy...' },
                { name: 'Sunil Kamble', img: '/images/img_4c2f6fd813.jpg', time: '2 years ago', review: 'One of the leading chartered accountancy firms in Whitefield, Bangalore, is highly regarded for the exceptional support provided by Jitesh Sir and his team.' },
                { name: 'Parth Patel', img: '/images/img_474bec6fde.jpg', time: '2 years ago', review: 'I have engaged with Jitesh bhai and his team since the past 3 years. They have filed my IT returns. They are very knowledgeable, responsive, and do a...' },
                { name: 'Sneha Rao', initial: 'S', bg: 'bg-indigo-500', time: '1 year ago', review: 'Extremely professional and prompt service. They handled my GST registration flawlessly without me having to visit any office.' },
                { name: 'Kiran Desai', img: '/images/img_74a9fa160d.jpg', time: '8 months ago', review: 'The audit was conducted very smoothly. Their attention to detail and guidance on compliance has saved us from several potential penalties.' },
                { name: 'Aditi Sharma', initial: 'A', bg: 'bg-emerald-500', time: '3 months ago', review: 'Highly recommend! The entire team is very cooperative and they ensure all queries are resolved on priority.' }
              ], ...[
                { name: 'Haresh Dudani', initial: 'H', bg: 'bg-blue-600', time: '2 years ago', review: 'We recently had the pleasure of working with Mr. Jitesh for my tax filing needs, and I am thoroughly impressed with his professionalism and accuracy...' },
                { name: 'Sunil Kamble', img: '/images/img_4c2f6fd813.jpg', time: '2 years ago', review: 'One of the leading chartered accountancy firms in Whitefield, Bangalore, is highly regarded for the exceptional support provided by Jitesh Sir and his team.' },
                { name: 'Parth Patel', img: '/images/img_474bec6fde.jpg', time: '2 years ago', review: 'I have engaged with Jitesh bhai and his team since the past 3 years. They have filed my IT returns. They are very knowledgeable, responsive, and do a...' },
                { name: 'Sneha Rao', initial: 'S', bg: 'bg-indigo-500', time: '1 year ago', review: 'Extremely professional and prompt service. They handled my GST registration flawlessly without me having to visit any office.' },
                { name: 'Kiran Desai', img: '/images/img_74a9fa160d.jpg', time: '8 months ago', review: 'The audit was conducted very smoothly. Their attention to detail and guidance on compliance has saved us from several potential penalties.' },
                { name: 'Aditi Sharma', initial: 'A', bg: 'bg-emerald-500', time: '3 months ago', review: 'Highly recommend! The entire team is very cooperative and they ensure all queries are resolved on priority.' }
              ]].map((rev, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col relative mx-4 w-[400px] shrink-0 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 cursor-grab active:cursor-grabbing group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {rev.img ? (
                        <Image src={rev.img} alt={rev.name} width={52} height={52} className="rounded-full object-cover ring-2 ring-slate-50" loading="lazy" />
                      ) : (
                        <div className={`w-[52px] h-[52px] rounded-full ${rev.bg} flex items-center justify-center text-white font-bold text-xl ring-2 ring-slate-50`}>{rev.initial}</div>
                      )}
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-[17px] text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{rev.name}</span>
                        <span className="text-[13px] text-slate-500 mt-1">{rev.time}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-500 tracking-tighter absolute right-6 top-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">G</div>
                  </div>
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(star => <Star key={star} className="h-[16px] w-[16px] fill-yellow-400 text-yellow-400" />)}
                    <div className="h-[18px] w-[18px] rounded-full bg-blue-500 flex items-center justify-center ml-1"><Check className="h-3 w-3 text-white stroke-[3]" /></div>
                  </div>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-6 flex-1 relative z-10">"{rev.review}"</p>
                  <button className="text-blue-600 text-[14px] font-semibold text-left hover:text-blue-800 transition-colors flex items-center gap-1">Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></button>
                </div>
              ))}
            </div>
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



