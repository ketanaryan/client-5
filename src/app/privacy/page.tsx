import { Footer } from "@/components/public/Footer"
import { Navbar } from "@/components/public/Navbar"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-4xl font-extrabold text-[#032b4e] mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-slate-800">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including your name, email address, phone number, PAN, and GST details when you register as a client or submit an enquiry.</p>
          
          <h2 className="text-2xl font-bold text-slate-800">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our chartered accountancy services, process transactions, send administrative messages, and respond to your comments and questions.</p>
          
          <h2 className="text-2xl font-bold text-slate-800">3. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your sensitive financial and personal data against unauthorized access, alteration, or disclosure.</p>
          
          <h2 className="text-2xl font-bold text-slate-800">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our website contact form.</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
