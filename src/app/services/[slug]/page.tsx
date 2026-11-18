import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SERVICES, ServiceData } from './servicesData';

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = SERVICES[params.slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Shantanu S & Associates`,
    description: service.introduction[0] || `${service.title} services by Shantanu S & Associates, Chartered Accountants in Bangalore.`,
  };
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = SERVICES[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#0B1425] text-white py-16 md:py-20 overflow-hidden border-b border-[#15233A]">
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
          <div className="text-xs text-slate-300 mb-4 flex items-center space-x-2 font-medium">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/#services" className="hover:text-blue-400 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-blue-400 font-semibold">{service.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl tracking-tight text-white">
            {service.heroHeading}
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base font-medium flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span>Chartered Accountants • Shantanu S &amp; Associates</span>
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-14 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side text */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              <div className="bg-white p-7 md:p-9 rounded-2xl shadow-sm border border-slate-200/90">
                <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span>Practice Overview</span>
                </h2>
                <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
                  {service.introduction.map((paragraph, idx) => (
                    <p key={idx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Offerings and Scope */}
              <div className="bg-white p-7 md:p-9 rounded-2xl shadow-sm border border-slate-200/90">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                  {service.subServicesHeading}
                </h3>
                <ul className="space-y-3.5">
                  {service.subServices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 text-[14.5px] leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Statutory Assurance Commitment */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">
                    Compliance &amp; Execution Guarantee
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    All engagements are executed under the direct supervision of senior Chartered Accountants adhering to ICAI guidelines, applicable accounting standards, and statutory deadlines.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side card */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 relative aspect-video w-full bg-slate-900">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* CTA Consultation Card */}
              <div className="bg-[#0B1425] rounded-2xl p-7 text-center text-white shadow-lg border border-[#162744]">
                <div className="inline-block bg-blue-500/10 text-blue-400 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  Consulting Desk
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-white">
                  Need Assistance with {service.title}?
                </h3>
                <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
                  Connect with our Chartered Accountants at Shantanu S &amp; Associates for timely, professional, and compliant advisory.
                </p>
                <div className="space-y-3">
                  <Link href="/#contact" className="block w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm h-12 rounded-xl transition-all shadow-sm">
                      Enquire Now
                    </Button>
                  </Link>
                  <Link href="/contact" className="block w-full">
                    <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold text-xs h-10 rounded-xl">
                      Contact Office
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
