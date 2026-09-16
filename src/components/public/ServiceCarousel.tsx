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
    title: "Audit And Assurance",
    slug: "audit-and-assurance",
    img: "/images/img_a9188b67db.jpg",
    desc: "Our audit and assurance services provide independent, objective evaluations of your financial statements and internal controls. We help organizations maintain transparency, comply with regulatory standards, and build stakeholder confidence.",
  },
  {
    title: "Consultancy",
    slug: "consultancy",
    img: "/images/img_c1d747b9ff.jpg",
    desc: "We offer strategic consultancy services tailored to drive business growth and operational efficiency. Our experienced advisors work closely with you to identify opportunities, mitigate risks, and implement solutions that deliver measurable results.",
  },
  {
    title: "NRI Tax And Allied Services",
    slug: "nri-tax-services",
    img: "/images/img_9a0700b554.jpg",
    desc: "Navigating cross-border taxation can be complex. Our dedicated NRI tax services simplify compliance for non-resident Indians, covering income tax filings, DTAA benefits, repatriation guidance, and FEMA advisory.",
  },
  {
    title: "Corporate Laws",
    slug: "corporate-laws",
    img: "/images/img_7af04dbf3d.jpg",
    desc: "Stay compliant with ever-evolving corporate legislation. We assist with company law matters including board governance, annual filings, regulatory approvals, and statutory compliance under the Companies Act and allied regulations.",
  },
  {
    title: "Taxation Services",
    slug: "taxation-services",
    img: "/images/img_9cb98489ef.jpg",
    desc: "From direct to indirect taxes, our comprehensive taxation services cover GST, income tax planning, return filings, assessments, and dispute resolution. We ensure you stay compliant while optimizing your overall tax position.",
  },
  {
    title: "Business Registration",
    slug: "business-registration",
    img: "/images/img_30da68060b.jpg",
    desc: "Kickstart your entrepreneurial journey with our end-to-end business registration services. We handle company incorporation, LLP registration, partnership deeds, GST registration, and all necessary licences to get you operational swiftly.",
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
              className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col"
            >
              {/* Image */}
              <div className="h-[220px] overflow-hidden relative">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-[22px] text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-5 flex-1">
                  {service.desc}
                </p>
                <Link href={`/services/${service.slug}`}>
                  <Button className="bg-[#032b4e] hover:bg-[#1c3a5e] text-white rounded-md px-5 py-2 text-sm">
                    Read More
                  </Button>
                </Link>
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
