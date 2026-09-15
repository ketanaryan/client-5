import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/public/Navbar"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const SERVICES: Record<string, {
  title: string
  heroImg: string
  sideImg: string
  overview: string[]
  bulletPoints: string[]
}> = {
  "audit-and-assurance": {
    title: "Audit & Assurance",
    heroImg: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
    overview: [
      "Audit services are a type of independent professional service usually provided by certified or chartered accountants such as CPAs. Such services reduce the risk of information which becomes the foundation for a better and informed decision making. Audit & Assurance services leads to transparency and relevance in the financial statements and information thereby leading to increase in confidence and comfort of the stake holders and investors in the business.",
      "When running a business, it is essential to maintain accurate financial records and stay on top of the paperwork so you can continue to successfully grow your business. A simple and accurate audit depends on your business having kept up accurate bookkeeping. One of the best reasons for auditing financial statements is to future-proof yourself. In the long term, an audit protects your hard work and investment.",
      "At Shantanu & Associates, we are proud to be among the top Chartered Accountant Firms in Pune. We are committed to deliver the most robust and dynamic Taxation, Auditing, GST, Regulatory & Advisory Services to our clients through our experience, analytical approach & understanding."
    ],
    bulletPoints: [
      "Statutory Audit",
      "Internal Audit",
      "Tax Audit under the Income Tax Act",
      "GST Audit",
      "Bank Audit",
      "Stock Audit",
      "Concurrent Audit",
      "Revenue Audit",
      "Management Audit",
      "Information Systems Audit",
      "Sarbanes Oxley Act Documentation and Audit Support",
      "Transfer Pricing audit as per Section 92E of Income Tax Act",
      "Limited Reviews"
    ]
  },
  "consultancy": {
    title: "Consultancy",
    heroImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    overview: [
      "Every business requires expert guidance to meet its goals. As a Chartered Accountant firm in Pune, we provide business advisory and consulting services tailored to each client's needs. Our aim is to support and strengthen growth through strategic, reliable, and goal-oriented consulting solutions.",
      "Our consultancy services encompass a wide range of areas including business restructuring, mergers and acquisitions advisory, due diligence, valuation services, and strategic financial planning. We help businesses navigate complex regulatory environments and make informed decisions.",
      "At Shantanu & Associates, our team of experienced professionals brings deep industry knowledge and practical insights to help you achieve your business objectives efficiently and effectively."
    ],
    bulletPoints: [
      "Business Advisory Services",
      "Mergers & Acquisitions Advisory",
      "Due Diligence Services",
      "Business Valuation",
      "Strategic Financial Planning",
      "Corporate Restructuring",
      "Regulatory Compliance Advisory",
      "Risk Management Consulting",
      "Process Improvement",
      "Financial Modeling & Projections"
    ]
  },
  "nri-tax-services": {
    title: "NRI Tax And Allied Services",
    heroImg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1569025743873-ea3a9ber?auto=format&fit=crop&q=80",
    overview: [
      "NRIs often face challenges in following Indian tax laws while living abroad. With proven experience serving numerous NRIs, our firm strives to be among the top CA firms in Pune, offering tax and allied services under one roof for complete NRI compliance.",
      "We provide comprehensive NRI taxation services including filing of income tax returns, obtaining PAN, tax planning for NRI investments in India, FEMA compliance, and repatriation of funds. Our team stays updated with the latest amendments in NRI taxation to ensure you remain fully compliant.",
      "Whether you are an NRI looking to invest in Indian real estate, seeking to repatriate funds, or need assistance with double taxation avoidance agreements (DTAA), our experts provide end-to-end support."
    ],
    bulletPoints: [
      "NRI Income Tax Return Filing",
      "Tax Planning for NRI Investments",
      "FEMA Compliance & Advisory",
      "Repatriation of Funds",
      "Double Taxation Avoidance (DTAA)",
      "NRI Property Taxation",
      "Capital Gains Tax Advisory",
      "PAN Application & Services",
      "TDS on NRI Property Sales",
      "Overseas Citizen Tax Advisory"
    ]
  },
  "corporate-laws": {
    title: "Corporate Laws",
    heroImg: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    overview: [
      "The Companies Act, 2013 governs incorporation and compliance of companies and LLPs in India. Our CA firm in Pune helps businesses meet all statutory requirements under this Act, ensuring they operate lawfully and confidently while focusing on growth and corporate governance excellence.",
      "We provide comprehensive corporate law advisory services including company incorporation, annual compliance, board meeting procedures, statutory filings with the Registrar of Companies (ROC), and corporate governance advisory.",
      "Our team ensures your company remains compliant with all provisions of the Companies Act, 2013 and related regulations, helping you avoid penalties and legal complications."
    ],
    bulletPoints: [
      "Company Incorporation",
      "Annual ROC Filings",
      "Board Meeting Compliance",
      "Director KYC & Appointments",
      "Share Transfer & Allotment",
      "Charge Registration",
      "Corporate Governance Advisory",
      "Winding Up & Strike Off",
      "LLP Compliance",
      "NBFC Compliance"
    ]
  },
  "taxation-services": {
    title: "Taxation Services",
    heroImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80",
    overview: [
      "At Shantanu & Associates, Chartered Accountants in Pune, we offer end-to-end services for both direct and indirect taxation. We keep clients informed about regulatory updates and provide expert tax planning guidance, ensuring complete compliance and maximum efficiency for every financial requirement.",
      "Our taxation services cover income tax, GST, transfer pricing, international taxation, and tax litigation support. We help individuals and businesses optimize their tax position while ensuring full compliance with all applicable tax laws.",
      "With deep expertise in Indian tax law and its practical application, our team provides strategic tax planning that helps minimize tax liability while maintaining complete transparency and compliance."
    ],
    bulletPoints: [
      "Income Tax Planning & Filing",
      "GST Registration & Returns",
      "GST Audit & Compliance",
      "Transfer Pricing Documentation",
      "International Taxation",
      "Tax Litigation Support",
      "Advance Tax Planning",
      "TDS Compliance & Returns",
      "Tax Due Diligence",
      "Withholding Tax Advisory"
    ]
  },
  "business-registration": {
    title: "Business Registration",
    heroImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80",
    overview: [
      "At Shantanu & Associates, Chartered Accountants in Pune, we offer tailored services to help clients understand their business registration needs. We guide start-ups through required procedures under different laws and acts, providing complete support and solutions under one roof with expert knowledge.",
      "Whether you are starting a new business or expanding an existing one, choosing the right business structure is crucial. We help you understand the pros and cons of each type of registration — from sole proprietorship to private limited company — and guide you through the entire process.",
      "Our comprehensive registration services ensure your business is properly set up from day one, with all necessary licenses, registrations, and compliances in place."
    ],
    bulletPoints: [
      "Private Limited Company Registration",
      "LLP Registration",
      "Partnership Firm Registration",
      "One Person Company (OPC)",
      "Sole Proprietorship Registration",
      "MSME / Udyam Registration",
      "GST Registration",
      "Import Export Code (IEC)",
      "Shop Act Registration",
      "FSSAI Registration",
      "Professional Tax Registration",
      "Trade License"
    ]
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES[params.slug]
  
  if (!service) {
    notFound()
  }

  const midPoint = Math.ceil(service.bulletPoints.length / 2)
  const leftBullets = service.bulletPoints.slice(0, midPoint)
  const rightBullets = service.bulletPoints.slice(midPoint)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-[#032b4e] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${service.heroImg}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#032b4e] to-transparent"></div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-end pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{service.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">{service.title} Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-6">
              {service.overview.map((para, i) => (
                <p key={i} className="text-slate-600 text-[16px] leading-[1.8]">{para}</p>
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-lg sticky top-8">
                <div className="absolute inset-0 bg-cover bg-center w-full h-full" style={{ backgroundImage: `url('${service.sideImg}')` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bullet Points */}
      <section className="w-full py-12 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Our {service.title} Services Include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <ul className="space-y-3">
              {leftBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-[15px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {rightBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-[15px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#032b4e] rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">Looking for a Chartered Accountant in Pune for {service.title}?</h3>
              <p className="text-slate-300 text-[15px] leading-relaxed">
                At Shantanu & Associates, we are proud to be among the top Chartered Accountant Firms in Pune. We are committed to deliver the most robust and dynamic Taxation, Auditing, GST, Regulatory & Advisory Services to our clients through our experience, analytical approach & understanding.
              </p>
            </div>
            <Link href="/#contact">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-6 text-lg rounded-md shadow-lg shrink-0">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#032b4e] text-white pt-12 pb-6 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="border-t border-white/10 pt-6 flex flex-col lg:flex-row justify-between items-center text-[12px] text-slate-400 gap-4 tracking-wide">
            <div>© 2026 Shantanu & Associates. All Rights Reserved.</div>
            <div>Designed & Developed by <strong className="text-white">AGY AI</strong></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
