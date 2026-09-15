"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitEnquiry } from "./actions/enquiry"
import { 
  Building2, Calculator, Landmark, ArrowRight, ShieldCheck, TrendingUp, 
  Briefcase, Users, Target, ThumbsUp, Handshake, Clock,
  Globe, BookOpen, PieChart, Monitor, Activity, HardHat, Book, 
  Plane, ShoppingCart, Home, Anchor, Truck, Car, Film, Factory, FlaskConical, FileText
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
        {/* 1. HERO SECTION */}
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
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 mt-auto mb-6">
                <ShieldCheck className="h-12 w-12 text-emerald-400 mb-3" />
                <span className="text-white font-bold text-xl drop-shadow-md">Trust. Precision. Excellence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT US */}
        <section id="about" className="w-full py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">About Us-Chartered Accountant In Pune</h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                Shantanu & Associates, Chartered Accountant in Pune is a professionally managed firm catering to domestic and international clients with wide range of services in domestic and international taxation, regulatory and advisory services and cross border transaction related services. The team at S&A is a Firm of CA in Pune and has dedicated, experienced and expert professionals and associates like Chartered Accountants, Company Secretary and Consultants and high-end infrastructure to provide end to end services to your business. With effort of gaining deep understanding of your business, our qualified team is committed to provide valuable, consistent and efficient services based on its in-depth knowledge and wide experience in the areas of audit, taxation, regulatory compliances and related business services. Our objective is to help our clients to focus on and achieve their business and financial goals by providing them services that is personalized and tailored to meet our client's requirements and suit their business the best.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm px-8 py-6 shadow-md font-bold text-base mt-4">
                Read more
              </Button>
            </div>
            <div className="w-full md:w-[500px] shrink-0">
              <div className="relative w-full aspect-square bg-slate-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES */}
        <section id="services" className="w-full py-24 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <div className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-3">OUR SERVICES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Committed to Excellence</h2>
            <p className="text-slate-600 text-lg">One Stop Destination to provide unified and agile solutions to manage all your business complexities and regulatory compliances</p>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 shadow-sm border border-slate-200 bg-slate-200">
            {[
              { title: 'Company Registration', icon: Briefcase },
              { title: 'Business Setup India', icon: Building2 },
              { title: 'Company And LLP Compliances', icon: ShieldCheck },
              { title: 'Auditing & Assurance', icon: Calculator },
              { title: 'Tax Advisory', icon: Landmark },
              { title: 'GST Advisory Services', icon: FileText },
              { title: 'NRI Taxation', icon: Globe },
              { title: 'Transfer Pricing', icon: TrendingUp },
              { title: 'Registration of Indian Subsidiary Company', icon: Building2 },
              { title: 'Foreign Company Registration in India', icon: Globe },
              { title: 'Account Outsourcing & Bookkeeping', icon: BookOpen },
              { title: 'Tax Investment & Financial Advisory', icon: PieChart }
            ].map((srv, i) => (
              <div key={i} className="group relative bg-white border border-slate-100 p-6 flex flex-col items-center justify-center text-center aspect-square hover:z-10 transition-all overflow-hidden cursor-pointer">
                {/* Hover Background */}
                <div className="absolute inset-0 bg-blue-950 opacity-0 group-hover:opacity-90 transition-opacity z-0 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <srv.icon className="h-10 w-10 text-emerald-600 mb-4 group-hover:text-white transition-colors stroke-[1.5]" />
                  <h3 className="font-bold text-blue-950 text-[13px] leading-snug group-hover:text-white transition-colors">{srv.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="w-full py-24 px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <div className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-3">BELIEFS THAT SHAPE OUR CULTURE</div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Our Core Values</h2>
            <p className="text-slate-600 text-lg max-w-4xl mx-auto">
              Our firm believe and follow the culture to maintain faith, integrity and ethics in all levels during deliver services to every client. Our profession is our faith and our people always pursue this journey.
            </p>
          </div>
          
          <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {[
              { title: 'Commitment', icon: Target },
              { title: 'Integrity', icon: TrendingUp },
              { title: 'Accountability', icon: FileText },
              { title: 'Quality', icon: ThumbsUp },
              { title: 'Respect', icon: Handshake },
              { title: 'Time Value', icon: Clock }
            ].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <val.icon className="w-10 h-10 text-white stroke-[1.5]" />
                </div>
                <span className="font-bold text-slate-800">{val.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INDUSTRIES */}
        <section className="w-full py-24 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <div className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-3">OUR INDUSTRIES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Business We Served</h2>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-slate-200 bg-slate-200 shadow-sm">
            {[
              { title: 'Information Technology', icon: Monitor },
              { title: 'Pharmaceuticals & Healthcare', icon: Activity },
              { title: 'Engineering & Infra Services', icon: HardHat },
              { title: 'Education Sector', icon: Book },
              { title: 'Banking & Financial Services', icon: Landmark },
              { title: 'Import & Export', icon: Plane },
              { title: 'E-Commerce & Retail', icon: ShoppingCart },
              { title: 'Real Estate', icon: Home },
              { title: 'Vessels & Marine', icon: Anchor },
              { title: 'Logistics Services', icon: Truck },
              { title: 'Automobiles Industry', icon: Car },
              { title: 'Media & Entertainment', icon: Film },
              { title: 'Manufacturing & Trading', icon: Factory },
              { title: 'Non Profit Organisation', icon: Users },
              { title: 'Chemical Sector', icon: FlaskConical }
            ].map((ind, i) => (
              <div key={i} className="group relative bg-slate-100 border border-slate-200/50 p-6 flex flex-col items-center justify-center text-center aspect-[4/3] hover:z-10 transition-all overflow-hidden cursor-pointer">
                {/* Subtle Image Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03] group-hover:opacity-0 transition-all z-0"></div>
                {/* Hover Blue Overlay */}
                <div className="absolute inset-0 bg-blue-950 opacity-0 group-hover:opacity-90 transition-opacity z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <ind.icon className="h-10 w-10 text-emerald-600 mb-3 group-hover:text-white transition-colors stroke-[1.5]" />
                  <h3 className="font-semibold text-slate-700 text-sm leading-snug group-hover:text-white transition-colors px-2">{ind.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT / LEAD GEN */}
        <section id="contact" className="w-full py-24 px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <div className="text-emerald-500 font-bold tracking-widest text-sm uppercase mb-3">Connect With Us</div>
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
