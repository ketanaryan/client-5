import re

content = """
  "gst-registration": {
    title: "GST Registration",
    heroHeading: "GST Registration Online – Process, Documents & Fees",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "The Goods and Services Tax (GST) is the backbone of India's indirect tax structure. Obtaining a GST Registration is legally mandatory for businesses crossing the prescribed annual turnover threshold (₹40 Lakhs for goods, ₹20 Lakhs for services in most states) or those engaged in inter-state taxable supply.",
      "Operating without a valid GSTIN when liable can result in heavy monetary penalties, confiscation of goods, and loss of input tax credit. It also prevents you from legally collecting taxes from your buyers or passing on the credit chain.",
      "At Shantanu & Associates, our tax professionals manage the entire lifecycle of your GST registration. We eliminate the bureaucratic friction, ensure exact classification of your HSN/SAC codes, and get your firm legally registered and compliant within standard departmental timelines."
    ],
    eligibility: [
      "Any business crossing the ₹40 Lakh turnover threshold for goods (₹20 Lakh for special category states).",
      "Any business crossing the ₹20 Lakh turnover threshold for services (₹10 Lakh for special category states).",
      "Businesses involved in the inter-state supply of taxable goods or services.",
      "E-commerce operators and individuals supplying through e-commerce platforms.",
      "Casual taxable persons and Non-Resident Taxable Persons (NRTP).",
      "Entities required to deduct TDS or collect TCS under the GST framework."
    ],
    documentsRequired: [
      "PAN Card of the Business Entity / Proprietor.",
      "Aadhaar Card and Passport size photographs of all Directors / Partners / Proprietor.",
      "Proof of Business Registration (Incorporation Certificate, Partnership Deed, etc.).",
      "Valid Address Proof for Principal Place of Business (Electricity Bill, Rent Agreement, NOC from owner).",
      "Active Bank Account details (Cancelled Cheque or recent Bank Statement).",
      "Digital Signature Certificate (DSC) for Companies and LLPs.",
      "Letter of Authorization / Board Resolution for the Authorized Signatory."
    ],
    process: [
      "Initial Consultation: We assess your business model to determine the exact GST applicability and state-specific requirements.",
      "Document Compilation: Our team rigorously checks your KYC and premise documents to prevent application rejection.",
      "Application Filing: We draft and file the GST REG-01 form on the GST Portal using accurate HSN/SAC classifications.",
      "Query Resolution: If the assessing officer raises a Notice for Clarification (SCN), we draft and file the legal response on your behalf.",
      "Certificate Issuance: Upon successful approval, we deliver your official GSTIN, GST Registration Certificate, and login credentials.",
      "Post-Registration Setup: We guide you through the mandatory bank account linking and initial invoicing rules."
    ],
    subServicesHeading: "Our Comprehensive GST Offerings:",
    subServices: [
      "End-to-end GST Registration and core amendments.",
      "Filing responses to GST Departmental Notices.",
      "Cancellation and revocation of suspended GSTINs.",
      "Mapping and optimization of Input Tax Credit (ITC).",
      "LUT (Letter of Undertaking) filing for Exporters."
    ]
  },
  "msme-udyam-registration": {
    title: "MSME Udyam Registration",
    heroHeading: "Udyam Registration for Micro, Small and Medium Enterprises",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "The MSME sector is a critical growth engine for the Indian economy. To support these enterprises, the Government of India introduced the Udyam Registration framework—a simple, paperless certification based on self-declaration.",
      "Registering your entity as an MSME unlocks a powerful suite of government incentives, statutory protections against delayed payments, and priority treatment in corporate ecosystems and public procurement.",
      "Shantanu & Associates handles the end-to-end Udyam classification and registration process. We ensure your investment and turnover data is accurately linked with the IT and GST portals to secure your MSME status without future compliance friction."
    ],
    eligibility: [
      "Micro Enterprises: Investment in Plant & Machinery/Equipment up to ₹1 Crore AND Turnover up to ₹5 Crores.",
      "Small Enterprises: Investment up to ₹10 Crores AND Turnover up to ₹50 Crores.",
      "Medium Enterprises: Investment up to ₹50 Crores AND Turnover up to ₹250 Crores.",
      "Manufacturing units, service providers, and traders are all eligible to obtain Udyam Registration."
    ],
    documentsRequired: [
      "Aadhaar Number of the Proprietor / Managing Partner / Director.",
      "PAN Card details of the Business Entity.",
      "GST Certificate (if applicable and registered).",
      "Details of primary business activities and appropriate NIC codes.",
      "Bank Account details (Account Number and IFSC Code).",
      "Historical data regarding investment in plant and machinery."
    ],
    process: [
      "Data Collation: Gathering Aadhaar, PAN, and business activity details.",
      "NIC Code Selection: Scientifically selecting the National Industrial Classification (NIC) code that matches your actual operations.",
      "Portal Submission: Filing the digital application on the official Udyam Registration portal via Aadhaar OTP validation.",
      "Data Linking: Ensuring proper synchronization with CBDT (Income Tax) and CBIC (GST) databases.",
      "Certificate Generation: Issuance of the lifetime valid Udyam Registration Certificate featuring the unique URN."
    ],
    subServicesHeading: "Strategic MSME Services:",
    subServices: [
      "New Udyam Registration processing.",
      "Updating or amending existing Udyam profiles.",
      "Migration from legacy Udyog Aadhaar to Udyam.",
      "Consulting on MSME SAMADHAAN (delayed payment resolution).",
      "Advisory on CGTMSE (Collateral-free bank loans) eligibility."
    ]
  },
  "private-limited-company": {
    title: "Private Limited Company",
    heroHeading: "Incorporate a Private Limited Company (Pvt Ltd)",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "The Private Limited Company (Pvt. Ltd.) is the most respected and scalable business structure in India. It is governed by the Ministry of Corporate Affairs (MCA) under the Companies Act, 2013.",
      "Registering as a Pvt. Ltd. limits the personal liability of founders, allows for external equity funding from venture capitalists, enables ESOP structuring to retain top talent, and provides an unmatched level of corporate credibility to global clients and vendors.",
      "At Shantanu & Associates, we execute the entire incorporation lifecycle. From securing name approvals to drafting customized constitutional documents (MOA/AOA), our corporate legal experts ensure your company is structured with a rock-solid legal foundation."
    ],
    eligibility: [
      "Minimum of Two Directors (at least one must be an Indian Resident).",
      "Minimum of Two Shareholders (Directors can also be Shareholders).",
      "No minimum paid-up capital requirement.",
      "A registered office address situated in India.",
      "Directors must not be disqualified under the Companies Act, 2013."
    ],
    documentsRequired: [
      "Identity Proof: PAN Card (mandatory) and Passport/Voter ID/Driving License for all Directors.",
      "Address Proof: Recent Bank Statement, Electricity Bill, or Mobile Bill for all Directors.",
      "Photographs: Recent passport-size photographs.",
      "Registered Office Proof: Electricity Bill of the premises alongside a NOC from the property owner.",
      "If rented: A valid Rent Agreement for the registered office."
    ],
    process: [
      "Digital Signatures (DSC): Procuring Class-3 DSCs for the proposed directors.",
      "Name Approval (RUN/SPICe+ Part A): Reserving a unique corporate name that adheres to MCA naming guidelines.",
      "Drafting MOA & AOA: Structuring the Memorandum and Articles of Association customized to your operational goals.",
      "Filing SPICe+ Part B: Submitting the comprehensive incorporation suite (including agile-pro for PF/ESIC/GST/Bank).",
      "Certificate of Incorporation (COI): Obtaining the official COI, PAN, and TAN from the MCA.",
      "Post-Incorporation Compliance: Assisting with bank account opening and filing the mandatory Form INC-20A (Commencement of Business)."
    ],
    subServicesHeading: "Corporate Structuring Offerings:",
    subServices: [
      "End-to-end Pvt Ltd Incorporation via SPICe+.",
      "Drafting specialized MOA/AOA clauses for joint ventures.",
      "Advisory on Authorized vs. Paid-up Share Capital structuring.",
      "FDI compliance and RBI reporting for foreign directors/shareholders.",
      "Seamless integration with Startup India (DPIIT) registration."
    ]
  },
  "income-tax-return-filing": {
    title: "Income Tax Return Filing",
    heroHeading: "Comprehensive Income Tax Return (ITR) Filing Services",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Filing an accurate Income Tax Return (ITR) is an absolute legal necessity, whether you are a salaried professional, a freelance consultant, or a multi-crore corporate enterprise. The Indian tax regime requires meticulous disclosure of income across all statutory heads.",
      "Delaying or misreporting income can trigger severe scrutiny, aggressive penalties (under Section 270A), and persistent litigation with the Income Tax Department. A flawlessly optimized ITR acts as financial proof for loan processing, visa approvals, and carrying forward business losses.",
      "Shantanu & Associates transforms tax filing from a stressful obligation into a strategic advantage. Our Chartered Accountants comprehensively analyze your Annual Information Statement (AIS) and Form 26AS, maximize your eligible deductions, and file your taxes with clinical precision."
    ],
    eligibility: [
      "Individuals whose gross total income exceeds the basic exemption limit (₹3 Lakhs under the new regime, ₹2.5 Lakhs under the old regime).",
      "All registered Companies and LLPs, irrespective of profit or loss.",
      "Individuals holding foreign assets or signatory authority in foreign bank accounts.",
      "Individuals who have deposited over ₹1 Crore in current accounts or spent over ₹2 Lakhs on foreign travel.",
      "Taxpayers wishing to carry forward capital or business losses to subsequent financial years."
    ],
    documentsRequired: [
      "PAN and Aadhaar Card.",
      "Form 16 (for salaried individuals) and Form 16A/16B/16C for TDS deducted on other incomes.",
      "Bank Statements for the entire financial year to reconcile interest and transactions.",
      "Investment Proofs (LIC, PPF, ELSS, Medical Insurance, Home Loan Certificates).",
      "Capital Gains Statements from brokers (Zerodha, Groww, Upstox, etc.).",
      "Books of Accounts and Audit Reports (for businesses and professionals under presumptive taxation)."
    ],
    process: [
      "Data Collection & AIS Reconciliation: We cross-verify your provided documents against the Income Tax Department's AIS/TIS to prevent mismatch notices.",
      "Regime Optimization: We simulate your tax liability under both the Old and New Tax Regimes to determine the most beneficial structure.",
      "Drafting Computations: Our CAs prepare a highly detailed computation of income, ensuring all legitimate Chapter VI-A deductions and set-offs are applied.",
      "Draft Review: You review the computation and authorize the final tax liability/refund figures.",
      "Filing & Verification: We transmit the applicable ITR form (ITR-1 to ITR-7) securely and assist with the mandatory e-Verification process via Aadhaar OTP."
    ],
    subServicesHeading: "Our Taxation & Filing Expertise:",
    subServices: [
      "ITR filing for Salaried Individuals, HNIs, and NRIs.",
      "Presumptive Tax filing (ITR-4) for freelancers and small businesses.",
      "Corporate Tax filing (ITR-6) including MAT/AMT computations.",
      "Capital Gains optimization for real estate, crypto, and equity traders.",
      "Filing Belated, Revised, and Updated Returns (ITR-U)."
    ]
  },
  "trademark-registration": {
    title: "Trademark Registration",
    heroHeading: "Protect Your Brand Identity with Trademark Registration",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Your brand name, logo, and slogan are among your company’s most valuable intellectual property. Without legal registration, competitors can easily hijack your identity, confusing your customers and diluting your market position.",
      "A Trademark Registration grants you exclusive statutory rights across India under the Trade Marks Act, 1999. It empowers you to take aggressive legal action against infringers and use the coveted ® symbol, instantly boosting brand trust and valuation.",
      "Shantanu & Associates handles the complex trademark lifecycle. From conducting exhaustive phonetic searches to responding to Registry objections, our IP attorneys ensure your brand is heavily shielded against corporate theft."
    ],
    eligibility: [
      "Individuals, Proprietorships, and Freelancers.",
      "Private Limited Companies, LLPs, and Partnership Firms.",
      "Non-Governmental Organizations (NGOs) and Trusts.",
      "Foreign entities seeking trademark protection within Indian territory."
    ],
    documentsRequired: [
      "A clear copy of the Logo / Wordmark / Device Mark.",
      "User Affidavit (if the trademark is already in use prior to application).",
      "Signed Form TM-48 (Power of Attorney authorizing us to file on your behalf).",
      "MSME Udyam Certificate or Startup India Certificate (to claim a 50% discount on government fees).",
      "Details of the applicant (Name, Address, Nationality/Incorporation)."
    ],
    process: [
      "Comprehensive TM Search: We conduct a deep-dive search across the exact and phonetically similar classes to gauge the probability of approval.",
      "Class Selection: We pinpoint the absolute correct classification (out of 45 Vienna Classes) to ensure complete protection for your specific goods/services.",
      "Application Filing: We draft and file Form TM-A with the Trademark Registry.",
      "Objection Handling: If the Examiner raises an objection (under Section 9 or 11), we draft comprehensive legal arguments referencing judicial precedents.",
      "Journal Publication & Registration: Once accepted, the mark is published in the TM Journal. If unopposed for 4 months, the final Registration Certificate is issued."
    ],
    subServicesHeading: "Our Intellectual Property Services:",
    subServices: [
      "Pre-filing Trademark Search and Risk Analysis.",
      "Drafting and filing robust responses to Examination Reports.",
      "Attending Trademark Hearings on behalf of the applicant.",
      "Filing Trademark Renewals (Form TM-R).",
      "Drafting Cease & Desist Notices for trademark infringement."
    ]
  }
"""

import sys
with open('src/app/services/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# I will update the typescript type
new_type = """type ServiceData = {
  title: string;
  heroHeading: string;
  image: string;
  introduction: string[];
  eligibility?: string[];
  documentsRequired?: string[];
  process?: string[];
  subServicesHeading: string;
  subServices: string[];
};"""
code = re.sub(r'type ServiceData = \{.*?\};', new_type, code, flags=re.DOTALL)

# Let's replace the first 5 services with the rich content.
for service_id in ['gst-registration', 'msme-udyam-registration', 'private-limited-company', 'income-tax-return-filing', 'trademark-registration']:
    # extract the block from content
    match = re.search(r'  "' + service_id + r'": \{.*?\n  \},', content, re.DOTALL)
    if not match:
        match = re.search(r'  "' + service_id + r'": \{.*?\]\n  \}', content, re.DOTALL)
    
    if match:
        replacement = match.group(0)
        # find the original in code
        orig_match = re.search(r'  "' + service_id + r'": \{.*?\n  \},?', code, re.DOTALL)
        if orig_match:
            code = code.replace(orig_match.group(0), replacement + ("," if replacement.endswith("}") else ""))

# Now update the React rendering logic
render_orig = """            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Overview</h2>
              <div className="space-y-6 text-lg text-slate-600">
                {service.introduction.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  {service.subServicesHeading}
                </h3>
                <ul className="space-y-4">
                  {service.subServices.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700 leading-relaxed">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>"""

render_new = """            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Overview</h2>
                <div className="space-y-5 text-[17px] leading-relaxed text-slate-600 text-justify">
                  {service.introduction.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {service.eligibility && (
                <section className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-[#032b4e] mb-6">Who Needs This? (Applicability)</h3>
                  <ul className="space-y-4">
                    {service.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div></div>
                        <span className="text-slate-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {service.documentsRequired && (
                <section>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Documents Required</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.documentsRequired.map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-sm text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {service.process && (
                <section>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Process</h3>
                  <div className="space-y-6 border-l-2 border-blue-100 ml-3 pl-6 relative">
                    {service.process.map((item, idx) => {
                      const parts = item.split(':');
                      return (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
                        <strong className="text-slate-900 block mb-1 text-lg">{parts[0]}</strong>
                        <p className="text-slate-600 leading-relaxed">{parts.slice(1).join(':')}</p>
                      </div>
                    )})}
                  </div>
                </section>
              )}

              <div className="mt-12 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  {service.subServicesHeading}
                </h3>
                <ul className="space-y-4">
                  {service.subServices.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm mt-0.5 ring-4 ring-white shadow-sm">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700 leading-relaxed mt-1 font-medium">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>"""

code = code.replace(render_orig, render_new)

with open('src/app/services/[slug]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print("Updated successfully")
