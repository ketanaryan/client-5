"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitEnquiry } from "./actions/enquiry"
import { 
  Building2, 
  Calculator, 
  Landmark, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Users
} from "lucide-react"
import { Navbar } from "@/components/public/Navbar"

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
    <div className="flex flex-col min-h-screen selection:bg-emerald-600 selection:text-white bg-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION - 2-Column Corporate Layout */}
        <section className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white shadow-sm border border-slate-200 text-xs font-bold text-emerald-700 tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                Accepting New Corporate Clients for FY 2026-27
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-blue-950 leading-[1.15]">
                Financial Clarity for the Modern Enterprise.
              </h1>
              
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-[45ch]">
                We are a legacy Chartered Accountancy firm delivering precise audit, compliance, and strategic tax advisory to high-growth businesses across India.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                <Link href="#contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-14 px-8 rounded-md bg-blue-950 hover:bg-slate-900 text-base font-bold shadow-md">
                    Request Consultation
                  </Button>
                </Link>
                <Link href="#services" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full h-14 px-8 rounded-md border-slate-300 text-blue-950 hover:bg-slate-100 hover:text-emerald-700 font-bold bg-white shadow-sm group">
                    Explore Practice Areas <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Image Placeholder */}
            <div className="relative w-full aspect-[4/3] rounded-lg shadow-2xl overflow-hidden bg-slate-200 border-4 border-white flex items-center justify-center">
              {/* This is a visual placeholder for the requested corporate image (e.g. handshake, skyscraper) */}
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/office-skyscraper-corporate/800/600')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 mt-auto mb-6">
                <ShieldCheck className="h-12 w-12 text-emerald-400 mb-3" />
                <span className="text-white font-bold text-xl drop-shadow-md">Trust. Precision. Excellence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS GRID - Corporate Style */}
        <section className="w-full py-16 px-6 lg:px-12 bg-blue-950 border-y border-slate-200 shadow-inner">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-6 p-4">
              <div className="h-14 w-14 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700">
                <ShieldCheck className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-4xl font-bold tracking-tight text-white mb-1">20+</h4>
                <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Years of Integrity</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-4 border-t md:border-t-0 md:border-l border-slate-800">
              <div className="h-14 w-14 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700">
                <Briefcase className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-4xl font-bold tracking-tight text-white mb-1">500+</h4>
                <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Corporate Audits</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-4 border-t md:border-t-0 md:border-l border-slate-800">
              <div className="h-14 w-14 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700">
                <TrendingUp className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-4xl font-bold tracking-tight text-white mb-1">₹2K Cr+</h4>
                <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Assets Under Advisory</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* PRACTICE AREAS - Card Grid */}
        <section id="services" className="w-full py-24 px-6 lg:px-12 bg-slate-50">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="text-emerald-700 font-bold tracking-widest text-sm uppercase mb-3">Core Expertise</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-950 mb-4">Practice Areas</h2>
                <p className="text-slate-600 max-w-md text-lg">Specialized financial disciplines handled by domain experts with decades of experience.</p>
              </div>
              <Link href="#contact" className="text-blue-950 font-bold hover:text-emerald-700 hover:underline underline-offset-4 flex items-center gap-1 group transition-colors">
                Discuss your requirements <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Audit & Assurance', icon: ShieldCheck, desc: 'Statutory, Internal, and Tax Audits ensuring strict compliance and risk mitigation.' },
                { title: 'Direct & Indirect Taxation', icon: Landmark, desc: 'Corporate tax planning, GST advisory, representations, and international taxation.' },
                { title: 'Corporate Advisory', icon: Building2, desc: 'M&A structuring, valuation, due diligence, and capital market advisory services.' },
                { title: 'Outsourced CFO', icon: Calculator, desc: 'End-to-end accounting, payroll, and MIS reporting for scaling startups.' }
              ].map((service, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-shadow group">
                  <div className="h-14 w-14 rounded-md bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                    <service.icon className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / LEAD GEN */}
        <section id="contact" className="w-full py-24 px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <div className="text-emerald-700 font-bold tracking-widest text-sm uppercase mb-3">Connect With Us</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-950 mb-6">Initiate a Conversation.</h2>
              <p className="text-slate-600 text-lg max-w-md mb-12">
                Whether you need a comprehensive audit or strategic tax restructuring, our partners are ready to assist.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                    <Building2 className="h-6 w-6 text-blue-950" />
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-950">Pune Headquarters</h5>
                    <p className="text-slate-600 text-sm mt-1">101, Alpha Financial Center,<br/>Koregaon Park, Pune 411001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                    <Users className="h-6 w-6 text-blue-950" />
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-950">Direct Contact</h5>
                    <p className="text-slate-600 text-sm mt-1">Phone: +91 98765 43210<br/>Email: contact@shantanuassociates.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-blue-950 mb-8">Service Request Form</h3>
              <form id="enquiry-form" action={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="bg-white border-slate-300 h-12 shadow-sm focus:border-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Work Email</label>
                    <Input name="email" type="email" required placeholder="john@company.com" className="bg-white border-slate-300 h-12 shadow-sm focus:border-emerald-600" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone (Optional)</label>
                    <Input name="phone" type="tel" placeholder="+91 98765 43210" className="bg-white border-slate-300 h-12 shadow-sm focus:border-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Service Category</label>
                    <select name="serviceRequested" className="w-full h-12 px-3 border border-slate-300 bg-white rounded-md text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium">
                      <option value="Audit & Assurance">Audit & Assurance</option>
                      <option value="Direct Taxation">Direct Taxation</option>
                      <option value="Indirect Taxation (GST)">Indirect Taxation (GST)</option>
                      <option value="Corporate Advisory">Corporate Advisory</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message / Context</label>
                  <textarea name="message" required className="w-full p-4 border border-slate-300 bg-white rounded-md text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none" rows={4} placeholder="Briefly describe your firm's requirement..."></textarea>
                </div>
                <Button type="submit" className="w-full h-14 rounded-md bg-blue-950 hover:bg-slate-900 text-white text-base font-bold shadow-md transition-colors" disabled={loading}>
                  {loading ? "Submitting Request..." : "Submit Secure Request"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full py-12 px-6 lg:px-12 bg-blue-950 text-slate-300 border-t-4 border-emerald-600">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white">Shantanu & Associates</span>
            <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <nav className="flex gap-8">
            <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="#">Privacy Policy</Link>
            <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="#">Terms of Engagement</Link>
            <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="/login">Portal Login</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
