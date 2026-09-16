import React from "react"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-sm border border-slate-200 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: September 2026</p>
        
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>At CA Shantanu & Associates, we collect personal and financial information necessary to provide our professional services. This may include your name, contact details, PAN, GST numbers, financial records, and login credentials for our client portal.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Use of Information</h2>
            <p>Your information is used strictly for the purpose of fulfilling our professional obligations, including tax filing, auditing, compliance, and providing secure access to our digital platform. We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures, including encryption and secure digital vaults, to protect your sensitive financial data against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Third-Party Sharing</h2>
            <p>We may share your information with government regulatory bodies (such as the Income Tax Department or MCA) solely as required to provide our services, or with authorized technology partners hosting our secure infrastructure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Your Rights</h2>
            <p>You have the right to access, update, or request the deletion of your personal data stored on our systems. Please contact us directly if you need to exercise any of these rights regarding your profile or uploaded documents.</p>
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
