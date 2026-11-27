import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/public/Navbar"
import { Footer } from "@/components/public/Footer"
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, CheckCircle2, ShieldCheck, Target, Eye, 
  MapPin, Mail, Phone 
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[320px] bg-[#032b4e] overflow-hidden">
        <Image
          src="/images/img_2fb99a364f.jpg"
          alt="About page hero"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#032b4e] via-[#032b4e]/85 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-end pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">About Us</h1>
        </div>
      </section>

      {/* 1. Main Firm Overview */}
      <section className="w-full py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4 tracking-tight">
            About The Practice – Chartered Accountants in Bangalore
          </h2>
          <div className="space-y-6 text-slate-700 text-[16px] leading-[1.8] text-justify">
            <p>
              <strong className="text-slate-900 font-semibold">Shantanu S &amp; Associates</strong> is a professionally managed Chartered Accountancy practice in Bangalore, structured to seamlessly serve domestic enterprises and global corporations. We deliver an expansive portfolio of specialized services encompassing direct and indirect taxation, stringent regulatory compliance, advanced corporate governance, and complex cross-border financial advisory. Driven by a vision to be the most trusted financial partner in the region, our collective of Chartered Accountants, skilled Company Secretaries, and legal authorities leverages robust digital infrastructure to provide comprehensive, full-cycle statutory support for scaling businesses.
            </p>
            <p>
              By dedicating ourselves to fundamentally understanding the nuances of your specific industry and operational blueprint, our expert advisors engineer strategies that are not only compliant but strategically advantageous. Drawing upon extensive domain mastery across statutory audits, advanced tax planning, and strategic business consulting, we deliver actionable, high-impact outcomes. Our fundamental mission is to liberate business owners from administrative and regulatory burdens, empowering them to drive expansion and innovation while we ensure financial integrity and compliance with absolute precision.
            </p>
            <p>
              Throughout our journey, Shantanu S &amp; Associates has built enduring partnerships with forward-thinking organizations spanning a multitude of sectors. From modern Banking &amp; IT to traditional Manufacturing, Healthcare, Real Estate, and Logistics, our footprint is vast. We proudly operate as a singular, comprehensive financial command center for our clients, replacing complexity with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us */}
      <section className="w-full py-16 px-6 lg:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Why Choose Shantanu S &amp; Associates, CA in Bangalore?
          </h2>
          <div className="space-y-5">
            {[
              "A fundamentally proactive and highly collaborative partnership model tailored specifically to your organizational needs.",
              "Continuous tracking of the latest legislative shifts and economic reforms, ensuring your compliance strategies remain ahead of the curve.",
              "Transparent, continuous communication loops designed to proactively manage risks and effortlessly meet critical statutory deadlines.",
              "A dynamic, feedback-driven operational culture that constantly refines and enhances our service delivery protocols.",
              "Uncompromising adherence to professional ethics, ensuring absolute data confidentiality and transparency in every transaction.",
              "Deep empathy for your business challenges, translating complex problems into measurable, constructive financial outcomes.",
              "A unified, single-window destination for all audit, accounting, taxation, and registration requirements, eliminating vendor friction.",
              "A robust digital-first consultation infrastructure that flawlessly supports clients pan-India and globally, right from our Bangalore headquarters."
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <p className="text-slate-700 text-[15px] leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="w-full py-20 px-6 lg:px-12 bg-[#032b4e] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide">Our Vision</h3>
            <p className="text-slate-300 text-[15px] leading-relaxed text-justify">
              To be recognized as a premier Chartered Accountancy firm delivering unmatched trust, compliance excellence, and sustainable financial growth for enterprises across India and global markets through uncompromising ethical benchmarks and technological innovation.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide">Our Mission</h3>
            <p className="text-slate-300 text-[15px] leading-relaxed text-justify">
              Empowering ambitious businesses through agile, precise, and proactive financial advisory, statutory auditing, and tailored taxation solutions that minimize risk, safeguard wealth, and unlock durable enterprise growth.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Meet Our Team */}
      <section id="team" className="w-full py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Meet Our Team</h2>
            <p className="text-slate-500 text-[16px]">
              Distinguished leadership with extensive experience across statutory audits, taxation, and corporate governance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Sole Partner */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Executive Monogram with Letter 'S' (No random person image) */}
              <div className="min-h-[260px] md:min-h-[360px] md:w-[320px] shrink-0 bg-gradient-to-br from-[#0B1A2F] via-[#0F2744] to-[#1E3A8A] flex flex-col items-center justify-center p-8 relative overflow-hidden select-none">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner mb-4">
                    <span className="font-serif text-5xl md:text-6xl font-bold text-white tracking-wider">
                      S
                    </span>
                  </div>
                  <span className="text-white font-semibold text-sm tracking-wide">CA Shantanu S</span>
                  <span className="text-blue-300/80 text-xs mt-0.5 tracking-wider uppercase font-medium">Founder &bull; Managing Partner</span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">CA Shantanu S</h3>
                  <div className="text-blue-700 font-semibold text-sm tracking-wide">
                    B.Com, FCA, DISA (ICAI) &bull; Founder &amp; Managing Partner
                  </div>
                </div>
                <div className="w-12 h-1 bg-blue-600 rounded-full my-2"></div>
                <p className="text-slate-600 text-[15px] leading-relaxed text-justify">
                  CA Shantanu S is the Founder and Managing Partner of the Firm. He possesses comprehensive professional expertise in the fields of Statutory Audits, Direct &amp; Indirect Taxation, Corporate Management Consultancy, Internal Audits &amp; Systems Study, Tax Audits, and Project Financing. 
                </p>
                <p className="text-slate-600 text-[15px] leading-relaxed text-justify">
                  Having guided diverse enterprises from early-stage inception to enterprise maturity, he is widely recognized for his strategic clarity and proactive regulatory advisory. He has advised numerous mid-market and enterprise clients on structuring joint ventures, inbound international capital, and long-term compliance frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Box */}
      <section className="w-full py-12 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#032b4e] rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Looking for a Chartered Accountant in Bangalore?
              </h3>
              <p className="text-slate-300 text-[15px] leading-relaxed">
                Connect with our advisory desk today. Whether you need statutory audit support, corporate registration, or comprehensive tax advisory, we deliver seamless, results-driven solutions.
              </p>
            </div>
            <Link href="/#contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-6 text-base rounded-md shadow-md shrink-0">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

