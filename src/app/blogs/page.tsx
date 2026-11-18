import Link from "next/link"
import { Navbar } from "@/components/public/Navbar"
import { Footer } from "@/components/public/Footer"
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, Calendar, Clock, BookOpen, 
  ArrowRight, Tag, ShieldCheck, TrendingUp 
} from "lucide-react"

export const metadata = {
  title: "Blogs & Insights | Shantanu S & Associates",
  description: "Expert analysis, advisory articles, and practical guides on Indian Direct Tax, GST compliance, MCA regulatory updates, and corporate finance by Shantanu S & Associates.",
}

const BLOG_ARTICLES = [
  {
    slug: "navigating-section-43b-h-msme-payments",
    title: "Understanding Section 43B(h): Strict 45-Day Payment Timelines to MSMEs and Tax Deductibility",
    category: "Income Tax",
    readTime: "5 min read",
    date: "November 2026",
    summary: "A practical breakdown of Section 43B(h) under the Income Tax Act: how delayed payments to Micro and Small Enterprises impact expense disallowance and business cash flows.",
    tags: ["Section 43B(h)", "MSME", "Corporate Tax", "Tax Audit"],
    featured: true
  },
  {
    slug: "gst-itc-reconciliation-rules-gstr-2b",
    title: "Mastering GST Input Tax Credit (ITC): Strict Matching with GSTR-2B & Preventing Reversals",
    category: "GST & Indirect Tax",
    readTime: "6 min read",
    date: "October 2026",
    summary: "Navigating Rule 36(4), GSTR-2B dynamic reconciliation, and mandatory 180-day vendor payment norms to safeguard legitimate tax credits and prevent statutory demand notices.",
    tags: ["GSTR-2B", "ITC Reconciliation", "Rule 36(4)", "GST Notice"],
    featured: false
  },
  {
    slug: "advance-tax-computation-liability-penalties",
    title: "Advance Tax Calculation: Avoiding Hefty Interest under Section 234B & 234C",
    category: "Tax Planning",
    readTime: "4 min read",
    date: "September 2026",
    summary: "Key methodologies for estimating business profit, capital gains, and presumptive income to pay quarterly advance taxes accurately and prevent mandatory interest penalties.",
    tags: ["Advance Tax", "Sec 234B", "Sec 234C", "Tax Compliance"],
    featured: false
  },
  {
    slug: "startup-incorporation-pvt-ltd-vs-llp",
    title: "Pvt Ltd vs LLP: Structuring Your Business for Venture Capital, Tax Efficiency & Compliance Ease",
    category: "Corporate Advisory",
    readTime: "7 min read",
    date: "August 2026",
    summary: "Evaluating equity fundraising, promoter liabilities, dividend distribution taxes, and MCA compliance burdens to choose the optimal legal vehicle for your enterprise.",
    tags: ["Startup", "Pvt Ltd", "LLP", "Company Incorporation"],
    featured: false
  },
  {
    slug: "nri-taxation-real-estate-repatriation-form-15ca-cb",
    title: "NRI Guide to Selling Property in India: TDS under Section 195 and Form 15CA/15CB Repatriation",
    category: "International & NRI Tax",
    readTime: "8 min read",
    date: "July 2026",
    summary: "Step-by-step advisory on managing higher withholding tax (TDS) on capital gains, applying for lower deduction certificates (Form 13), and transferring funds via FEMA rules.",
    tags: ["NRI Taxation", "Section 195", "Form 15CA", "Form 15CB"],
    featured: false
  },
  {
    slug: "internal-controls-and-statutory-audit-readiness",
    title: "Strengthening Internal Financial Controls (IFC) and Year-End Statutory Audit Readiness",
    category: "Audit & Assurance",
    readTime: "5 min read",
    date: "June 2026",
    summary: "How SMEs and mid-market enterprises can establish robust internal controls, documented ledger trails, and inventory reconciliations to achieve unqualified audit opinions.",
    tags: ["Statutory Audit", "IFC", "ICAI Standards", "Internal Audit"],
    featured: false
  }
];

export default function BlogsPage() {
  const featuredPost = BLOG_ARTICLES.find(a => a.featured) || BLOG_ARTICLES[0];
  const regularPosts = BLOG_ARTICLES.filter(a => a.slug !== featuredPost.slug);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-[#0B1425] text-white py-14 border-b border-[#15233A]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 text-xs text-blue-400 mb-3 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            <span className="text-slate-300">Blogs &amp; Insights</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Knowledge Desk &amp; Advisory Articles
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            In-depth perspectives, regulatory breakdowns, and compliance strategies curated by the professional desk at Shantanu S &amp; Associates.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Featured Article Card */}
          <div className="mb-12 bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  Featured Perspective
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> {featuredPost.date}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 hover:text-blue-700 transition-colors">
                <Link href="/news-and-resources">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-4xl">
                {featuredPost.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="h-3 w-3 text-slate-400" /> {tag}
                    </span>
                  ))}
                </div>
                <Link href="/news-and-resources" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors">
                  Read Full Compliance Advisory <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Regular Article Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Recent Publications</h3>
                <p className="text-xs text-slate-500 mt-0.5">Authoritative tax, audit, and regulatory insights</p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
                {BLOG_ARTICLES.length} Articles Available
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((article) => (
                <div 
                  key={article.slug} 
                  className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {article.category}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {article.readTime}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base leading-snug mb-2.5 group-hover:text-blue-700 transition-colors">
                      <Link href="/news-and-resources">
                        {article.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {article.date}
                      </span>
                      <Link 
                        href="/news-and-resources" 
                        className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1"
                      >
                        Explore <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation / Advisory Callout */}
          <div className="mt-14 bg-gradient-to-r from-[#0B1425] to-[#162744] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#1e345c]">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Statutory Practice Desk</span>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                Need Specific Advisory for Your Business?
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Our Chartered Accountants assist with custom statutory opinions, GST disputes, transfer pricing documentation, and corporate tax planning.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/#contact">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/news-and-resources">
                <Button variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold text-xs px-5 py-2.5 rounded-lg">
                  Compliance Calendar
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
