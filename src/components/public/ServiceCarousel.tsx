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
    desc: "Delivering rigorous, independent analysis of your financial health and internal frameworks. We empower organizations to ensure absolute transparency, exceed statutory benchmarks, and cultivate enduring trust among stakeholders and investors.",
  },
  {
    title: "Consultancy",
    slug: "consultancy",
    img: "/images/img_c1d747b9ff.jpg",
    desc: "Bespoke strategic guidance designed to accelerate enterprise scaling and operational agility. Our seasoned consultants partner with your leadership to map new growth avenues, neutralize market risks, and execute high-yield business transformations.",
  },
  {
    title: "NRI Tax And Allied Services",
    slug: "nri-tax-services",
    img: "/images/img_9a0700b554.jpg",
    desc: "Decoding the complexities of international tax landscapes. We provide specialized support for Non-Resident Indians, seamlessly managing cross-border income tax filings, leveraging DTAA frameworks, handling FEMA regulations, and facilitating smooth fund repatriation.",
  },
  {
    title: "Corporate Laws",
    slug: "corporate-laws",
    img: "/images/img_7af04dbf3d.jpg",
    desc: "Navigate the shifting terrain of corporate regulations with confidence. We provide comprehensive legal support spanning board governance protocols, meticulous annual filings, proactive statutory compliances, and seamless regulatory clearances under the Companies Act.",
  },
  {
    title: "Taxation Services",
    slug: "taxation-services",
    img: "/images/img_9cb98489ef.jpg",
    desc: "A holistic approach to direct and indirect tax management. From strategic income tax and GST planning to accurate return filings, representation in assessments, and dispute resolution, we fortify your compliance while maximizing tax efficiency.",
  },
  {
    title: "Business Registration",
    slug: "business-registration",
    img: "/images/img_30da68060b.jpg",
    desc: "Transform your visionary ideas into legal entities with zero friction. We oversee the entire lifecycle of business formation—from private limited incorporations and LLP setups to crucial GST and local authority registrations—getting you market-ready instantly.",
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
              <div className="p-8 flex flex-col flex-1 bg-white">
                <h3 className="font-bold text-2xl text-[#032b4e] mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-[16px] leading-[1.8] mb-8 flex-1">
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
