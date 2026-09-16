import React from "react"
import Link from "next/link"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-sm border border-slate-200 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms & Conditions</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: September 2026</p>
        
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
            <p>Welcome to CA Shantanu & Associates. By accessing our website and utilizing our services, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Professional Services</h2>
            <p>Our firm provides professional accounting, auditing, and tax advisory services. The information on this website is for general guidance and does not constitute professional advice. We recommend consulting with our qualified professionals directly for specific inquiries.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Client Portal Access</h2>
            <p>Clients provided with access to the secure portal are responsible for maintaining the confidentiality of their login credentials. Any unauthorized use of your account must be reported to us immediately.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Limitation of Liability</h2>
            <p>While we strive to ensure the accuracy of all information provided, CA Shantanu & Associates shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or services without direct consultation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and software, is the property of CA Shantanu & Associates and is protected by intellectual property laws. Unauthorized reproduction is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.</p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            &larr; Back to Home
          </Link>
          <a href="mailto:contact@shantanuassociates.com" className="text-sm text-slate-500 hover:text-slate-700">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
