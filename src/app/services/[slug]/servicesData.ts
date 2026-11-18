export type ServiceData = {
  title: string;
  heroHeading: string;
  image: string;
  introduction: string[];
  eligibility?: string[];
  documentsRequired?: string[];
  process?: string[];
  subServicesHeading: string;
  subServices: string[];
};

export const SERVICES: Record<string, ServiceData> = {
  // ==========================================
  // 1. AUDIT & ASSURANCE
  // ==========================================
  "audit-and-assurance": {
    title: "Audit & Assurance",
    heroHeading: "Independent Audit & Assurance Services in Bangalore",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "In an increasingly demanding regulatory environment, independent audit and assurance services are essential for safeguarding corporate governance, enhancing stakeholder confidence, and ensuring the absolute accuracy of financial statements.",
      "At Shantanu S & Associates, our audit practice adheres strictly to the Standards on Auditing (SAs) issued by the Institute of Chartered Accountants of India (ICAI). We combine meticulous verification procedures with deep industry insight to deliver objective, robust, and transparent audit opinions.",
      "Whether your enterprise requires statutory certification under the Companies Act, risk-based internal control assessments, or specialized investigative assurance, our senior audit partners deliver hands-on, high-integrity advisory."
    ],
    subServicesHeading: "Our Comprehensive Audit & Assurance Offerings:",
    subServices: [
      "Statutory Audits under the Companies Act, 2013 and applicable Accounting Standards (Ind AS / AS).",
      "Internal Audit & Enterprise Risk Reviews focused on process optimization and internal financial controls (IFC).",
      "Tax Audits under Section 44AB of the Income Tax Act with Form 3CA/3CB and 3CD compliance.",
      "Special Purpose Audit & Assurance engagements for lenders, investors, and regulatory authorities.",
      "Concurrent, statutory branch, and stock audits for scheduled commercial banks and financial institutions.",
      "Management audits, certifications, and compliance health-checks."
    ]
  },
  "statutory-audit": {
    title: "Statutory Audit",
    heroHeading: "Statutory Audit under the Companies Act, 2013",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "A Statutory Audit is a mandatory legal examination of an enterprise's financial records and accounts to provide an independent opinion on whether the financial statements present a 'true and fair view' of the entity's financial position and operational performance.",
      "Our statutory auditing protocols are grounded in the Standards on Auditing (SAs) and quality control frameworks prescribed by the ICAI. We perform rigorous testing of accounting transactions, trial balance reconciliations, and disclosures mandated by Schedule III of the Companies Act.",
      "We actively evaluate the design and operating effectiveness of Internal Financial Controls over Financial Reporting (IFCoFR) and deliver complete reporting under the Companies (Auditor's Report) Order (CARO)."
    ],
    subServicesHeading: "Key Statutory Audit Scope & Deliverables:",
    subServices: [
      "Independent Auditor's Report on standalone and consolidated financial statements.",
      "Detailed CARO reporting covering fixed assets, inventory, statutory dues, and loans.",
      "Testing and certification of Internal Financial Controls over Financial Reporting (IFCoFR).",
      "Verification of compliance with Ind AS / Indian GAAP and statutory accounting conventions.",
      "Identification of control deficiencies and presentation of actionable Management Letters.",
      "Board of Directors and Audit Committee executive briefings."
    ]
  },
  "internal-audit-risk-review": {
    title: "Internal Audit & Risk Review",
    heroHeading: "Internal Audit, Process Reviews & Risk Assurance",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "Internal Audit serves as an indispensable governance pillar, providing management and the board with objective assurance that operational workflows are efficient, assets are protected, and statutory obligations are met without deviation.",
      "Shantanu S & Associates designs tailored, risk-based internal audit frameworks. Rather than merely verifying historical vouchers, we evaluate end-to-end business cycles (Procure-to-Pay, Order-to-Cash, Hire-to-Retire, and Treasury) to uncover operational inefficiencies, revenue leakages, and control gaps.",
      "Our actionable recommendations empower promoters, CXOs, and audit committees to streamline standard operating procedures (SOPs), mitigate compliance risks, and establish sustainable operational excellence."
    ],
    subServicesHeading: "Core Internal Audit & Risk Advisory Services:",
    subServices: [
      "Comprehensive Risk Assessment and multi-year internal audit charter development.",
      "Testing of operational processes against established Standard Operating Procedures (SOPs).",
      "Procurement, inventory physical verification, and supply chain control audits.",
      "Revenue leakage identification, customer credit review, and billing cycle audits.",
      "Evaluation and testing of Internal Financial Controls (IFC) under Section 134(5)(e).",
      "Quarterly reporting and presentation to the Audit Committee and Board."
    ]
  },
  "tax-audit": {
    title: "Tax Audit",
    heroHeading: "Income Tax Audit under Section 44AB",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "Under Section 44AB of the Income Tax Act, 1961, businesses and professionals exceeding statutory turnover thresholds are legally mandated to have their accounts audited by an independent Chartered Accountant.",
      "The primary purpose of a Tax Audit is to verify the accuracy of books of account, validate deduction claims, verify statutory payment timelines (such as Section 43B and 43B(h)), and report prescribed financial particulars in Forms 3CA/3CB and Form 3CD.",
      "Shantanu S & Associates executes thorough, detail-oriented tax audits that protect enterprises from disallowances, penalties, and scrutiny adjustments, ensuring flawless digital tax filing on the Income Tax Portal."
    ],
    subServicesHeading: "Our Tax Audit Methodology & Reporting:",
    subServices: [
      "Preparation and electronic certification of Form 3CA / 3CB and detailed Form 3CD.",
      "Verification of expense disallowances under Section 40(a)(ia), 40A(2), and Section 43B.",
      "Strict scrutiny of MSME vendor payment timelines under Section 43B(h).",
      "Reconciliation of turnover, taxes, and income with Form 26AS, AIS, TIS, and GST returns.",
      "Verification of quantitative inventory details, depreciation schedules, and tax incentives.",
      "Timely filing on the e-filing portal before statutory cut-off dates."
    ]
  },
  "special-purpose-audit": {
    title: "Special Purpose Audit & Assurance",
    heroHeading: "Special Purpose Audits, Certifications & Investigatory Assurance",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "Special Purpose Audits are targeted, customized assurance engagements conducted to meet specific information needs of management, lenders, institutional investors, regulatory bodies, or court orders.",
      "These engagements focus on specific financial statements, ring-fenced operational areas, compliance covenants, or transaction validations. Examples include working capital certifications for bank loan consortiums, grant utilization verification, and stock & book debt audits.",
      "Our senior team delivers rigorous, defensible, and credible reports adhering to ICAI guidance notes on special reports and certificates."
    ],
    subServicesHeading: "Special Purpose Assurance Engagements:",
    subServices: [
      "Bank Borrowing Base, Stock, and Book Debt Audits for working capital limits.",
      "Grant and Subsidy Utilization Audits for government or multilateral programs.",
      "Certification of financial ratios and net worth under statutory or tender requirements.",
      "Pre-investment financial health-checks and limited review engagements.",
      "Investigation of specific accounts or disputed ledger reconciliations.",
      "Certification for foreign remittance, royalty payments, and repatriation under Form 15CB."
    ]
  },

  // ==========================================
  // 2. ACCOUNTING & FINANCIAL SERVICES
  // ==========================================
  "accounting-financial-services": {
    title: "Accounting & Financial Services",
    heroHeading: "Full-Stack Accounting & Financial Reporting Services",
    image: "/images/img_c1d747b9ff.jpg",
    introduction: [
      "Accurate and timely accounting is the backbone of sound financial management and statutory compliance. Modern businesses require more than routine data entry—they need structured ledgers, real-time reporting, and rigorous ledger control.",
      "Shantanu S & Associates provides complete outsourced accounting, bookkeeping, and virtual controller services. We assist startups, SMEs, and mid-market corporations in establishing robust chart-of-accounts, automated reconciliation systems, and timely financial statements.",
      "Whether your enterprise needs regular day-to-day bookkeeping, monthly MIS dashboards, or historical reconstruction of disrupted accounts, our accounting specialists ensure total peace of mind."
    ],
    subServicesHeading: "Our Accounting & Financial Capabilities:",
    subServices: [
      "Comprehensive cloud accounting and bookkeeping (Tally Prime, Zoho Books, QuickBooks, SAP).",
      "Preparation of General Ledgers, Bank Reconciliations, and Accounts Payable/Receivable aging.",
      "Monthly and quarterly financial statements conforming to Indian Accounting Standards (AS / Ind AS).",
      "Executive MIS reports, cash flow forecasts, and budget variance analytics.",
      "Reconstruction, cleanup, and restructuring of incomplete or legacy books of account.",
      "Year-end balance sheet preparation, asset registers, and audit file readiness."
    ]
  },
  "accounting-and-bookkeeping": {
    title: "Accounting & Bookkeeping",
    heroHeading: "Professional Accounting & Bookkeeping Services",
    image: "/images/img_c1d747b9ff.jpg",
    introduction: [
      "Maintaining error-free day-to-day accounts is essential for tax compliance, investor reporting, and effective business decision-making. Incomplete books frequently lead to GST mismatches, delayed audits, and penalties.",
      "Our team provides end-to-end bookkeeping support: from recording sales invoices and vendor bills to managing payroll entries, tracking depreciable assets, and conducting periodic bank reconciliations.",
      "We operate seamlessly across leading accounting platforms including Tally Prime, Zoho Books, QuickBooks, and enterprise ERPs, guaranteeing that your numbers reflect real-time business reality."
    ],
    subServicesHeading: "Accounting & Bookkeeping Deliverables:",
    subServices: [
      "Transaction entry, purchase invoice processing, and sales ledger accounting.",
      "Bank, credit card, and payment gateway multi-currency reconciliations.",
      "Accounts Payable (AP) and Accounts Receivable (AR) management with aging analysis.",
      "Fixed asset capitalization, depreciation tracking, and inventory ledger maintenance.",
      "Preparation of monthly Trial Balance, Profit & Loss Account, and Balance Sheet.",
      "Seamless integration with statutory GST, TDS, and payroll deductions."
    ]
  },
  "financial-reporting": {
    title: "Financial Reporting",
    heroHeading: "Financial Reporting & MIS Advisory Services",
    image: "/images/img_c1d747b9ff.jpg",
    introduction: [
      "Leadership teams, boards, and capital providers depend on transparent, insightful, and timely financial reporting. Generic trial balances do not provide the strategic clarity needed to steer growth.",
      "We structure customized Financial Reporting and Management Information Systems (MIS). We prepare GAAP / Ind AS compliant statements, EBITDA reconciliations, working capital analytics, and unit-economics dashboards.",
      "Our reports translate raw accounting entries into clear strategic insights, enabling founders and executives to optimize cash flows, forecast capital requirements, and satisfy investor covenants."
    ],
    subServicesHeading: "Financial Reporting Solutions:",
    subServices: [
      "Preparation of Annual Financial Statements as per Schedule III of the Companies Act.",
      "Monthly and quarterly Management Information System (MIS) executive decks.",
      "Cash flow modeling, burn rate calculations, and runway forecasting for startups.",
      "Segment-wise and project-wise profitability and margin variance analysis.",
      "Transition and reporting advisory under Indian Accounting Standards (Ind AS).",
      "Preparation of investor reporting packs and audit committee presentations."
    ]
  },
  "reconstruction-restructuring-accounts": {
    title: "Reconstruction & Restructuring of Accounts",
    heroHeading: "Reconstruction, Cleanup & Restructuring of Disrupted Accounts",
    image: "/images/img_c1d747b9ff.jpg",
    introduction: [
      "Due to rapid scaling, turnover of internal accounting staff, system migrations, or past neglect, businesses sometimes find their books in severe disarray—marked by unreconciled balances, missing invoices, and mismatched statutory figures.",
      "Shantanu S & Associates specializes in forensic reconstruction and backlog accounting cleanup. We systematically trace bank statements, vendor confirmations, tax filings, and physical documents to rebuild reliable, audit-ready financial statements from the ground up.",
      "Our restructuring service restores financial transparency, clears pending tax assessments, resolves statutory notices, and gives stakeholders accurate historical numbers."
    ],
    subServicesHeading: "Account Reconstruction & Cleanup Scope:",
    subServices: [
      "Multi-year backlog data entry and ledger reconciliation from primary bank statements.",
      "Reconciliation of distorted vendor and debtor balances with external balance confirmations.",
      "Alignment of historical books with filed GST returns (GSTR-1/3B) and ITR disclosures.",
      "Resolution of suspense accounts, unreconciled clearing accounts, and duplicate entries.",
      "Rebuilding of Fixed Asset Registers (FAR) and inventory valuation trail.",
      "Preparation of audit-ready restated balance sheets for tax authorities or investors."
    ]
  },

  // ==========================================
  // 3. DIRECT TAXATION
  // ==========================================
  "direct-taxation": {
    title: "Direct Taxation",
    heroHeading: "Corporate & Individual Direct Taxation Services in Bangalore",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "India's direct taxation framework is sophisticated and constantly evolving, marked by frequent legislative amendments, digitized faceless assessments, and strict penalty provisions.",
      "At Shantanu S & Associates, our direct tax practice covers the full spectrum of compliance, planning, and litigation. We assist private limited companies, LLPs, partnerships, high-net-worth individuals, and non-residents.",
      "We emphasize proactive tax architecture: legally optimizing your effective tax rate, managing advance tax flows, safeguarding deductions, and providing fearless representation before appellate authorities."
    ],
    subServicesHeading: "Our Direct Tax Services Suite:",
    subServices: [
      "Annual Income Tax Return (ITR) preparation and e-filing for corporates and individuals.",
      "Strategic Tax Planning, corporate restructuring advisory, and profit repatriation models.",
      "Income Tax Scrutiny, faceless assessment handling, and appellate litigation representation.",
      "Advance Tax computation, quarterly forecasting, and interest minimization (Sec 234B/234C).",
      "Withholding Tax (TDS/TCS) compliance, return filing, and Lower Deduction Certificates (Sec 197).",
      "Capital Gains tax advisory, Section 54/54EC exemptions, and real estate tax planning."
    ]
  },
  "income-tax-compliance-return-filing": {
    title: "Income Tax Compliance & Return Filing",
    heroHeading: "Income Tax Compliance & Accurate ITR Filing",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "Filing income tax returns accurately and within prescribed statutory dates is mandatory for all corporate entities, LLPs, and taxable individuals. With the Income Tax Department's AI-driven AIS (Annual Information Statement) and TIS tracking, discrepancies trigger automated notices.",
      "We manage end-to-end income tax compliance: mapping all revenue streams, cross-verifying Form 26AS/AIS, computing accurate depreciation, claiming eligible deductions, and ensuring error-free filing of ITR-1 through ITR-7.",
      "Our team guarantees complete accuracy, zero omission risk, and total statutory compliance under the Income Tax Act."
    ],
    subServicesHeading: "Income Tax Return Filing Offerings:",
    subServices: [
      "ITR filing for Private Limited Companies, Public Companies, and Section 8 NGOs (ITR-6/7).",
      "ITR filing for LLPs, Partnership Firms, and Joint Ventures (ITR-5).",
      "ITR filing for Directors, Partners, Professionals, and HNIs (ITR-2, ITR-3, ITR-4).",
      "Detailed reconciliation with AIS, TIS, Form 26AS, and GST turnover data.",
      "Filing of revised returns, rectified applications under Section 154, and condonation petitions.",
      "TDS / TCS quarterly compliance (Forms 24Q, 26Q, 27Q) and Form 16/16A generation."
    ]
  },
  "tax-planning-advisory": {
    title: "Tax Planning & Advisory",
    heroHeading: "Strategic Tax Planning & Corporate Advisory",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "Effective tax planning is not about tax evasion; it is about legally and intelligently structuring your commercial affairs to leverage incentives, minimize liabilities, and maximize retained earnings.",
      "We partner with corporate leadership, founders, and families to formulate forward-looking direct tax strategies. We advise on optimal corporate entity structures, director remuneration, inter-company transactions, capital expenditure write-offs, and capital gains exemptions.",
      "Our advisory ensures that your business stays compliant while paying only what is legitimately due under law."
    ],
    subServicesHeading: "Tax Planning & Optimization Scope:",
    subServices: [
      "Corporate tax planning for optimizing effective tax rates under Section 115BAA/115BAB.",
      "Director compensation structuring, salary benchmarking, and dividend distribution planning.",
      "Capital Gains tax mitigation on sale of commercial property, shares, and equity holdings.",
      "Advisory on tax-efficient holding structures, promoter equity vesting, and ESOP schemes.",
      "Advance tax computation and quarterly scheduling to eliminate interest penalties.",
      "Advisory on Startup tax exemptions under Section 80-IAC and Angel Tax provisions."
    ]
  },
  "income-tax-litigation-appeals": {
    title: "Income Tax Litigation & Appeals",
    heroHeading: "Income Tax Notice Representation, Assessments & Appeals",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "Receiving a scrutiny notice or adverse assessment order from the Income Tax Department can pose significant operational and financial risks if not addressed with deep procedural knowledge and legal precision.",
      "Shantanu S & Associates represents clients across all levels of tax disputes. We specialize in drafting comprehensive, evidence-backed submissions for faceless scrutiny assessments, penalty proceedings, and reopening notices under Section 148.",
      "When disputes require appellate redressal, we prepare grounds of appeal and Statement of Facts, representing clients forcefully before the Commissioner of Income Tax (Appeals) [CIT(A)] and the Income Tax Appellate Tribunal (ITAT)."
    ],
    subServicesHeading: "Tax Litigation & Appellate Services:",
    subServices: [
      "Drafting legal replies for notices under Section 142(1), 143(2), 148, and 148A.",
      "Faceless assessment handling, video-conferencing representation, and factual documentation.",
      "Drafting and filing Appeals before CIT(Appeals) and the National Faceless Appeal Centre (NFAC).",
      "Formulation of legal briefs and representation before the Income Tax Appellate Tribunal (ITAT).",
      "Stay of demand petitions, penalty waiver applications, and prosecution mitigation.",
      "Handling settlement proceedings and disputes under statutory resolution frameworks."
    ]
  },

  // ==========================================
  // 4. GOODS & SERVICES TAX (GST)
  // ==========================================
  "goods-and-services-tax": {
    title: "Goods & Services Tax (GST)",
    heroHeading: "End-to-End Goods & Services Tax (GST) Advisory & Compliance",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "India's Goods and Services Tax (GST) regime is one of the most dynamic indirect tax frameworks in the world, characterized by continuous circulars, real-time e-invoicing, automated return reconciliations, and stringent scrutiny.",
      "Shantanu S & Associates delivers full-spectrum GST solutions. We assist emerging startups, trading houses, manufacturing entities, and service conglomerates in maintaining frictionless, audit-proof GST compliance.",
      "From monthly GSTR-1 and GSTR-3B filings to dynamic GSTR-2B input tax credit optimization, refund processing for exporters, and representing clients against departmental summons, our indirect tax desk provides complete legal protection."
    ],
    subServicesHeading: "Our GST Advisory & Compliance Capabilities:",
    subServices: [
      "Monthly and quarterly GST return filing (GSTR-1, GSTR-3B, GSTR-4, CMP-08).",
      "Dynamic Input Tax Credit (ITC) matching and reconciliation with auto-populated GSTR-2B.",
      "GST statutory audits, annual reconciliation returns (GSTR-9), and self-certified GSTR-9C.",
      "Strategic GST Advisory on classification, HSN/SAC codes, tax rates, and reverse charge (RCM).",
      "Export refund processing (LUT vs payment of IGST) and accumulated inverted duty structure refunds.",
      "Drafting legal replies for GST show-cause notices (DRC-01) and representing before appellate authorities."
    ]
  },
  "gst-compliance-return-filing": {
    title: "GST Compliance & Return Filing",
    heroHeading: "Timely GST Return Filing & Automated Reconciliation",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "GST compliance requires meticulous monthly discipline. Late filing or inaccurate disclosures result in non-waivable interest, automated portal lockouts, blocking of E-Way bills, and loss of vendor trust.",
      "We handle the complete monthly GST compliance lifecycle for your entity. We reconcile sales ledgers with e-invoicing portals, ensure timely filing of outward supplies (GSTR-1), match purchases against GSTR-2B to maximize legal tax credits, and file summary returns (GSTR-3B) with accurate tax offsets.",
      "Our structured reconciliation mechanisms prevent tax leakage and ensure zero penalty exposure."
    ],
    subServicesHeading: "GST Return Filing Services:",
    subServices: [
      "Monthly / quarterly filing of Form GSTR-1 (Outward Supplies) and GSTR-3B.",
      "Automated reconciliation of Purchase Registers with GSTR-2B to prevent invalid ITC claims.",
      "Filing of Annual Return Form GSTR-9 and reconciliation statement GSTR-9C.",
      "Generation and management of E-Invoicing and E-Way Bills for inter-state cargo movement.",
      "Filing of Quarterly QRMP returns and monthly PMT-06 challans for eligible small taxpayers.",
      "LUT (Letter of Undertaking) application and renewals for zero-rated export supplies."
    ]
  },
  "gst-advisory": {
    title: "GST Advisory",
    heroHeading: "Strategic GST Advisory & Transaction Structuring",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "Complex business transactions—such as cross-border software exports, supply chain contracts, joint development agreements, and multi-state branch transfers—carry significant GST implications.",
      "Our GST Advisory desk evaluates contract structures to ensure exact classification under HSN and SAC codes, verify the applicability of exemptions, determine Place of Supply rules, and mitigate reverse charge liabilities under Section 9(3) and 9(4).",
      "We provide written legal opinions that protect enterprises against sudden retrospective demands from tax authorities."
    ],
    subServicesHeading: "GST Advisory & Structuring Offerings:",
    subServices: [
      "Determining Place of Supply, Time of Supply, and Valuation under GST Rules.",
      "Advisory on cross-border supply of services, OIDAR rules, and export eligibility.",
      "Classification of goods and services with corresponding HSN/SAC and notification analysis.",
      "Review of vendor contracts and corporate restructuring from a GST optimization angle.",
      "Advisory on Input Tax Credit eligibility, blocked credits (Sec 17(5)), and apportionment.",
      "Filing for Advance Rulings before the Authority for Advance Rulings (AAR)."
    ]
  },
  "gst-litigation-appeals": {
    title: "GST Litigation & Appeals",
    heroHeading: "GST Notice Handling, Scrutiny & Appellate Representation",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "The GST Department actively issues automated and manual notices regarding ITC mismatches between GSTR-3B and GSTR-2B/2A, differences between GSTR-1 and GSTR-3B, turnover discrepancies, and classification disputes under Form DRC-01.",
      "Shantanu S & Associates provides forceful, expert representation in GST disputes. We analyze the root cause of every demand, gather vendor proof, construct detailed legal defenses citing High Court and Tribunal precedents, and submit formal replies.",
      "If an adverse order is passed by an adjudicating officer, we draft and argue First Appeals before the Joint Commissioner / Commissioner (Appeals) and represent before the GST Appellate Tribunal (GSTAT)."
    ],
    subServicesHeading: "GST Litigation & Dispute Resolution:",
    subServices: [
      "Drafting legal replies for notices under ASMT-10, DRC-01A, and Form DRC-01.",
      "Defense representation for ITC mismatch disputes and fake invoice allegations.",
      "Representation before GST Anti-Evasion, DGGI, and Audit wings during departmental audits.",
      "Drafting, filing, and arguing Appeals before the Appellate Authority under Section 107.",
      "Handling cancellation and revocation of suspended GSTIN registrations (Form REG-21).",
      "Filing Writ Petitions before the High Court in cases of procedural violation."
    ]
  },

  // ==========================================
  // 5. AML & KYC SERVICES
  // ==========================================
  "aml-kyc-services": {
    title: "AML & KYC Services",
    heroHeading: "Anti-Money Laundering (AML) & KYC Compliance Advisory",
    image: "/images/img_30da68060b.jpg",
    introduction: [
      "With intensifying global regulatory standards and strict enforcement of the Prevention of Money Laundering Act (PMLA) and RBI Master Directions, institutions face rigorous legal mandates to verify customers and monitor transactions.",
      "Shantanu S & Associates provides comprehensive AML and KYC compliance solutions. We assist banks, NBFCs, fintech platforms, payment intermediaries, virtual asset service providers, and corporate enterprises in building bulletproof customer onboarding and risk-profiling frameworks.",
      "Our advisory ensures that your organization stays protected against money laundering exposure, regulatory sanctions, and severe reputational fallout."
    ],
    subServicesHeading: "Our AML & KYC Advisory Capabilities:",
    subServices: [
      "Design and implementation of Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) protocols.",
      "Comprehensive AML Compliance and institutional risk assessments conforming to PMLA and FATF standards.",
      "Transaction Monitoring framework design, threshold calibration, and Red Flag alert mechanisms.",
      "Sanctions screening, Politically Exposed Persons (PEP) checks, and adverse media investigations.",
      "Drafting robust AML/CFT Board Policies, Standard Operating Procedures (SOPs), and training manuals.",
      "Independent AML audits and regulatory compliance health-checks for financial intermediaries."
    ]
  },
  "kyc-customer-due-diligence": {
    title: "KYC & Customer Due Diligence",
    heroHeading: "KYC Frameworks & Customer Due Diligence (CDD / EDD)",
    image: "/images/img_30da68060b.jpg",
    introduction: [
      "Customer Due Diligence (CDD) is the primary line of defense against illicit financial activities. Inadequate customer verification exposes institutions to massive regulatory penalties and criminal prosecution under PMLA.",
      "We design comprehensive KYC workflows incorporating digital verification, Ultimate Beneficial Ownership (UBO) identification, and risk categorization (Low, Medium, High).",
      "For complex corporate entities, offshore structures, and high-net-worth clients, we establish Enhanced Due Diligence (EDD) processes that verify source of wealth, legitimate business purpose, and beneficial control."
    ],
    subServicesHeading: "Customer Due Diligence Scope:",
    subServices: [
      "Implementation of digital KYC, Video KYC (V-CIP), and multi-layer document authentication.",
      "Identification and verification of Ultimate Beneficial Owners (UBO) under 10%/25% thresholds.",
      "Enhanced Due Diligence (EDD) for high-risk customers, trusts, and complex corporate vehicles.",
      "Customer risk scoring models and periodic KYC review schedules.",
      "Compliance with RBI KYC Master Directions and Central KYC Records Registry (CKYCR).",
      "Remediation of legacy customer records and backlog KYC cleanup."
    ]
  },
  "aml-compliance-risk-assessment": {
    title: "AML Compliance & Risk Assessment",
    heroHeading: "Institutional AML Compliance & Risk Assessment",
    image: "/images/img_30da68060b.jpg",
    introduction: [
      "Every reporting entity under the PMLA must conduct periodic Enterprise-Wide Risk Assessments (EWRA) to evaluate its vulnerability to money laundering and terrorist financing.",
      "Our risk specialists conduct thorough assessments of your products, delivery channels, customer segments, and geographic locations. We evaluate control effectiveness and compute residual risk profiles.",
      "We establish robust internal compliance architectures, ensuring total alignment with Financial Intelligence Unit - India (FIU-IND) requirements."
    ],
    subServicesHeading: "AML Risk Assessment Deliverables:",
    subServices: [
      "Enterprise-Wide Risk Assessment (EWRA) methodologies and risk rating matrices.",
      "Gap analysis of existing internal controls against PMLA and regulatory mandates.",
      "Evaluation of reporting mechanisms for Cash Transaction Reports (CTR) and Suspicious Transaction Reports (STR).",
      "Independent testing and validation of automated AML software and rules engines.",
      "Advisory on Principal Officer and Designated Director obligations.",
      "Preparation of comprehensive AML audit reports for board and regulator submission."
    ]
  },
  "transaction-monitoring-review": {
    title: "Transaction Monitoring & Review",
    heroHeading: "AML Transaction Monitoring & Suspicious Activity Review",
    image: "/images/img_30da68060b.jpg",
    introduction: [
      "Effective transaction monitoring is crucial for detecting suspicious behavioral shifts, structuring of transactions (smurfing), and anomalous capital movements in real time.",
      "We assist institutions in designing, reviewing, and calibrating rule-based and behavioral transaction monitoring scenarios. Our team conducts deep-dive manual reviews of high-risk transaction alerts.",
      "We assist compliance officers in investigating red flags and compiling defensible Suspicious Transaction Reports (STRs) for timely submission to FIU-IND."
    ],
    subServicesHeading: "Transaction Monitoring Capabilities:",
    subServices: [
      "Calibration of transaction monitoring threshold limits to minimize false positive alerts.",
      "Post-alert review, investigative documentation, and case file compilation.",
      "Identification of complex structuring, round-tripping, and velocity anomalies.",
      "Preparation of comprehensive Grounds of Suspicion for STR filings.",
      "Historical look-back reviews on suspected accounts and transaction batches.",
      "Audit of automated alert management queues and escalation workflows."
    ]
  },
  "sanctions-pep-screening": {
    title: "Sanctions & PEP Screening",
    heroHeading: "Global Sanctions & Politically Exposed Persons (PEP) Screening",
    image: "/images/img_30da68060b.jpg",
    introduction: [
      "Onboarding an individual or entity listed on global sanctions lists or failing to manage relationships with Politically Exposed Persons (PEPs) triggers severe international enforcement actions and reputational catastrophe.",
      "We help organizations establish automated, daily-updated screening frameworks against UN Security Council, OFAC, EU, and domestic MHA UAPA terrorist lists.",
      "Our screening protocols also identify domestic and foreign PEPs, their immediate family members, and close associates, implementing mandatory senior management sign-offs and heightened monitoring."
    ],
    subServicesHeading: "Sanctions & PEP Screening Offerings:",
    subServices: [
      "Screening against UNSC, OFAC, EU, UK HMT, and domestic designated terrorist lists.",
      "Identification of Foreign and Domestic PEPs, relatives, and close associates.",
      "Fuzzy-matching algorithm calibration to reduce false matches on common names.",
      "Adverse media and negative news background checks using global compliance databases.",
      "Real-time sanctions alert clearance protocols and audit-trail logging.",
      "Advisory on frozen assets reporting and regulatory compliance notifications."
    ]
  },
  "aml-policies-procedures": {
    title: "AML Policies & Procedures",
    heroHeading: "Drafting Robust AML/CFT Policies, SOPs & Governance Codes",
    image: "/images/img_30da68060b.jpg",
    introduction: [
      "A generic, copy-pasted AML policy is rejected by regulators during inspections. Statutory guidelines require an organization's policies and Standard Operating Procedures (SOPs) to reflect its specific operational risk profile.",
      "We draft tailor-made, board-approved Anti-Money Laundering (AML) and Countering the Financing of Terrorism (CFT) manuals. Our policies delineate clear lines of responsibility, onboarding criteria, record retention periods, and escalation channels.",
      "We also conduct structured training sessions for frontline and compliance personnel to institutionalize AML awareness."
    ],
    subServicesHeading: "Policy & Governance Deliverables:",
    subServices: [
      "Comprehensive AML / CFT / KYC Policy drafting for Board approval.",
      "Detailed operational Standard Operating Procedures (SOPs) for branch and digital teams.",
      "Record retention guidelines conforming to the mandatory 5-year PMLA rule.",
      "Employee due diligence and staff vetting frameworks.",
      "Interactive training modules and assessment workshops for operational staff.",
      "Annual policy review and regulatory update alignment."
    ]
  },

  // ==========================================
  // 6. FORENSIC ACCOUNTING SERVICES
  // ==========================================
  "forensic-accounting-services": {
    title: "Forensic Accounting Services",
    heroHeading: "Forensic Accounting, Fraud Investigation & Litigation Support",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "Corporate fraud, asset siphoning, bribery, procurement kickbacks, and accounting falsifications can threaten an organization's survival, damage investor faith, and trigger statutory prosecution.",
      "Shantanu S & Associates houses a specialized Forensic Accounting practice. Grounded in the Forensic Accounting and Investigation Standards (FAIS) issued by the ICAI, we deploy advanced investigative accounting techniques, fund flow tracing, and electronic evidence analytics.",
      "Whether assisting boards in investigating whistleblower complaints, uncovering vendor nexus, or preparing court-ready expert reports for economic offense courts, our forensic investigators deliver unshakeable proof."
    ],
    subServicesHeading: "Forensic Accounting Capabilities:",
    subServices: [
      "Comprehensive Forensic Audits and White-Collar Fraud Investigations.",
      "Fraud Examination, financial statement falsification detection, and ratio anomalies.",
      "Asset Tracing, fund diversion mapping, and fund recovery analytics.",
      "Fraud Risk Assessments, red-flag diagnostics, and anti-fraud control design.",
      "Litigation Support, commercial arbitration defense, and expert accounting witness testimony.",
      "Investigation of whistleblower allegations and conflict-of-interest violations."
    ]
  },
  "forensic-audit-investigation": {
    title: "Forensic Audit & Investigation",
    heroHeading: "Independent Forensic Audit & Corporate Investigation",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "When financial irregularities or suspected malpractices surface, management needs an independent, discreet, and legally robust investigation to uncover the truth without compromising evidence.",
      "Our forensic audit protocols investigate suspected fund diversions, related-party siphoning under Section 188, fictitious vendor billing, and unrecorded revenue streams.",
      "We collect and preserve electronic evidence, interview key personnel, analyze ledger logs, and synthesize findings into clear, objective investigative reports suitable for police, regulatory authorities (SFIO, ED), and courts."
    ],
    subServicesHeading: "Forensic Audit Offerings:",
    subServices: [
      "Investigation into suspected corporate asset siphoning and related-party fraud.",
      "Vendor and procurement fraud audits: bid rigging, ghost vendors, and duplicate billings.",
      "Investigation of whistleblower complaints concerning management misconduct.",
      "Deep analysis of ERP audit trails, deleted transaction logs, and backdated entries.",
      "Independent investigation commissioned by banks under RBI willful defaulter norms.",
      "Comprehensive investigative reports with clear documentary evidence trails."
    ]
  },
  "fraud-examination-financial-analysis": {
    title: "Fraud Examination & Financial Analysis",
    heroHeading: "Fraud Examination & Deep Financial Statement Analysis",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "Financial statement fraud involves intentional misstatement or omission of amounts or disclosures to deceive financial statement users—such as inflating revenue, hiding liabilities, or altering inventory valuations.",
      "Using sophisticated forensic analytical tools—including Benford's Law, duplicate payment algorithms, and journal entry testing—we dissect ledger structures to identify manipulated balances.",
      "Our examinations expose artificial inflation of turnover, circular billing loops, off-balance-sheet commitments, and fraudulent revenue recognition practices."
    ],
    subServicesHeading: "Fraud Examination Methodology:",
    subServices: [
      "Journal Entry Testing (JET) to isolate unusual, weekend, or post-closing accounting entries.",
      "Application of Benford's Law and statistical anomalies on vendor invoice distributions.",
      "Verification of revenue recognition milestones against actual delivery proofs (PODs).",
      "Analysis of circular trading patterns and GST turnover inflation networks.",
      "Inventory physical reconciliation against book balances to identify phantom stocks.",
      "Identification of concealed liabilities, unrecorded loans, and contingent exposures."
    ]
  },
  "asset-tracing-recovery-analysis": {
    title: "Asset Tracing & Recovery Analysis",
    heroHeading: "Asset Tracing, Fund Flow Mapping & Asset Recovery",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "In loan default, insolvency, partnership disputes, or corporate embezzlement, perpetrators frequently obscure stolen capital through complex webs of shell companies, real estate purchases, and offshore transfers.",
      "We perform rigorous multi-tier fund flow tracing. By analyzing hundreds of bank accounts, MCA director filings, GST transactions, and registry records, we follow the money to map exact destinations of diverted funds.",
      "Our fund-tracing exhibits serve as vital evidentiary assets for recovering misappropriated capital through civil recovery suits, NCLT proceedings, and enforcement actions."
    ],
    subServicesHeading: "Asset Tracing Deliverables:",
    subServices: [
      "Multi-account bank statement reconstruction and layered fund-flow mapping.",
      "Identification of shell companies, conduit entities, and beneficial controllers.",
      "Cross-referencing fund outflows against real estate and physical asset acquisitions.",
      "Affidavits and forensic visual charts tracing diverted loan funds.",
      "Assistance to Resolution Professionals (RPs) under Section 43, 45, and 66 of IBC.",
      "Evidence preparation for asset freezing applications before judicial authorities."
    ]
  },
  "fraud-risk-assessment": {
    title: "Fraud Risk Assessment",
    heroHeading: "Proactive Fraud Risk Assessment & Prevention Architecture",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "Waiting until fraud occurs results in devastating financial losses and damaged reputation. Proactive enterprises conduct structured Fraud Risk Assessments to identify vulnerabilities before bad actors exploit them.",
      "We evaluate your enterprise's operational processes, authorization matrices, procurement controls, and segregation of duties. We map realistic fraud scenarios across finance, sales, procurement, and IT operations.",
      "We design custom anti-fraud frameworks, whistleblower mechanisms, and surprise audit protocols to neutralize fraud risks at the root."
    ],
    subServicesHeading: "Fraud Risk Assessment Offerings:",
    subServices: [
      "Comprehensive diagnostic of internal controls and segregation of duties (SoD).",
      "Identification of high-vulnerability fraud risks across procurement, sales, and payroll.",
      "Implementation of secure, anonymous Whistleblower mechanisms and intake protocols.",
      "Design of surprise audit checklists and continuous red-flag dashboard alerts.",
      "Vendor and high-risk employee screening and conflict-of-interest declarations.",
      "Anti-fraud culture workshops and executive ethics benchmarking."
    ]
  },
  "litigation-support": {
    title: "Litigation Support",
    heroHeading: "Litigation Support & Expert Witness Testimony",
    image: "/images/img_a9188b67db.jpg",
    introduction: [
      "Commercial disputes, shareholder fallouts, breach of contract suits, and economic offense trials require clear, quantifiable, and court-admissible financial evidence.",
      "Shantanu S & Associates works closely with legal counsel and corporate litigants to provide robust Litigation Support. We calculate accurate economic damages, lost profits, valuation impairments, and disputed claims.",
      "Our partners draft clear, objective expert witness affidavits and provide authoritative testimony before Arbitral Tribunals, the National Company Law Tribunal (NCLT), and Civil Courts."
    ],
    subServicesHeading: "Litigation Support Capabilities:",
    subServices: [
      "Quantification of economic damages, business interruption claims, and lost profits.",
      "Financial evidence preparation for commercial arbitration and shareholder oppression suits.",
      "Expert witness reports adhering to procedural court standards and Evidence Act rules.",
      "Rebuttal analysis and cross-examination support against opposing financial claims.",
      "Independent financial valuation of disputed equity stakes and partnership assets.",
      "Assistance in commercial settlement negotiations and court-directed mediations."
    ]
  },

  // ==========================================
  // 7. BUSINESS SETUP & CORPORATE SERVICES
  // ==========================================
  "business-setup-corporate-services": {
    title: "Business Setup & Corporate Services",
    heroHeading: "Turnkey Business Setup & Corporate Incorporation in Bangalore",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "Starting a business in India requires careful strategic choices: selecting the right corporate structure, obtaining registrations, structuring promoter equity, and complying with the Ministry of Corporate Affairs (MCA).",
      "Shantanu S & Associates provides turnkey incorporation and corporate services. We manage the entire lifecycle: from name reservation on the MCA SPICe+ portal and drafting constitutional documents (MOA/AOA) to obtaining PAN, TAN, GST, and bank opening.",
      "We guide founders, overseas investors, and family businesses through Private Limited, LLP, and entity setups, ensuring smooth, fast, and compliant market entry."
    ],
    subServicesHeading: "Business Setup & Corporate Services Suite:",
    subServices: [
      "Incorporation of Private Limited, One Person Companies (OPC), and Section 8 NGOs.",
      "Formation of Limited Liability Partnerships (LLP) and traditional Partnership Firms.",
      "Comprehensive Business & Entity Registrations (GST, MSME Udyam, Shop Act, PT, PF, ESIC).",
      "Business Structuring & Advisory: promoter equity, capital tables, and tax-efficient vehicles.",
      "Ongoing MCA compliance, annual filings (AOC-4, MGT-7), and secretarial maintenance.",
      "FDI and FEMA advisory for foreign subsidiaries, liaison offices, and cross-border setups."
    ]
  },
  "business-entity-registration": {
    title: "Business & Entity Registration",
    heroHeading: "Comprehensive Business Registrations & Statutory Licenses",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "Operating a legitimate business in India requires securing multiple federal, state, and municipal registrations before commencing commercial transactions.",
      "We manage the entire registration portfolio for your enterprise: GST Registration, MSME Udyam Certification, Karnataka Professional Tax (PT), Shop and Commercial Establishment licenses, Import-Export Code (IEC), and PF/ESIC social security registrations.",
      "We eliminate bureaucratic delays, prevent departmental rejections, and deliver all statutory certificates directly to your inbox."
    ],
    subServicesHeading: "Business Registration Offerings:",
    subServices: [
      "GSTIN registration under state and central tax jurisdictions.",
      "MSME Udyam Registration to unlock statutory benefits and bank priority lending.",
      "Professional Tax (PT) Registration for employer (EC) and employees (RC).",
      "Karnataka Shop & Commercial Establishment Registration and annual compliance.",
      "Import Export Code (IEC) from the Directorate General of Foreign Trade (DGFT).",
      "Employees' Provident Fund (EPFO) and ESIC employer registrations."
    ]
  },
  "company-incorporation": {
    title: "Company Incorporation",
    heroHeading: "Private Limited, OPC & Section 8 Company Incorporation",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "A Private Limited Company is India's most recognized and respected legal vehicle—offering limited liability, independent legal personality, and the ability to raise institutional venture capital.",
      "We oversee the complete incorporation process on the Ministry of Corporate Affairs (MCA) portal. We handle Name Approval via RUN/SPICe+ Part A, draft tailored Articles of Association (AOA) and Memorandum of Association (MOA), obtain Digital Signature Certificates (DSC), and file SPICe+ Part B.",
      "Within days, we deliver your Certificate of Incorporation (COI), corporate PAN, TAN, and bank account setup."
    ],
    subServicesHeading: "Company Incorporation Deliverables:",
    subServices: [
      "Name approval reservation and distinct corporate branding guidance on MCA.",
      "Procurement of Digital Signature Certificates (DSC) and Director Identification Numbers (DIN).",
      "Drafting of custom MOA and AOA clauses reflecting your business objectives.",
      "Filing of integrated SPICe+ forms (Incorporation, PAN, TAN, EPFO, ESIC, Professional Tax).",
      "Assistance with Commencment of Business Certificate (Form INC-20A).",
      "Issuance of initial share certificates and creation of statutory statutory registers."
    ]
  },
  "llp-formation": {
    title: "LLP Formation",
    heroHeading: "Limited Liability Partnership (LLP) Registration Services",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "A Limited Liability Partnership (LLP) combines the organizational flexibility of a partnership with the limited liability protections of a corporate entity. It eliminates dividend distribution taxes, reduces compliance burdens, and has no mandatory statutory audit below prescribed turnover thresholds.",
      "We handle the entire LLP registration on the MCA portal: obtaining DPINs, reserving names via RUN-LLP, drafting comprehensive LLP Agreements that define partner profit shares, capital contributions, and operational rules, and filing Form FiLLiP.",
      "LLPs are an ideal choice for professional consultancies, service providers, and closely-held family businesses."
    ],
    subServicesHeading: "LLP Formation Scope:",
    subServices: [
      "Name reservation and preliminary trademark conflict check on the MCA portal.",
      "Obtaining Digital Signature Certificates (DSC) and DPIN for designated partners.",
      "Drafting a customized, comprehensive LLP Agreement defining rights, duties, and profits.",
      "Filing of Form FiLLiP (Incorporation Form) with the Registrar of Companies (ROC).",
      "Execution and e-filing of Form 3 (LLP Agreement) within the mandatory 30-day window.",
      "Securing the official Certificate of Incorporation, LLP PAN, and TAN."
    ]
  },
  "business-structuring-advisory": {
    title: "Business Structuring & Advisory",
    heroHeading: "Strategic Business Structuring & Entity Architecture",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "Choosing between a Pvt Ltd, LLP, Partnership, or Sole Proprietorship has lasting ramifications for fundraising, tax burdens, founder equity dilution, and regulatory scrutiny.",
      "Shantanu S & Associates provides comprehensive Business Structuring Advisory for founders and corporate groups. We analyze your commercial roadmap, funding requirements, promoter roles, and risk exposure to recommend the optimal legal vehicle.",
      "We also advise on holding company architectures, joint venture agreements, cross-border subsidiary setups, and conversion of partnerships into private limited entities."
    ],
    subServicesHeading: "Structuring & Advisory Deliverables:",
    subServices: [
      "Comparative entity feasibility analysis: Tax, compliance, and fundraising trade-offs.",
      "Promoter equity cap table design, vesting schedules, and shareholder agreements (SHA).",
      "Structuring cross-border joint ventures and subsidiary holding patterns.",
      "Conversion of Sole Proprietorships and Partnerships into LLPs or Private Limited Companies.",
      "Advisory on regulatory licenses and FDI compliance for non-resident investors.",
      "Commercial contract review and regulatory risk mitigation blueprints."
    ]
  },
  "ongoing-compliance-filings": {
    title: "Ongoing Compliance & Filings",
    heroHeading: "Annual ROC Filings & Corporate Secretarial Compliance",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "Incorporating an entity is only the first step. Every company and LLP must maintain active annual compliance with the Ministry of Corporate Affairs (MCA) to avoid director disqualification, severe per-day penalties, and strikes by the ROC.",
      "We manage the complete recurring secretarial calendar: drafting Board Meeting minutes, preparation of Director's Reports, filing Annual Financial Statements (Form AOC-4), Annual Returns (Form MGT-7/7A), and annual LLP returns (Form 11 & Form 8).",
      "Our proactive secretarial monitoring ensures that your corporate entity remains in good standing at all times."
    ],
    subServicesHeading: "Annual Secretarial & ROC Services:",
    subServices: [
      "Preparation and electronic filing of Form AOC-4 (Financial Statements) and Form MGT-7/7A.",
      "Filing of LLP Annual Return (Form 11) and Statement of Account & Solvency (Form 8).",
      "Annual Director KYC filings (DIR-3 KYC / DIR-3 KYC Web) for all board members.",
      "Drafting of Board Meeting Notices, Resolutions, and Annual General Meeting (AGM) documentation.",
      "Reporting changes in Directors, Registered Office, Capital Structure, or Bank Mandates.",
      "Maintenance of mandatory statutory registers under the Companies Act, 2013."
    ]
  },

  // ==========================================
  // 8. REGULATORY & COMPLIANCE SERVICES
  // ==========================================
  "regulatory-compliance-services": {
    title: "Regulatory & Compliance Services",
    heroHeading: "Comprehensive Regulatory & Corporate Compliance Advisory",
    image: "/images/img_9a0700b554.jpg",
    introduction: [
      "Modern Indian enterprises operate at the intersection of numerous regulatory regimes: MCA corporate law, Income Tax, GST, FEMA, labor laws, and industry-specific regulations. Non-compliance results in hefty monetary penalties, operational halts, and reputational damage.",
      "Shantanu S & Associates delivers unified, multi-regulatory compliance management. We establish institutional compliance calendars, monitor statutory due dates, conduct periodic compliance health checks, and liaise with regulatory authorities on your behalf.",
      "We enable business leaders to scale their organizations with complete legal confidence, knowing every statutory requirement is met with precision."
    ],
    subServicesHeading: "Regulatory & Compliance Practice Scope:",
    subServices: [
      "Statutory & Regulatory Compliance roadmaps across central, state, and local legislations.",
      "Corporate Compliance and board governance advisory under the Companies Act, 2013.",
      "Periodic statutory compliance audits and regulatory health-check reviews.",
      "FEMA compliance, foreign direct investment (FDI) reporting (FC-GPR / FC-TRS), and FLA returns.",
      "Labor law compliance reviews (PF, ESIC, Gratuity, Bonus, and Shops & Establishments).",
      "Handling compounding petitions, condonation of delay, and regulatory representations."
    ]
  },
  "statutory-regulatory-compliance": {
    title: "Statutory & Regulatory Compliance",
    heroHeading: "Enterprise Statutory & Regulatory Compliance Management",
    image: "/images/img_9a0700b554.jpg",
    introduction: [
      "Keeping track of dynamic statutory deadlines across Direct Tax, GST, MCA, PF, ESIC, and municipal laws is overwhelming for fast-moving businesses. A single missed deadline can trigger compounding interest and regulatory scrutiny.",
      "We construct tailored Statutory Compliance Frameworks for your enterprise. We map every applicable central and state statute, establish automated deadline alerts, and verify monthly chalans and return filings.",
      "Our partners deliver complete visibility and accountability, ensuring zero statutory default across all operations."
    ],
    subServicesHeading: "Statutory Compliance Services:",
    subServices: [
      "Customized enterprise statutory compliance calendar mapping and deadline monitoring.",
      "Unified compliance verification across GST, Direct Tax, TDS, PF, ESIC, and Professional Tax.",
      "Monthly statutory compliance review and issuance of Compliance Certificates to the Board.",
      "Handling inspections and inquiries from statutory regulatory authorities.",
      "Filing applications for condonation of delay and regularization of past defaults.",
      "Statutory due diligence for mergers, acquisitions, and private equity investments."
    ]
  },
  "corporate-compliance": {
    title: "Corporate Compliance",
    heroHeading: "MCA Corporate Compliance & Board Governance Advisory",
    image: "/images/img_9a0700b554.jpg",
    introduction: [
      "The Ministry of Corporate Affairs (MCA) enforces strict transparency and disclosure requirements. Failure to maintain board documentation, statutory registers, and event-based filings leads to severe penalties on directors and companies.",
      "We provide full corporate secretarial and legal governance support. We ensure that board and general meetings comply with Secretarial Standards (SS-1 and SS-2), document related-party transactions under Section 188, manage register maintenance, and handle event-based ROC filings.",
      "Our team safeguards your directors from personal liability and keeps your corporate standing impeccably clean."
    ],
    subServicesHeading: "Corporate Compliance Scope:",
    subServices: [
      "Comprehensive secretarial compliance management under the Companies Act, 2013.",
      "Drafting and maintaining minutes of Board, Committee, and Annual General Meetings (AGM).",
      "Event-based MCA filings: increase in authorized capital, allotment of shares (PAS-3), and director changes.",
      "Creation, modification, and satisfaction of charges (Forms CHG-1, CHG-4) with lenders.",
      "Maintenance of statutory registers: Members, Directors, Loans, and Significant Beneficial Owners (SBO).",
      "Preparation of comprehensive Corporate Governance and Director Disclosures reports."
    ]
  },
  "regulatory-advisory": {
    title: "Regulatory Advisory",
    heroHeading: "Strategic Regulatory Advisory & Liaisoning Services",
    image: "/images/img_9a0700b554.jpg",
    introduction: [
      "Navigating complex regulatory gray areas requires seasoned professional judgment and deep familiarity with governmental processes. Whether entering a regulated sector, addressing an ambiguous statute, or dealing with inter-departmental conflicts, expert counsel is vital.",
      "Our senior partners provide strategic regulatory advisory. We analyze statutory implications, formulate compliance strategies, draft formal representations to authorities, and handle compounding petitions before the Regional Director (RD) or NCLT.",
      "We provide actionable, defensible advisory that aligns regulatory compliance with your strategic business goals."
    ],
    subServicesHeading: "Regulatory Advisory Capabilities:",
    subServices: [
      "Legal opinions on complex statutory interpretations across Companies Act and tax statutes.",
      "Drafting and filing compounding applications under Section 441 of the Companies Act.",
      "FEMA compliance: Foreign Liabilities and Assets (FLA) returns, APRs, and RBI liaisoning.",
      "Representation before the Registrar of Companies (ROC), Regional Director (RD), and NCLT.",
      "Advisory on cross-border business structuring and transfer pricing documentation.",
      "Strategic guidance on regulatory approvals, licenses, and statutory exemptions."
    ]
  },

  // ==========================================
  // LEGACY ALIASES (Preserving all previous URLs)
  // ==========================================
  "gst-registration": {
    title: "GST Registration",
    heroHeading: "GST Registration Online – Process, Documents & Fees",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "GST forms the foundation of India's indirect tax system. Obtaining a GST registration is a strict legal requirement for businesses exceeding turnover thresholds or conducting inter-state taxable supplies.",
      "Our tax desk handles the entire registration lifecycle on the GST portal: classification of HSN/SAC codes, document compilation, application filing, and query response.",
      "We deliver your official GSTIN and registration certificate quickly and without bureaucratic friction."
    ],
    subServicesHeading: "Our GST Registration Offerings:",
    subServices: [
      "New GST registration for Proprietorships, Partnerships, LLPs, and Private Limited Companies.",
      "Filing replies to Clarification Notices (SCN) issued by GST tax officers.",
      "Core and non-core amendments in existing GST certificates.",
      "Revocation and restoration of cancelled GST registrations.",
      "LUT (Letter of Undertaking) filing for export businesses."
    ]
  },
  "private-limited-company": {
    title: "Private Limited Company",
    heroHeading: "Private Limited Company Incorporation in Bangalore",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "A Private Limited Company offers limited liability, separate legal identity, and perpetual succession, making it the premier structure for scaling businesses and raising capital.",
      "We manage the entire incorporation process on the MCA SPICe+ platform: digital signatures, name reservation, custom MOA/AOA, and PAN/TAN procurement."
    ],
    subServicesHeading: "Incorporation Scope:",
    subServices: [
      "Name approval and SPICe+ Part A filing on the MCA portal.",
      "Procurement of Digital Signature Certificates (DSC) and DIN.",
      "Drafting of customized MOA and AOA.",
      "Certificate of Incorporation, corporate PAN, and TAN generation.",
      "Assistance with bank account opening and Form INC-20A."
    ]
  },
  "llp-registration": {
    title: "LLP Registration",
    heroHeading: "Limited Liability Partnership (LLP) Registration",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "LLP provides limited liability protection combined with partnership operational flexibility, without the burden of mandatory statutory audits below threshold limits.",
      "We assist in name reservation, partner DPINs, drafting the LLP Agreement, and securing your incorporation certificate."
    ],
    subServicesHeading: "LLP Services:",
    subServices: [
      "Name reservation via RUN-LLP on MCA.",
      "Drafting comprehensive LLP agreement.",
      "Filing Form FiLLiP with ROC.",
      "Securing Certificate of Incorporation and PAN.",
      "Filing Form 3 within statutory 30-day window."
    ]
  },
  "msme-udyam-registration": {
    title: "MSME Udyam Registration",
    heroHeading: "Udyam Registration for Micro, Small & Medium Enterprises",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "MSME Udyam registration unlocks government benefits, collateral-free credit under CGTMSE, protection against delayed payments under Section 43B(h), and priority government procurement.",
      "We guide your enterprise through zero-error Udyam certification based on official tax and turnover data."
    ],
    subServicesHeading: "MSME Offerings:",
    subServices: [
      "New Udyam registration on the national MSME portal.",
      "Classification under Micro, Small, or Medium categories.",
      "Updating existing Udyam certificates with recent ITR/GST data.",
      "Guidance on recovering dues under the MSME Samadhaan portal."
    ]
  },
  "corporate-laws": {
    title: "Corporate Laws",
    heroHeading: "Corporate Laws & MCA Governance Advisory",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "Navigating corporate laws under the Companies Act, 2013 requires meticulous secretarial maintenance, board governance, and timely statutory filings.",
      "We provide end-to-end secretarial compliance, board advisory, and representation before the ROC and Regional Directors."
    ],
    subServicesHeading: "Corporate Law Offerings:",
    subServices: [
      "Annual ROC filings (Forms AOC-4, MGT-7).",
      "Director KYC compliance and appointments.",
      "Drafting board meeting resolutions and shareholder notices.",
      "Secretarial health-checks and compounding petitions."
    ]
  },
  "taxation-services": {
    title: "Taxation Services",
    heroHeading: "Comprehensive Direct & Indirect Taxation Services",
    image: "/images/img_9cb98489ef.jpg",
    introduction: [
      "Our taxation practice delivers unified direct tax and GST solutions. We combine strategic tax planning with accurate return filing and robust litigation support before appellate authorities.",
      "We ensure complete compliance while legally optimizing your effective tax liability."
    ],
    subServicesHeading: "Taxation Suite:",
    subServices: [
      "Income tax compliance, tax audit, and corporate returns.",
      "GST return filing, GSTR-2B ITC reconciliation, and refund processing.",
      "Advance tax computation and withholding tax (TDS) management.",
      "Representation in assessment proceedings and appellate appeals."
    ]
  },
  "business-registration": {
    title: "Business Registration",
    heroHeading: "Turnkey Business Registration & Licensing",
    image: "/images/img_7af04dbf3d.jpg",
    introduction: [
      "Starting an enterprise requires getting properly registered across central, state, and local departments. We manage the entire spectrum of business registrations.",
      "From GST and MSME to Shop Act, Professional Tax, and IEC, we ensure smooth and fast market entry."
    ],
    subServicesHeading: "Registration Suite:",
    subServices: [
      "GSTIN Registration and amendment.",
      "MSME Udyam Certification.",
      "Shop and Establishment Act registration.",
      "Professional Tax and Import Export Code (IEC)."
    ]
  },
  "consultancy": {
    title: "Consultancy",
    heroHeading: "Strategic Business Consulting & Financial Advisory",
    image: "/images/img_c1d747b9ff.jpg",
    introduction: [
      "Our consultancy practice partners with executive leadership to accelerate growth, optimize financial architecture, and navigate complex transactions.",
      "We provide financial due diligence, business valuation, M&A advisory, and strategic financial planning."
    ],
    subServicesHeading: "Consultancy Offerings:",
    subServices: [
      "Financial Due Diligence for investors and acquirers.",
      "Business and Equity Valuations under DCF and market multiples.",
      "M&A structuring and joint venture negotiation.",
      "Virtual CFO and strategic financial roadmap planning."
    ]
  },
  "nri-tax-services": {
    title: "NRI Tax & Allied Services",
    heroHeading: "NRI Taxation, FEMA Compliance & Repatriation Advisory",
    image: "/images/img_9a0700b554.jpg",
    introduction: [
      "Cross-border taxation and Indian real estate transactions for Non-Resident Indians (NRIs) involve complex interplay between the Income Tax Act, DTAA, and FEMA regulations.",
      "We provide dedicated advisory for NRIs on property sale TDS (Section 195), Lower Deduction Certificates (Form 13), Form 15CA/15CB repatriation, and DTAA relief."
    ],
    subServicesHeading: "NRI Tax Suite:",
    subServices: [
      "Advisory on TDS on sale of Indian property under Section 195.",
      "Application for Lower / Nil TDS Certificate (Form 13).",
      "Certification and filing of Form 15CA and Form 15CB for fund repatriation.",
      "Filing of NRI Income Tax Returns claiming DTAA foreign tax credits.",
      "FEMA compliance and NRE/NRO bank account advisory."
    ]
  }
};
