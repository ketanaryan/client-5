import Link from "next/link"
import { Navbar } from "@/components/public/Navbar"
import { Footer } from "@/components/public/Footer"
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, Calendar, FileText, ArrowRight, 
  ShieldCheck, TrendingUp, BookOpen, Clock 
} from "lucide-react"

export const metadata = {
  title: "News & Resources | Statutory Updates & Tax Calendar",
  description: "Stay ahead with the latest statutory deadlines, tax circulars, MCA notifications, and compliance resources curated by Shantanu S & Associates.",
}

const STATUTORY_CALENDAR = [
  {
    date: "7th of Every Month",
    compliance: "TDS / TCS Payment",
    act: "Income Tax Act",
    desc: "Payment of TDS/TCS deducted/collected in the previous month for corporate & non-corporate deductors.",
    category: "Direct Tax"
  },
  {
    date: "11th of Every Month",
    compliance: "GSTR-1 (Outward Supplies)",
    act: "GST Act",
    desc: "Monthly return for outward supplies of goods and services for taxpayers not registered under QRMP.",
    category: "GST"
  },
  {
    date: "20th of Every Month",
    compliance: "GSTR-3B (Summary Return)",
    act: "GST Act",
    desc: "Monthly summary return along with payment of due tax liability by regular taxpayers.",
    category: "GST"
  },
  {
    date: "15th June, Sep, Dec, Mar",
    compliance: "Advance Tax Installments",
    act: "Income Tax Act",
    desc: "Quarterly advance tax installments (15%, 45%, 75%, 100%) for all taxable entities and individuals.",
    category: "Direct Tax"
  },
  {
    date: "31st July / 31st October",
    compliance: "Income Tax Return Filing",
    act: "Income Tax Act",
    desc: "ITR filing for non-audit individual/firm cases (July 31) and tax audit / corporate entities (October 31).",
    category: "Direct Tax"
  },
  {
    date: "Annual ROC Filings (AOC-4 & MGT-7)",
    compliance: "Annual Company Returns",
    act: "Companies Act, 2013",
    desc: "Filing of audited financial statements (Form AOC-4) and Annual Return (Form MGT-7) with Registrar of Companies.",
    category: "Corporate Law"
  }
];

const RECENT_CIRCULARS = [
  {
    tag: "GST Compliance",
    date: "Regulatory Notice",
    title: "Advisory on E-Invoicing & Automated ITC Matching",
    summary: "Key requirements regarding mandatory verification of two-way input tax credit matching in GSTR-2B before filing monthly returns.",
  },
  {
    tag: "Direct Taxation",
    date: "Regulatory Notice",
    title: "New Tax Regime Default Framework & Capital Gains Restructuring",
    summary: "Critical nuances of concessional tax rates, revised capital gains timelines, and procedural compliance for partnership firms and LLPs.",
  },
  {
    tag: "Corporate Law (MCA)",
    date: "Regulatory Notice",
    title: "Annual Director KYC & V3 Portal Statutory Filings",
    summary: "Mandatory compliance checklists for active director identification numbers (DIR-3 KYC) and beneficial ownership disclosures.",
  }
];

const COMPLIANCE_CHECKLISTS = [
  {
    title: "Company Formation & Starter Kit",
    size: "PDF Guide",
    description: "Step-by-step documentation, digital signature requirements, and post-incorporation statutory registrations.",
    link: "/#contact"
  },
  {
    title: "GST Monthly Reconciliation Guide",
    size: "PDF Checklist",
    description: "Comprehensive workflow for eliminating ITC mismatches, vendor follow-ups, and reverse charge mechanisms.",
    link: "/#contact"
  },
  {
    title: "NRI Repatriation & Form 15CA/CB Primer",
    size: "Advisory Note",
    description: "Clear guidelines on inward and outward remittances, NRE/NRO account compliance, and FEMA regulations.",
    link: "/#contact"
  }
];

export default function NewsAndResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full bg-[#032b4e] py-16 px-6 lg:px-12 text-white border-b border-blue-900/60">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-200 text-xs sm:text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">News &amp; Resources</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/20">
              <Calendar className="w-3.5 h-3.5" /> Knowledge &amp; Regulatory Hub
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              News, Circulars &amp; Statutory Resources
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Curated statutory deadlines, regulatory circulars, and strategic checklists by Shantanu S &amp; Associates to keep your enterprise compliant and legally fortified.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Statutory Due Dates Calendar */}
      <section className="w-full py-16 px-6 lg:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">COMPLIANCE TIMELINE</div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#032b4e] tracking-tight">
                Statutory Due Dates Calendar
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Key recurring tax and regulatory filing deadlines under Indian laws. Ensure timely adherence to avoid penalty charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATUTORY_CALENDAR.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{item.act}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-2">
                    <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-[16px] font-bold text-[#032b4e] mb-2">
                    {item.compliance}
                  </h3>

                  <p className="text-slate-600 text-[13.5px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Standard Recurring</span>
                  <Link href="/contact" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    Get Support <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Circulars & Regulatory Bulletins */}
      <section className="w-full py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">REGULATORY ADVISORIES</div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#032b4e] tracking-tight">
              Latest Practice Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECENT_CIRCULARS.map((cir, idx) => (
              <div 
                key={idx} 
                className="bg-white p-7 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="font-bold text-blue-700 uppercase tracking-wider">{cir.tag}</span>
                    <span className="text-slate-400">{cir.date}</span>
                  </div>

                  <h3 className="font-bold text-[#032b4e] text-lg mb-3 leading-snug">
                    {cir.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {cir.summary}
                  </p>
                </div>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                  Request Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Downloadable Checklists & Frameworks */}
      <section className="w-full py-16 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-2">PRACTICE ARTIFACTS</div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#032b4e] tracking-tight mb-3">
              Compliance Resource Kits
            </h2>
            <p className="text-slate-600 text-sm">
              Standardized checklists designed to streamline your business filings, documentation, and audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPLIANCE_CHECKLISTS.map((chk, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#032b4e] text-base mb-2">{chk.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">{chk.description}</p>
                </div>
                <Link href={chk.link}>
                  <Button variant="outline" className="w-full border-slate-200 hover:border-blue-600 hover:text-blue-700 text-xs font-bold h-9">
                    Request Copy
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-14 px-6 lg:px-12 bg-[#032b4e] text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">Need dedicated regulatory advisory?</h3>
            <p className="text-blue-200 text-sm">Speak directly with Shantanu S &amp; Associates to plan your financial compliances.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/#contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-5 rounded">
                Enquire Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold px-6 py-5 rounded">
                Client Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
