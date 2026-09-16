import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/public/Navbar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type ServiceData = {
  title: string;
  heroHeading: string;
  image: string;
  introduction: string[];
  subServicesHeading: string;
  subServices: string[];
};

const SERVICES: Record<string, ServiceData> = {
  "gst-registration": {
    title: "GST Registration",
    heroHeading: "GST Registration Online – Process, Documents & Fees",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Goods and Services Tax (GST) registration is a mandatory compliance for businesses whose aggregate turnover exceeds the prescribed threshold limit or who engage in inter-state supply.",
      "At Shantanu & Associates, we simplify the entire GST registration process. We handle everything from document compilation to final certificate issuance, ensuring strict adherence to the latest tax regulations."
    ],
    subServicesHeading: "Our GST Registration Offerings:",
    subServices: [
      "Consultation on GST applicability and category selection.",
      "Preparation and compilation of required KYC documents.",
      "Filing the GST registration application on the official portal.",
      "Prompt response to departmental notices or clarifications.",
      "Guidance on mandatory display of GSTIN.",
      "Assistance with initial invoicing and core amendments."
    ]
  },
  "msme-udyam-registration": {
    title: "MSME Udyam Registration",
    heroHeading: "Udyam Registration for Micro, Small and Medium Enterprises",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "MSME Udyam Registration offers a wide array of benefits including priority sector lending, lower interest rates, and subsidies from state and central governments.",
      "Shantanu & Associates assists eligible entities in classifying their enterprise and obtaining the Udyam Registration Certificate efficiently without administrative hurdles."
    ],
    subServicesHeading: "Our MSME Udyam Registration Services:",
    subServices: [
      "Evaluating eligibility based on investment and turnover criteria.",
      "Assistance in NIC code selection for manufacturing and services.",
      "Online filing of the Udyam registration form.",
      "Guidance on linking Udyam with GST and Income Tax data.",
      "Updating existing Udyam registration certificates.",
      "Consulting on MSME benefits and subsidy claims."
    ]
  },
  "pf-registration": {
    title: "PF Registration",
    heroHeading: "Provident Fund (EPF) Registration & Compliance",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Employee Provident Fund (EPF) registration is mandatory for establishments employing 20 or more persons, acting as a crucial social security benefit for the workforce.",
      "Shantanu & Associates ensures smooth PF registration for your organization, helping you foster a secure environment for employees while remaining fully compliant with labor laws."
    ],
    subServicesHeading: "Our PF Registration Services include:",
    subServices: [
      "Assessment of PF applicability for the organization.",
      "Preparation of required documentation and digital signatures.",
      "Filing of the EPF registration application on the Shram Suvidha portal.",
      "Obtaining the establishment PF code number.",
      "Guidance on employee UAN generation.",
      "Advisory on monthly PF contributions and return filings."
    ]
  },
  "esic-registration": {
    title: "ESIC Registration",
    heroHeading: "Employees' State Insurance Corporation (ESIC) Registration",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "ESIC registration is a statutory responsibility for employers having 10 or more employees, providing medical and financial assistance to employees and their dependents.",
      "At Shantanu & Associates, we navigate the complex ESIC registration process on your behalf, guaranteeing that your business fulfills its statutory obligations accurately."
    ],
    subServicesHeading: "Our ESIC Registration Offerings:",
    subServices: [
      "Evaluating ESIC applicability and wage limits.",
      "Document preparation and compilation.",
      "Online application filing through the ESIC portal.",
      "Procurement of the 17-digit employer code.",
      "Assistance with employee Pehchan card generation.",
      "Guidance on monthly ESIC contribution procedures."
    ]
  },
  "professional-tax-registration": {
    title: "Professional Tax Registration",
    heroHeading: "Professional Tax Enrolment and Registration (PTEC & PTRC)",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Professional tax is a state-level tax levied on individuals earning an income from a profession, trade, or employment. Employers are required to obtain both PTEC and PTRC.",
      "Shantanu & Associates provides prompt professional tax registration services, ensuring that your organization adheres to state-specific tax laws and avoids unwarranted penalties."
    ],
    subServicesHeading: "Our Professional Tax Services:",
    subServices: [
      "Determination of applicable state professional tax laws.",
      "Application for Professional Tax Enrolment Certificate (PTEC).",
      "Application for Professional Tax Registration Certificate (PTRC).",
      "Filing and processing of documentation with local authorities.",
      "Advisory on tax slab rates for employees.",
      "Guidance on periodic professional tax return filings."
    ]
  },
  "fssai-registration": {
    title: "FSSAI Registration",
    heroHeading: "Food License (FSSAI) Registration & Compliance",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Every food business operator (FBO) involved in manufacturing, processing, storage, distribution, or sale of food products must possess an FSSAI license or registration.",
      "Shantanu & Associates assists FBOs in securing basic, state, or central FSSAI licenses, ensuring that your food business meets all required safety and quality standards."
    ],
    subServicesHeading: "Our FSSAI Registration Offerings:",
    subServices: [
      "Categorization of food business to determine license type.",
      "Preparation of specialized documents like FSMS plans.",
      "Filing the online application via the FoSCoS portal.",
      "Liaison with food safety officers during inspections.",
      "Assistance with FSSAI license renewal and modifications.",
      "Advisory on food product labeling compliance."
    ]
  },
  "rera-registration": {
    title: "RERA Registration",
    heroHeading: "Real Estate (Regulation and Development) Act Compliance",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "RERA aims to protect home-buyers and boost investments in the real estate sector. Project and agent registrations under RERA are mandatory for all commercial and residential real estate projects.",
      "Shantanu & Associates offers comprehensive RERA registration and compliance services for promoters and real estate agents, ensuring absolute transparency and legal conformity."
    ],
    subServicesHeading: "Our RERA Services include:",
    subServices: [
      "RERA project registration for promoters and developers.",
      "RERA agent registration and renewals.",
      "Quarterly and annual RERA compliance filings.",
      "Drafting and reviewing of allottee agreements.",
      "Handling RERA litigation and dispute resolution.",
      "Certification of project accounts by professionals."
    ]
  },
  "shop-act-registration": {
    title: "Shop Act Registration",
    heroHeading: "Shops and Establishments Act Intimation / Registration",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "The Shops and Establishments Act regulates the working conditions, rights of workers, and operational parameters of commercial establishments operating within a state.",
      "At Shantanu & Associates, we facilitate hassle-free Shop Act registrations and intimations, securing your legal right to operate a commercial space while adhering to local civic norms."
    ],
    subServicesHeading: "Our Shop Act Offerings:",
    subServices: [
      "Preparation of Intimation or Registration application.",
      "Submission of documents to the municipal corporation.",
      "Guidance on statutory registers to be maintained.",
      "Assistance in amending existing Shop Act certificates.",
      "Renewal of expiring registrations.",
      "Advisory on working hours, holidays, and labor rules."
    ]
  },
  "iec-registration": {
    title: "IEC Registration",
    heroHeading: "Import Export Code (IEC) Registration",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "An Import Export Code (IEC) is a key business identification number mandatory for exports or imports to and from India, issued by the Directorate General of Foreign Trade (DGFT).",
      "Shantanu & Associates enables businesses to expand globally by swiftly obtaining their IEC, backed by our expertise in foreign trade policies and customs regulations."
    ],
    subServicesHeading: "Our IEC Registration Services:",
    subServices: [
      "Filing the IEC application with the DGFT.",
      "Preparation of required bank certificates and declarations.",
      "Assistance in updating or modifying existing IEC details.",
      "Annual updation of IEC as mandated by DGFT.",
      "Linking of IEC with custom ports.",
      "Advisory on export incentive schemes (RoDTEP, etc.)."
    ]
  },
  "trademark-registration": {
    title: "Trademark Registration",
    heroHeading: "Trademark Search, Filing and Protection",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "A registered trademark protects your brand identity, preventing unauthorized usage of your logos, brand names, and slogans by competitors.",
      "Shantanu & Associates offers end-to-end trademark services, safeguarding your intellectual property and establishing your unique identity in the marketplace."
    ],
    subServicesHeading: "Our Trademark Offerings:",
    subServices: [
      "Comprehensive trademark search and classification.",
      "Filing of the trademark registration application.",
      "Drafting and filing replies to trademark objections.",
      "Representation in trademark opposition hearings.",
      "Assistance with trademark renewals.",
      "Advisory on trademark assignment and licensing."
    ]
  },
  "private-limited-company": {
    title: "Private Limited Company",
    heroHeading: "Private Limited Company Incorporation Services",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "A Private Limited Company is the most popular corporate structure in India, preferred by startups and growing businesses for its limited liability and ability to raise external funding.",
      "Shantanu & Associates provides a seamless incorporation experience, managing everything from name approval to obtaining the Certificate of Incorporation, PAN, and TAN."
    ],
    subServicesHeading: "Our Incorporation Services include:",
    subServices: [
      "Digital Signature Certificate (DSC) procurement.",
      "Name reservation via the SPICe+ Part A form.",
      "Drafting of Memorandum and Articles of Association (MOA & AOA).",
      "Filing of incorporation forms with the MCA.",
      "Assistance in opening a corporate bank account.",
      "Guidance on initial post-incorporation compliances."
    ]
  },
  "one-person-company": {
    title: "One Person Company (OPC)",
    heroHeading: "One Person Company Registration",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "The One Person Company (OPC) structure allows a single entrepreneur to operate a corporate entity with limited liability protection, blending the simplicity of a sole proprietorship with corporate status.",
      "Shantanu & Associates expertly guides solo entrepreneurs through the OPC registration process, ensuring compliance with the specialized rules regarding nominees and structural limits."
    ],
    subServicesHeading: "Our OPC Registration Offerings:",
    subServices: [
      "Advisory on OPC eligibility and nominee selection.",
      "Procurement of DSC and Director Identification Number (DIN).",
      "Drafting specialized MOA and AOA for OPCs.",
      "Filing of SPICe+ forms with the Registrar of Companies.",
      "Assistance with mandatory nominee consent forms.",
      "Conversion of OPC to Private Limited Company when required."
    ]
  },
  "llp-registration": {
    title: "Limited Liability Partnership (LLP)",
    heroHeading: "LLP Registration and Advisory",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "A Limited Liability Partnership (LLP) offers the benefits of limited liability while providing the operational flexibility of a traditional partnership, making it ideal for professional services.",
      "At Shantanu & Associates, we manage the entire LLP formation lifecycle, including the drafting of robust partnership agreements to prevent future disputes."
    ],
    subServicesHeading: "Our LLP Registration Services:",
    subServices: [
      "Name availability search and reservation (RUN-LLP).",
      "Drafting of the comprehensive LLP Agreement.",
      "Filing of incorporation documents (FiLLiP form).",
      "Obtaining the LLP Identification Number (LLPIN).",
      "Filing the LLP agreement within 30 days of incorporation.",
      "Guidance on annual LLP compliance (Form 8 and Form 11)."
    ]
  },
  "partnership-firm-registration": {
    title: "Partnership Firm Registration",
    heroHeading: "Partnership Deed Drafting and Firm Registration",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "A Partnership Firm is a traditional business structure where two or more individuals manage and operate a business according to the terms of a Partnership Deed.",
      "Shantanu & Associates specializes in drafting customized partnership deeds and registering the firm with the Registrar of Firms, ensuring a solid legal foundation for your joint venture."
    ],
    subServicesHeading: "Our Partnership Registration Offerings:",
    subServices: [
      "Drafting a tailored Partnership Deed detailing profit sharing and roles.",
      "Notarization and stamping of the Partnership Deed.",
      "Applying for PAN and TAN for the partnership firm.",
      "Registration with the state Registrar of Firms (RoF).",
      "Assistance with opening the firm's bank account.",
      "Advisory on reconstitution or dissolution of the firm."
    ]
  },
  "section-8-company": {
    title: "Section 8 Company / NGO",
    heroHeading: "Section 8 Company Registration for Non-Profits",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "A Section 8 Company is registered for charitable or not-for-profit purposes, dedicated to promoting commerce, art, science, sports, education, or social welfare.",
      "Shantanu & Associates assists philanthropists and organizations in establishing Section 8 companies, ensuring compliance with strict non-profit regulations and securing tax exemptions."
    ],
    subServicesHeading: "Our Section 8 Incorporation Services:",
    subServices: [
      "Drafting specialized MOA and AOA outlining charitable objectives.",
      "Applying for a Section 8 License from the MCA.",
      "Filing of incorporation forms (SPICe+).",
      "Guidance on obtaining 12A and 80G registrations under Income Tax.",
      "Assistance with CSR registration (CSR-1).",
      "Advisory on fund utilization and statutory auditing."
    ]
  },
  "sole-proprietorship": {
    title: "Sole Proprietorship",
    heroHeading: "Sole Proprietorship Setup and Compliance",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "A Sole Proprietorship is the simplest form of business entity, owned and run by a single individual with no legal distinction between the owner and the business entity.",
      "Shantanu & Associates helps small business owners establish their sole proprietorships through necessary local and tax registrations, establishing a formal business identity."
    ],
    subServicesHeading: "Our Sole Proprietorship Services:",
    subServices: [
      "Registration under the local Shops and Establishments Act.",
      "Procurement of MSME Udyam Registration.",
      "Obtaining Goods and Services Tax (GST) Registration.",
      "Assistance with opening a current bank account.",
      "Income tax advisory for proprietary businesses.",
      "Guidance on protecting business names via trademark."
    ]
  },
  "audit-and-assurance": {
    title: "Audit & Assurance",
    heroHeading: "Comprehensive Audit & Assurance Services",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "In a dynamic regulatory landscape, robust audit and assurance services are vital for maintaining stakeholder trust and ensuring accurate financial reporting.",
      "Shantanu & Associates provides rigorous, independent audit services tailored to your industry, helping you identify risks, improve internal controls, and comply with all statutory requirements."
    ],
    subServicesHeading: "Our Audit Offerings include:",
    subServices: [
      "Statutory audits under the Companies Act.",
      "Tax audits under the Income Tax Act.",
      "Internal and management audits.",
      "GST audits and reconciliations.",
      "Bank concurrent and statutory branch audits.",
      "Information systems and compliance audits."
    ]
  },
  "statutory-audit": {
    title: "Statutory Audit",
    heroHeading: "Statutory Audit under the Companies Act",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "A Statutory Audit is legally mandated to evaluate the financial statements and records of a company, ensuring that they represent a true and fair view of its financial position.",
      "At Shantanu & Associates, our statutory audit procedures comply meticulously with the Standards on Auditing (SAs) issued by the ICAI, providing stakeholders with reliable financial insights."
    ],
    subServicesHeading: "Our Statutory Audit Services:",
    subServices: [
      "Comprehensive examination of financial statements.",
      "Verification of compliance with Accounting Standards (Ind AS / AS).",
      "Evaluation of internal financial controls over financial reporting.",
      "Reporting requirements under CARO.",
      "Liaison with management on key audit matters.",
      "Issuance of independent auditor's report."
    ]
  },
  "internal-audit": {
    title: "Internal Audit",
    heroHeading: "Internal Audit and Risk Advisory",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Internal audits act as a catalyst for improving an organization's governance, risk management, and management controls by providing independent, objective insight.",
      "Shantanu & Associates designs custom internal audit plans focused on process optimization, fraud prevention, and operational efficiency, empowering management to make informed decisions."
    ],
    subServicesHeading: "Our Internal Audit Services:",
    subServices: [
      "Risk assessment and internal audit planning.",
      "Evaluation of operational processes and standard operating procedures (SOPs).",
      "Identification of revenue leakages and cost optimization avenues.",
      "Assessment of internal financial controls.",
      "Inventory and fixed asset verification.",
      "Periodic management reporting and actionable recommendations."
    ]
  },
  "tax-audit": {
    title: "Tax Audit",
    heroHeading: "Income Tax Audit Services (Section 44AB)",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Under Section 44AB of the Income Tax Act, businesses and professionals exceeding specific turnover thresholds must undergo a Tax Audit by a practicing Chartered Accountant.",
      "Shantanu & Associates conducts thorough tax audits to ensure your tax computations are accurate, disclosures are complete, and you remain protected from penal consequences."
    ],
    subServicesHeading: "Our Tax Audit Offerings:",
    subServices: [
      "Verification of books of accounts for tax compliance.",
      "Preparation and filing of Form 3CA/3CB and Form 3CD.",
      "Reconciliation of income with GST returns.",
      "Checking compliance with TDS/TCS provisions.",
      "Advisory on disallowances under the Income Tax Act.",
      "Timely uploading of audit reports on the IT portal."
    ]
  },
  "gst-audit": {
    title: "GST Audit",
    heroHeading: "GST Audit, Reconciliation, and Annual Returns",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "GST audits and annual reconciliations are critical to identifying mismatches between books of accounts and filed returns, mitigating the risk of departmental scrutiny.",
      "Shantanu & Associates provides exhaustive GST reconciliation services, ensuring your Input Tax Credit (ITC) claims are valid and your liability is accurately discharged."
    ],
    subServicesHeading: "Our GST Audit Services:",
    subServices: [
      "Filing of Annual Return (Form GSTR-9).",
      "Filing of Reconciliation Statement (Form GSTR-9C).",
      "Reconciliation of GSTR-1, GSTR-3B, and GSTR-2A/2B.",
      "Verification of HSN classifications and applicable rates.",
      "Review of e-way bills and e-invoicing compliance.",
      "Advisory on rectifying reporting errors in subsequent returns."
    ]
  },
  "bank-audit": {
    title: "Bank Audit",
    heroHeading: "Bank Statutory and Branch Audits",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Bank audits involve a specialized review of banking operations, loan portfolios, and regulatory compliances as mandated by the Reserve Bank of India (RBI).",
      "Shantanu & Associates possesses the expertise required to conduct robust branch statutory audits, ensuring asset classification and income recognition conform to RBI guidelines."
    ],
    subServicesHeading: "Our Bank Audit Services:",
    subServices: [
      "Statutory branch audits for nationalized and private banks.",
      "Verification of Non-Performing Assets (NPA) classification.",
      "Review of income recognition and provisioning norms.",
      "Assessment of capital adequacy and internal controls.",
      "Reporting under Long Form Audit Report (LFAR).",
      "Certification of specialized banking returns."
    ]
  },
  "concurrent-audit": {
    title: "Concurrent Audit",
    heroHeading: "Concurrent and Revenue Audits for Financial Institutions",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Concurrent audit is a systematic and timely examination of financial transactions on a regular basis to ensure accuracy, authenticity, and compliance with guidelines.",
      "At Shantanu & Associates, our concurrent audit teams provide real-time monitoring of transactions, early detection of irregularities, and strengthening of internal controls for banks and NBFCs."
    ],
    subServicesHeading: "Our Concurrent Audit Offerings:",
    subServices: [
      "Daily/weekly verification of banking and cash transactions.",
      "Scrutiny of loan documentation and disbursement procedures.",
      "Detection and prevention of revenue leakages.",
      "Verification of KYC and AML compliance.",
      "Checking foreign exchange transactions.",
      "Providing immediate feedback to branch management."
    ]
  },
  "taxation-services": {
    title: "Taxation Services",
    heroHeading: "Comprehensive Direct & Indirect Tax Advisory",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Navigating India’s complex tax framework requires strategic foresight and meticulous compliance. Effective tax planning impacts the bottom line and operational sustainability.",
      "Shantanu & Associates offers end-to-end taxation services spanning Income Tax, GST, International Taxation, and Transfer Pricing to individuals, HNIs, and corporate entities."
    ],
    subServicesHeading: "Our Core Taxation Services:",
    subServices: [
      "Corporate and individual income tax return filing.",
      "Strategic tax planning and transaction advisory.",
      "Representation in tax litigation and assessments.",
      "TDS and TCS compliance management.",
      "Comprehensive GST compliance and advisory.",
      "Capital gains optimization and investment structuring."
    ]
  },
  "income-tax-return-filing": {
    title: "Income Tax Return Filing",
    heroHeading: "Expert Income Tax Return (ITR) Filing Services",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Filing an Income Tax Return accurately and on time is a civic duty and a financial necessity for claiming refunds, carrying forward losses, and processing loan applications.",
      "Shantanu & Associates ensures precise computation of income, optimal utilization of deductions under Chapter VI-A, and seamless e-filing of ITR for all categories of taxpayers."
    ],
    subServicesHeading: "Our ITR Filing Services include:",
    subServices: [
      "Preparation and filing of ITR for Salaried Individuals and HNIs.",
      "Filing ITR for Businesses, Professionals, and Freelancers.",
      "Corporate tax return filing (ITR-6).",
      "Reconciliation of Form 26AS, AIS, and TIS.",
      "Computation and filing for Capital Gains from real estate and equities.",
      "Response to intimation under Section 143(1) and defect notices."
    ]
  },
  "advance-tax-planning": {
    title: "Advance Tax Planning",
    heroHeading: "Strategic Advance Tax Planning & Computation",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Advance tax refers to paying a part of your annual tax liability before the end of the financial year. Failure to pay adequate advance tax results in penal interest under sections 234B and 234C.",
      "At Shantanu & Associates, we project your annual profitability, formulate tax-saving strategies, and ensure timely payment of advance tax installments to optimize cash flow."
    ],
    subServicesHeading: "Our Advance Tax Services:",
    subServices: [
      "Quarterly projection of income and tax liability.",
      "Calculation of advance tax installments.",
      "Advisory on tax-saving investments and restructuring.",
      "Remittance of advance tax via challans.",
      "Mitigation strategies for interest under 234A/B/C.",
      "Year-end tax optimization reviews."
    ]
  },
  "tds-compliance": {
    title: "TDS Compliance & Returns",
    heroHeading: "TDS / TCS Advisory and Return Filing",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Tax Deducted at Source (TDS) and Tax Collected at Source (TCS) are crucial compliance areas. Errors in deduction rates or filing delays lead to severe financial penalties and disallowance of expenses.",
      "Shantanu & Associates manages the entire spectrum of TDS compliance, from calculating correct deduction rates to timely filing of quarterly statements and issuing certificates."
    ],
    subServicesHeading: "Our TDS Compliance Offerings:",
    subServices: [
      "Advisory on applicable TDS/TCS rates and thresholds.",
      "Preparation and filing of quarterly returns (Forms 24Q, 26Q, 27Q, 27EQ).",
      "Generation and issuance of Form 16 and Form 16A.",
      "Correction of filed TDS statements and addressing defaults.",
      "Advisory on Lower Deduction Certificates (Section 197).",
      "Reconciliation of TDS with books of accounts."
    ]
  },
  "tax-litigation": {
    title: "Tax Litigation Support",
    heroHeading: "Tax Assessments, Appeals & Litigation Advisory",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Tax scrutiny, notices, and assessments can be highly stressful and financially damaging if not handled with profound legal expertise and meticulous documentation.",
      "Shantanu & Associates represents clients before tax authorities and appellate tribunals. We draft robust legal replies and construct strategic defenses to resolve tax disputes favorably."
    ],
    subServicesHeading: "Our Tax Litigation Services:",
    subServices: [
      "Drafting replies to scrutiny notices (Section 143(2), 148, etc.).",
      "Representation before the Assessing Officer (AO) during assessments.",
      "Preparation and filing of appeals before CIT(Appeals).",
      "Representation before the Income Tax Appellate Tribunal (ITAT).",
      "Handling penalty proceedings and prosecution matters.",
      "Advisory on dispute resolution schemes (Vivad se Vishwas)."
    ]
  },
  "capital-gains-advisory": {
    title: "Capital Gains Advisory",
    heroHeading: "Tax Planning for Capital Gains",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "The sale of immovable property, shares, or mutual funds attracts capital gains tax. Without structured planning, these transactions can lead to significant tax outflows.",
      "Shantanu & Associates provides specialized advisory on structuring asset sales to minimize tax liability, leveraging exemptions available under sections like 54, 54EC, and 54F."
    ],
    subServicesHeading: "Our Capital Gains Offerings:",
    subServices: [
      "Computation of Short-Term and Long-Term Capital Gains.",
      "Advisory on claiming exemptions under Section 54 series.",
      "Guidance on capital gains bonds (54EC) and Capital Gains Account Scheme.",
      "Tax structuring for property sale by NRIs.",
      "Valuation advisory for real estate and unlisted shares.",
      "Filing of ITR reflecting capital gains transactions."
    ]
  },
  "gst-return-filing": {
    title: "GST Return Filing",
    heroHeading: "Monthly and Quarterly GST Return Filing",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Timely and accurate filing of GST returns is crucial to avoid late fees, interest, and the denial of input tax credit to your customers.",
      "At Shantanu & Associates, we automate and validate your GST data, ensuring seamless filing of all applicable returns while keeping you fully compliant with evolving GST rules."
    ],
    subServicesHeading: "Our GST Return Services:",
    subServices: [
      "Filing of GSTR-1 (Outward Supplies) and GSTR-3B.",
      "Filing under the QRMP scheme for eligible taxpayers.",
      "Reconciliation of GSTR-2A/2B to maximize Input Tax Credit.",
      "Filing of specific returns (GSTR-4, GSTR-5, GSTR-6, GSTR-7).",
      "Generation of e-way bills and e-invoices.",
      "Review of HSN/SAC codes and tax rates applied."
    ]
  },
  "gst-compliance": {
    title: "GST Compliance",
    heroHeading: "End-to-End GST Advisory and Compliance",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "The GST law undergoes frequent amendments via notifications and circulars, making continuous compliance a complex task for in-house teams.",
      "Shantanu & Associates acts as your extended tax department, providing proactive advisory on transaction structuring, classification, and place of supply rules."
    ],
    subServicesHeading: "Our GST Compliance Services:",
    subServices: [
      "Opinion on taxability of complex transactions.",
      "Review of internal processes and ERP tax setups.",
      "Advisory on cross-border transactions and exports (LUT).",
      "Drafting replies to routine GST notices and intimations.",
      "Assistance in obtaining Advance Rulings.",
      "Training of corporate staff on GST updates."
    ]
  },
  "gst-refund": {
    title: "GST Refund",
    heroHeading: "GST Refund Claims and Processing",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Blocked working capital due to accumulated input tax credit or exports can severely impact liquidity. A structured approach is required to claim GST refunds efficiently.",
      "Shantanu & Associates specializes in preparing and filing robust refund applications, systematically tracking them until the amount is credited to your bank account."
    ],
    subServicesHeading: "Our GST Refund Services:",
    subServices: [
      "Refund of unutilized ITC due to zero-rated supplies (exports without payment of tax).",
      "Refund of IGST paid on export of goods or services.",
      "Refund arising from Inverted Duty Structure.",
      "Refund of excess balance in the Electronic Cash Ledger.",
      "Preparation of required CA certificates and annexures.",
      "Representation before GST authorities for refund sanction."
    ]
  },
  "gst-audit-assessment": {
    title: "GST Audit & Assessment",
    heroHeading: "Departmental GST Audit and Assessment Support",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "With the implementation of rigorous data analytics, tax authorities are increasingly conducting departmental audits (Section 65) and issuing assessment notices.",
      "Shantanu & Associates supports businesses in navigating departmental audits, compiling requested data, and representing the entity strongly before tax officials."
    ],
    subServicesHeading: "Our Assessment Support Services:",
    subServices: [
      "Pre-audit health checks and mock GST audits.",
      "Compilation of data and documents in the format required by Form ADT-01.",
      "Representation before GST officers during the audit process.",
      "Drafting robust replies to Audit Observations and Show Cause Notices (SCN).",
      "Filing appeals before the Joint Commissioner (Appeals).",
      "Handling anti-evasion inquiries and summons."
    ]
  },
  "input-tax-credit": {
    title: "Input Tax Credit",
    heroHeading: "Input Tax Credit (ITC) Optimization & Advisory",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Claiming Input Tax Credit correctly is the cornerstone of the GST regime. Identifying eligible credits while avoiding blocked credits under Section 17(5) requires precision.",
      "At Shantanu & Associates, we conduct specialized ITC reviews to identify missed credits, ensure compliance with the 180-day payment rule, and optimize your overall tax payout."
    ],
    subServicesHeading: "Our ITC Services include:",
    subServices: [
      "Comprehensive review of expense ledgers for eligible ITC.",
      "Automated reconciliation of GSTR-2B with purchase registers.",
      "Advisory on apportionment of credit for exempt and taxable supplies.",
      "Guidance on blocked credit (Section 17(5)) applicability.",
      "Reversal mechanism advisory (Rule 42 and Rule 43).",
      "Vendor communication strategies for non-compliant suppliers."
    ]
  },
  "nri-tax-services": {
    title: "NRI Tax Services",
    heroHeading: "Specialized Tax & Compliance Services for NRIs",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Non-Resident Indians (NRIs) face unique financial and regulatory challenges when managing their investments, properties, and income sources in India.",
      "Shantanu & Associates offers dedicated NRI desks that provide holistic solutions encompassing taxation, repatriation, and FEMA compliance, ensuring peace of mind across borders."
    ],
    subServicesHeading: "Our Core NRI Services:",
    subServices: [
      "Determination of residential status under FEMA and Income Tax.",
      "Filing of Income Tax Returns for NRI income in India.",
      "Advisory on Double Taxation Avoidance Agreements (DTAA).",
      "Assistance with Form 15CA/15CB for fund repatriation.",
      "Consulting on property transactions and lower TDS certificates.",
      "Advisory on NRO/NRE/FCNR account regulations."
    ]
  },
  "nri-income-tax-filing": {
    title: "NRI Income Tax Filing",
    heroHeading: "Income Tax Return Filing for NRIs",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "NRIs earning income in India through rent, capital gains, interest, or dividends are generally required to file an Income Tax Return in India.",
      "At Shantanu & Associates, we ensure accurate determination of your residential status and file your ITR in compliance with the provisions specifically applicable to non-residents."
    ],
    subServicesHeading: "Our NRI Tax Filing Services:",
    subServices: [
      "Residential status evaluation as per the Income Tax Act.",
      "Filing of ITR reporting Indian sourced income.",
      "Claiming refunds of excess TDS deducted by banks or buyers.",
      "Disclosure of foreign assets (if applicable).",
      "Responding to notices from the International Taxation ward.",
      "Advisory on specialized NRI tax rates (Chapter XII-A)."
    ]
  },
  "fema-compliance": {
    title: "FEMA Compliance",
    heroHeading: "Foreign Exchange Management Act (FEMA) Advisory",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Cross-border transactions, foreign direct investments, and external commercial borrowings are heavily regulated under FEMA. Non-compliance invites severe penalties.",
      "Shantanu & Associates provides expert guidance on FEMA regulations, assisting individuals and corporations in structuring transactions legally and filing statutory RBI returns."
    ],
    subServicesHeading: "Our FEMA Services include:",
    subServices: [
      "Advisory on Foreign Direct Investment (FDI) policies.",
      "Filing of Single Master Form (SMF) on the FIRMS portal (FC-GPR, FC-TRS).",
      "Filing of Annual Return on Foreign Liabilities and Assets (FLA).",
      "Advisory on External Commercial Borrowings (ECB).",
      "Compounding of contraventions under FEMA.",
      "Guidance on setting up branch or liaison offices in India."
    ]
  },
  "repatriation-of-funds": {
    title: "Repatriation of Funds",
    heroHeading: "Seamless Fund Repatriation and Form 15CA/15CB",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Repatriating funds out of India, whether from the sale of property, inheritance, or NRO account balances, requires specific certifications and banking clearances.",
      "Shantanu & Associates expedites the remittance process by issuing the mandatory Chartered Accountant certificates and ensuring compliance with the USD 1 Million scheme."
    ],
    subServicesHeading: "Our Repatriation Services:",
    subServices: [
      "Issuance of Form 15CB (CA Certificate).",
      "Preparation and online uploading of Form 15CA.",
      "Advisory on the Liberalized Remittance Scheme (LRS).",
      "Documentation support for banking channels.",
      "Repatriation of inherited assets and property sale proceeds.",
      "Advisory on minimizing tax impact during repatriation."
    ]
  },
  "dtaa-advisory": {
    title: "DTAA Advisory",
    heroHeading: "Double Taxation Avoidance Agreement Advisory",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "NRIs and foreign entities often face the risk of being taxed in both India and their country of residence. DTAA treaties provide relief through exemptions or tax credits.",
      "Shantanu & Associates interprets complex tax treaties to ensure you don't pay tax twice on the same income, optimizing your global tax footprint."
    ],
    subServicesHeading: "Our DTAA Services include:",
    subServices: [
      "Analysis of specific DTAA provisions between India and other nations.",
      "Procurement of Tax Residency Certificates (TRC).",
      "Filing of Form 10F for claiming treaty benefits.",
      "Advisory on claiming Foreign Tax Credit (FTC) via Form 67.",
      "Structuring of cross-border royalty and technical fees.",
      "Assistance with Mutual Agreement Procedure (MAP)."
    ]
  },
  "nri-property-tax": {
    title: "NRI Property Tax",
    heroHeading: "Taxation on Purchase and Sale of Property by NRIs",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Real estate transactions involving NRIs attract high TDS rates (up to 23.92%) on the sale value, leading to significant cash flow blockages.",
      "At Shantanu & Associates, we assist NRIs in minimizing this upfront tax burden by applying for Lower Deduction Certificates and expertly planning the capital gains exemptions."
    ],
    subServicesHeading: "Our NRI Property Tax Services:",
    subServices: [
      "Application for Lower or Nil TDS Certificate (Form 13).",
      "Computation of Capital Gains on property sale.",
      "Advisory on reinvestment bonds (54EC) for NRIs.",
      "Guidance on TDS compliance for the buyer (Form 16A issuance).",
      "Assistance with property valuation reports.",
      "Full representation before the Jurisdictional Assessing Officer."
    ]
  },
  "corporate-laws": {
    title: "Corporate Laws",
    heroHeading: "Corporate Secretarial and MCA Compliances",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "The Companies Act imposes rigorous compliance and reporting requirements on corporate entities. Staying compliant is essential to avoid penalties, director disqualifications, and striking off of the company.",
      "Shantanu & Associates provides end-to-end corporate secretarial support, acting as your outsourced compliance department to ensure your corporate governance is impeccable."
    ],
    subServicesHeading: "Our Corporate Law Services:",
    subServices: [
      "Filing of Annual Returns (AOC-4, MGT-7).",
      "Maintenance of statutory registers and minute books.",
      "Director appointment, resignation, and KYC (DIR-3).",
      "Increase in Authorized Share Capital and allotment of shares.",
      "Assistance with holding AGMs and Board Meetings.",
      "Filing of various event-based MCA forms."
    ]
  },
  "annual-roc-filings": {
    title: "Annual ROC Filings",
    heroHeading: "Registrar of Companies (ROC) Annual Compliances",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Every registered company and LLP must file annual returns and financial statements with the ROC, regardless of their operational status or turnover.",
      "Shantanu & Associates manages the entire annual filing cycle efficiently, ensuring strict adherence to the timelines prescribed by the Ministry of Corporate Affairs."
    ],
    subServicesHeading: "Our ROC Filing Services:",
    subServices: [
      "Preparation and filing of Form AOC-4 (Financial Statements).",
      "Preparation and filing of Form MGT-7/MGT-7A (Annual Return).",
      "LLP Annual return filing (Form 8 and Form 11).",
      "Filing of Auditor Appointment forms (ADT-1).",
      "Drafting of the Directors' Report and MGT-9.",
      "Certification of MCA forms by professionals."
    ]
  },
  "board-meeting-compliance": {
    title: "Board Meeting Compliance",
    heroHeading: "Drafting of Minutes and Board Resolutions",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "The Companies Act dictates strict rules regarding the frequency, quorum, and documentation of Board of Directors meetings and General Meetings.",
      "Shantanu & Associates assists corporate secretariats in drafting flawless notices, agendas, and minutes in compliance with the Secretarial Standards (SS-1 and SS-2)."
    ],
    subServicesHeading: "Our Meeting Compliance Services:",
    subServices: [
      "Drafting agendas and notices for Board Meetings and AGMs.",
      "Preparation of precise minutes of the meetings.",
      "Maintenance of physical and digital minute books.",
      "Drafting of standard and special resolutions.",
      "Advisory on quorum and virtual meeting guidelines.",
      "Filing of Special Resolutions (MGT-14) with the ROC."
    ]
  },
  "director-kyc": {
    title: "Director KYC",
    heroHeading: "Director KYC & Statutory Appointments",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "The Ministry of Corporate Affairs mandates annual KYC updates for all directors holding a DIN to maintain transparency and prevent corporate fraud.",
      "At Shantanu & Associates, we ensure timely filing of DIR-3 KYC for directors, avoiding the deactivation of DIN and the associated high penalty fees."
    ],
    subServicesHeading: "Our Director Compliance Services:",
    subServices: [
      "Filing of Web-based DIR-3 KYC.",
      "Filing of detailed e-Form DIR-3 KYC for updates.",
      "Procurement and renewal of Digital Signatures (DSC).",
      "Advisory on appointment and resignation of Directors (DIR-12).",
      "Obtaining DIN for new directors.",
      "Reactivation of disqualified or deactivated DINs."
    ]
  },
  "corporate-governance": {
    title: "Corporate Governance",
    heroHeading: "Corporate Governance and Secretarial Audits",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Strong corporate governance builds investor confidence, mitigates risk, and establishes a framework for sustainable growth and ethical management.",
      "Shantanu & Associates provides governance advisory and conducts Secretarial Audits to ensure compliance with the Companies Act, SEBI regulations, and other specific laws."
    ],
    subServicesHeading: "Our Governance Services include:",
    subServices: [
      "Conducting comprehensive Secretarial Audits (MR-3).",
      "Structuring of Board Committees (Audit, CSR, Nomination).",
      "Drafting governance policies (Whistleblower, CSR).",
      "Advisory on Related Party Transactions.",
      "Evaluation of Board performance and independence.",
      "Pre-IPO governance readiness advisory."
    ]
  },
  "consultancy": {
    title: "Consultancy",
    heroHeading: "Strategic Financial & Business Advisory",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "In a hyper-competitive business environment, achieving sustainable growth requires data-driven strategy, optimal capital allocation, and rigorous risk management.",
      "Shantanu & Associates partners with management teams to provide strategic insights, transforming complex business challenges into avenues for value creation and scaling."
    ],
    subServicesHeading: "Our Consultancy Verticals:",
    subServices: [
      "Comprehensive Business and Financial Advisory.",
      "Mergers & Acquisitions (M&A) structuring.",
      "Financial and Tax Due Diligence.",
      "Business and Equity Valuation.",
      "Virtual CFO services.",
      "Project finance and pitch deck preparation."
    ]
  },
  "business-advisory": {
    title: "Business Advisory",
    heroHeading: "Business Strategy and Virtual CFO Services",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Growing enterprises often need the financial acumen of a Chief Financial Officer without the overhead of a full-time executive hire.",
      "Through our Virtual CFO and Business Advisory services, Shantanu & Associates provides high-level financial strategy, cash flow management, and MIS reporting to drive your business forward."
    ],
    subServicesHeading: "Our Business Advisory Services:",
    subServices: [
      "Implementation of robust MIS (Management Information Systems).",
      "Cash flow forecasting and working capital management.",
      "Budgeting and variance analysis.",
      "Cost optimization and profitability analysis.",
      "ERP implementation and process automation advisory.",
      "Guidance on capital structuring and fundraising."
    ]
  },
  "ma-advisory": {
    title: "M&A Advisory",
    heroHeading: "Mergers, Acquisitions and Restructuring",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Mergers and Acquisitions present massive growth opportunities but carry significant execution, legal, and tax risks if not structured correctly.",
      "Shantanu & Associates offers end-to-end M&A advisory, from identifying synergies to drafting the scheme of arrangement, ensuring a tax-efficient and legally sound transaction."
    ],
    subServicesHeading: "Our M&A Services include:",
    subServices: [
      "Buy-side and sell-side advisory.",
      "Tax optimization of the transaction structure.",
      "Drafting and reviewing term sheets and definitive agreements.",
      "Advisory on slump sales and demergers.",
      "Post-merger integration and compliance.",
      "Liaison with NCLT and regulatory bodies."
    ]
  },
  "due-diligence": {
    title: "Due Diligence",
    heroHeading: "Financial and Tax Due Diligence",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Before finalizing any investment, acquisition, or joint venture, thorough due diligence is vital to uncover hidden liabilities and validate financial representations.",
      "Our specialized due diligence teams dig deep into the target's financial health, tax compliance, and legal standing, providing investors with a clear, unbiased picture of the risks involved."
    ],
    subServicesHeading: "Our Due Diligence Offerings:",
    subServices: [
      "Comprehensive Financial Due Diligence.",
      "Thorough Direct and Indirect Tax Due Diligence.",
      "Identification of contingent liabilities and deal-breakers.",
      "Analysis of quality of earnings and working capital.",
      "Review of statutory compliance health.",
      "Preparation of detailed diligence reports for investors."
    ]
  },
  "valuation-services": {
    title: "Valuation Services",
    heroHeading: "Business, Equity and Intangible Valuation",
    image: "/images/corporate_registration.jpg",
    introduction: [
      "Accurate valuation is critical for regulatory compliance, fundraising, financial reporting, and dispute resolution. It requires a blend of technical finance skills and industry insight.",
      "Shantanu & Associates provides defensible, technically robust valuation reports by Registered Valuers, accepted by regulators, auditors, and tax authorities alike."
    ],
    subServicesHeading: "Our Valuation Services:",
    subServices: [
      "Equity valuation for startup fundraising and angel investments.",
      "Regulatory valuations under Income Tax (Rule 11UA) and FEMA.",
      "Valuation of Intangible Assets (Trademarks, Goodwill).",
      "Purchase Price Allocation (PPA) for financial reporting.",
      "ESOP valuation and structuring.",
      "Business valuation for M&A and restructuring."
    ]
  },
  "strategic-planning": {
    title: "Strategic Planning",
    heroHeading: "Project Reports and Financial Modeling",
    image: "/images/audit_advisory.jpg",
    introduction: [
      "Securing bank loans, government grants, or PE funding requires a compelling narrative backed by mathematically sound financial projections.",
      "At Shantanu & Associates, we craft detailed project reports and dynamic financial models that demonstrate the viability of your vision to lenders and investors."
    ],
    subServicesHeading: "Our Strategic Planning Services:",
    subServices: [
      "Preparation of Detailed Project Reports (DPR) for bank loans.",
      "Creation of dynamic, scenario-based financial models.",
      "Preparation of pitch decks for venture capital funding.",
      "Feasibility studies for new projects and expansions.",
      "Advisory on government subsidies and incentive schemes.",
      "CMA data preparation for working capital limits."
    ]
  },
  "business-registration": {
    title: "Business Registration",
    heroHeading: "End-to-End Business Registration Services",
    image: "/images/finance_taxation.jpg",
    introduction: [
      "Starting a business in India requires navigating a maze of registrations spanning tax, labor, and municipal laws. Missing a critical registration can stall your operations.",
      "Shantanu & Associates acts as a single-window solution for entrepreneurs, handling all foundational registrations so you can commence operations rapidly and legally."
    ],
    subServicesHeading: "Our Business Setup Services include:",
    subServices: [
      "Entity structuring and incorporation.",
      "Obtaining PAN, TAN, and GST Registration.",
      "Applying for MSME Udyam and Shop Act registrations.",
      "Securing PF, ESIC, and Professional Tax registrations.",
      "Import Export Code (IEC) application.",
      "Food license (FSSAI) and specific regulatory permits."
    ]
  }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#032b4e] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="text-sm text-slate-300 mb-4 flex items-center space-x-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-emerald-400 font-medium">{service.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            {service.heroHeading}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left side text */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Overview</h2>
              <div className="space-y-6 text-lg text-slate-600">
                {service.introduction.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">{service.subServicesHeading}</h3>
                <ul className="space-y-4">
                  {service.subServices.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mr-4 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-600 text-lg leading-tight pt-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side image */}
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-xl relative aspect-video w-full">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              
              {/* CTA Box */}
              <div className="mt-8 bg-[#032b4e] rounded-2xl p-8 text-center text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Looking for {service.title} in Bangalore?</h3>
                <p className="text-slate-300 mb-8">
                  Get in touch with Shantanu & Associates today for expert, timely, and professional assistance.
                </p>
                <Link href="/#contact">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg h-14 rounded-xl transition-all">
                    Contact Us Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simple) */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} Shantanu & Associates. All Rights Reserved.</p>
      </footer>
    </main>
  );
}


