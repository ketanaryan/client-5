import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/public/Navbar"
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
            About Us–CA In Bangalore
          </h2>
          <div className="space-y-6 text-slate-700 text-[16px] leading-[1.8] text-justify">
            <p>
              <strong className="text-slate-900 font-semibold">Shantanu & Associates</strong> is a leading Chartered Accountancy practice in Bangalore, structured to seamlessly serve domestic enterprises and global corporations. We deliver an expansive portfolio of specialized services encompassing direct and indirect taxation, stringent regulatory compliance, advanced corporate governance, and complex cross-border financial advisory. Driven by a vision to be the most trusted financial partner in the region, our collective of elite Chartered Accountants, skilled Company Secretaries, and legal authorities leverages robust digital infrastructure to provide comprehensive, full-cycle statutory support for scaling businesses.
            </p>
            <p>
              By dedicating ourselves to fundamentally understanding the nuances of your specific industry and operational blueprint, our expert advisors engineer strategies that are not only compliant but strategically advantageous. Drawing upon extensive domain mastery across statutory audits, advanced tax planning, and strategic business consulting, we deliver actionable, high-impact outcomes. Our fundamental mission is to liberate business owners from administrative and regulatory burdens, empowering them to drive expansion and innovation while we ensure financial integrity and compliance with absolute precision.
            </p>
            <p>
              Throughout our journey, Shantanu & Associates has built enduring partnerships with forward-thinking organizations spanning a multitude of sectors. From modern Banking & IT to traditional Manufacturing, Healthcare, Real Estate, and Logistics, our footprint is vast. We proudly operate as a singular, comprehensive financial command center for our clients, replacing complexity with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us */}
      <section className="w-full py-16 px-6 lg:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Why Choose Shantanu & Associates, CA in Bangalore?
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
            <div className="flex flex-col md:flex-row bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-[400px] md:h-auto md:w-[350px] shrink-0 overflow-hidden bg-slate-100 relative">
                <Image 
                  src="/images/img_fe87da49d2.jpg" 
                  alt="CA Shantanu Sharma" 
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center flex-1 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">CA Shantanu Sharma</h3>
                  <div className="text-blue-700 font-semibold text-sm tracking-wide">
                    B.Com, FCA, DISA (ICAI) • Founder & Managing Partner
                  </div>
                </div>
                <div className="w-12 h-1 bg-blue-500 rounded-full my-4"></div>
                <p className="text-slate-600 text-[15px] leading-relaxed text-justify">
                  CA Shantanu Sharma is the Founder and Managing Partner of the Firm. He possesses an all-round professional expertise of more than 15 years in the fields of Statutory Audits, Direct & Indirect Taxation, Corporate Management Consultancy, Internal Audits & Systems Study, Tax Audits, and Project Financing. 
                </p>
                <p className="text-slate-600 text-[15px] leading-relaxed text-justify">
                  Having guided over 500+ enterprises from early-stage inception to enterprise maturity, he is widely recognized for his strategic clarity and proactive regulatory advisory. He has advised numerous mid-market and enterprise clients on structuring joint ventures, inbound international capital, and long-term compliance frameworks.
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

      {/* 6. Footer */}
      <footer className="w-full bg-[#032b4e] text-white pt-16 pb-6">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h4 className="font-bold tracking-widest text-[13px] uppercase text-white">ABOUT SHANTANU & ASSOCIATES</h4>
            <p className="text-slate-300 text-sm leading-relaxed text-justify">
              Businesses are changing and we need to keep up! At Shantanu & Associates, our objective is to create confidence and trust in the economic realm and to deliver the best quality of services across business setup, audits, taxation, and regulatory compliance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold tracking-widest text-[13px] uppercase text-white">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-blue-400 font-medium">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold tracking-widest text-[13px] uppercase text-white">PRACTICE AREAS</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/services/business-registration" className="hover:text-white transition-colors">Business Registration</Link></li>
              <li><Link href="/services/corporate-laws" className="hover:text-white transition-colors">Company Formation</Link></li>
              <li><Link href="/services/audit-and-assurance" className="hover:text-white transition-colors">Audit & Assurance</Link></li>
              <li><Link href="/services/taxation-services" className="hover:text-white transition-colors">Direct & Indirect Tax</Link></li>
              <li><Link href="/services/nri-tax-services" className="hover:text-white transition-colors">NRI Tax Services</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold tracking-widest text-[13px] uppercase text-white">HEAD OFFICE</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                <span>No 1, 2nd Floor, 18th Cross Road, 23rd Main Road, JP Nagar 5th Phase, Bangalore - 560078</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:8668555246" className="hover:text-white transition-colors">8668555246</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:shantanus.associates@gmail.com" className="hover:text-white transition-colors">shantanus.associates@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>© {new Date().getFullYear()} Shantanu & Associates. All Rights Reserved.</div>
            <div>Designed & Developed with AGY AI</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

