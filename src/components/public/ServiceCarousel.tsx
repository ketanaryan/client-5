"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Service {
  title: string;
  slug: string;
  img: string;
  desc: string;
}

const services: Service[] = [
  {
    title: "Audit & Assurance",
    slug: "audit-and-assurance",
    img: "/images/img_a9188b67db.jpg",
    desc: "Rigorous statutory audits, internal risk reviews, tax audits, and special purpose assurance aligned with ICAI Standards on Auditing to ensure complete financial integrity.",
  },
  {
    title: "Accounting & Financial Services",
    slug: "accounting-financial-services",
    img: "/images/img_c1d747b9ff.jpg",
    desc: "End-to-end accounting, bookkeeping, MIS financial reporting, and complex ledger reconstruction to give your leadership clear financial clarity.",
  },
  {
    title: "Direct Taxation",
    slug: "direct-taxation",
    img: "/images/img_9cb98489ef.jpg",
    desc: "Comprehensive corporate and individual income tax compliance, strategic tax planning, assessment management, and high-level litigation before appellate tribunals.",
  },
  {
    title: "Goods & Services Tax",
    slug: "goods-and-services-tax",
    img: "/images/img_9cb98489ef.jpg",
    desc: "Complete GST return filing, input tax credit reconciliation under GSTR-2B, departmental notice resolution, refund processing, and appeals.",
  },
  {
    title: "AML & KYC Services",
    slug: "aml-kyc-services",
    img: "/images/img_30da68060b.jpg",
    desc: "Institutional customer due diligence, AML risk assessment, continuous transaction monitoring, and PEP screening in compliance with statutory frameworks.",
  },
  {
    title: "Forensic Accounting Services",
    slug: "forensic-accounting-services",
    img: "/images/img_a9188b67db.jpg",
    desc: "Specialized fraud investigations, deep forensic audits, asset tracing, fraud risk mitigation, and expert financial witness litigation support.",
  },
  {
    title: "Business Setup & Corporate Services",
    slug: "business-setup-corporate-services",
    img: "/images/img_7af04dbf3d.jpg",
    desc: "Seamless company incorporation, LLP setup, startup structuring, entity registrations, and ongoing MCA annual filings for burgeoning enterprises.",
  },
  {
    title: "Regulatory & Compliance Services",
    slug: "regulatory-compliance-services",
    img: "/images/img_9a0700b554.jpg",
    desc: "Holistic statutory compliance architecture, corporate governance advisory, MCA regulatory filings, and proactive risk management for enterprises.",
  },
];

const DESKTOP_PER_PAGE = 3;

export default function ServiceCarousel() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(services.length / DESKTOP_PER_PAGE);

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const startIndex = page * DESKTOP_PER_PAGE;
  const visibleServices = services.slice(
    startIndex,
    startIndex + DESKTOP_PER_PAGE
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous services"
          className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleServices.map((service) => (
            <div
              key={service.slug}
              className="rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="h-[200px] overflow-hidden relative bg-slate-900">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 flex flex-col flex-1 bg-white">
                <h3 className="font-bold text-lg md:text-xl text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link href={`/services/${service.slug}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-xs font-semibold shadow-xs transition-colors">
                      Explore Practice →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next services"
          className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 transition-colors shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Mobile Arrows */}
      <div className="flex md:hidden justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous services"
          className="flex w-10 h-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next services"
          className="flex w-10 h-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </div>
  );
}
