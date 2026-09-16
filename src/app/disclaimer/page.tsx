import React from "react"
import Link from "next/link"

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-sm border border-slate-200 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Disclaimer</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: September 2026</p>
        
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            The information contained on this website is for general information purposes only. The information is provided by <strong>CA Shantanu & Associates</strong> and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          
          <p>
            Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>
          
          <p>
            This website is not intended to be a source of advertising or solicitation and the contents of this website should not be construed as legal or professional advice. The reader should not consider this information to be an invitation for an accountant-client relationship and should not rely on information provided herein, and should always seek the advice of competent counsel licensed to practice in the reader&apos;s jurisdiction.
          </p>

          <p>
            Through this website, you may be able to link to other websites which are not under the control of CA Shantanu & Associates. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>

          <p>
            <strong>Institute of Chartered Accountants of India (ICAI) Regulations:</strong><br />
            As per the rules of the ICAI, we are not permitted to solicit work or advertise. By accessing this website, you acknowledge that you are seeking information about CA Shantanu & Associates of your own accord and that there has been no form of solicitation, advertisement, or inducement by the firm or its members.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            &larr; Back to Home
          </Link>
          <a href="mailto:shantanus.associates@gmail.com" className="text-sm text-slate-500 hover:text-slate-700">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
