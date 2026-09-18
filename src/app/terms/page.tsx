import { Footer } from "@/components/public/Footer"
import { Navbar } from "@/components/public/Navbar"

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-4xl font-extrabold text-[#032b4e] mb-8">Terms and Conditions</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-slate-800">1. Acceptance of Terms</h2>
          <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl font-bold text-slate-800">2. Description of Service</h2>
          <p>We provide chartered accountancy, tax advisory, business registration, and related financial consulting services. The specific scope of work will be defined in individual work requests.</p>
          
          <h2 className="text-2xl font-bold text-slate-800">3. Client Responsibilities</h2>
          <p>Clients must provide accurate and timely information required for us to perform our services. We are not liable for penalties arising from delayed or incorrect information provided by the client.</p>
          
          <h2 className="text-2xl font-bold text-slate-800">4. Payment Terms</h2>
          <p>Invoices are payable upon receipt. Final deliverables may be withheld until full payment is cleared.</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
