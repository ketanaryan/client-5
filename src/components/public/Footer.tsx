import Link from "next/link"
import { MapPin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#032b4e] text-white pt-20 pb-6">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div className="space-y-6 pr-4">
          <h4 className="font-bold tracking-widest text-[13px] uppercase text-white mb-6">ABOUT SHANTANU S &amp; ASSOCIATES</h4>
          <p className="text-slate-300 text-sm leading-relaxed text-left">
            Shantanu S &amp; Associates is a trusted Chartered Accountancy practice based in Bengaluru. We provide comprehensive statutory audit, direct &amp; indirect taxation, corporate governance, and AML/KYC compliance advisory for emerging enterprises, established corporations, and global investors.
          </p>
          <div className="flex gap-2.5 pt-2">
            <Link href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">f</Link>
            <Link href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center font-bold text-xs hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">in</Link>
            <Link href="#" aria-label="X" className="w-8 h-8 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center font-bold text-xs hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">𝕏</Link>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold tracking-widest text-[13px] uppercase text-white mb-6">CONTACT INFO</h4>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-white shrink-0" />
              <div className="flex flex-col gap-1">
                <strong className="text-[15px] font-bold tracking-wide">Shantanu S &amp; Associates Head Office</strong>
                <span className="text-slate-300 text-sm leading-relaxed">No 1, 2nd Floor, 18th Cross Road, 23rd Main Road, JP Nagar 5th Phase, Bangalore - 560078</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-300 text-sm">
              <Mail className="w-5 h-5 text-white shrink-0" /> <a href="mailto:shantanus.associates@gmail.com" className="hover:text-blue-400 cursor-pointer">shantanus.associates@gmail.com</a>
            </div>
            <div className="flex items-center gap-4 text-slate-300 text-sm">
              <Phone className="w-5 h-5 text-white shrink-0" /> <a href="tel:8668555246" className="hover:text-blue-400 cursor-pointer">8668555246</a>
            </div>
            <div className="flex items-center gap-4 text-slate-300 text-sm">
              <Phone className="w-5 h-5 text-white shrink-0" /> <a href="tel:7219308077" className="hover:text-blue-400 cursor-pointer">7219308077</a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 lg:gap-4">
          <div className="space-y-6">
            <h4 className="font-bold tracking-widest text-[13px] uppercase text-white mb-6">EXPLORE</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' }, 
                { name: 'About', href: '/about' }, 
                { name: 'Services', href: '/#services' }, 
                { name: 'News & Resources', href: '/news-and-resources' }, 
                { name: 'Contact Us', href: '/contact' }
              ].map(l => (
                <li key={l.name}>
                  <Link href={l.href} className="text-[13px] text-slate-300 hover:text-white cursor-pointer flex items-center gap-2 transition-colors">
                    <div className="w-[4px] h-[4px] bg-slate-300 rounded-full"></div> {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold tracking-widest text-[13px] uppercase text-white mb-6">COMPANY</h4>
            <ul className="space-y-4">
              {[
                { name: 'Overview', href: '/about' }, 
                { name: 'Our Team', href: '/about#team' }
              ].map(l => (
                <li key={l.name}>
                  <Link href={l.href} className="text-[13px] text-slate-300 hover:text-white cursor-pointer flex items-center gap-2 transition-colors">
                    <div className="w-[4px] h-[4px] bg-slate-300 rounded-full"></div> {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold tracking-widest text-[13px] uppercase text-white mb-6">SERVICES</h4>
          <ul className="space-y-3">
            {[
              { name: 'Audit & Assurance', href: '/services/audit-and-assurance' }, 
              { name: 'Accounting & Financial', href: '/services/accounting-financial-services' }, 
              { name: 'Direct Taxation', href: '/services/direct-taxation' },
              { name: 'Goods & Services Tax', href: '/services/goods-and-services-tax' }, 
              { name: 'AML & KYC Services', href: '/services/aml-kyc-services' },
              { name: 'Forensic Accounting', href: '/services/forensic-accounting-services' }, 
              { name: 'Business Setup & Corporate', href: '/services/business-setup-corporate-services' },
              { name: 'Regulatory & Compliance', href: '/services/regulatory-compliance-services' }
            ].map(l => (
              <li key={l.name}>
                <Link href={l.href} className="text-[13px] text-slate-300 hover:text-white cursor-pointer flex items-center gap-2 leading-tight transition-colors">
                  <div className="w-[4px] h-[4px] shrink-0 bg-slate-300 rounded-full mt-[5px] self-start"></div> 
                  <span>{l.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
      
      <div className="border-t border-white/10 mt-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6 flex flex-col justify-center items-center text-[12px] text-slate-400 gap-4 tracking-wide">
          <div>&copy; {new Date().getFullYear()} Shantanu S &amp; Associates. All Rights Reserved.</div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/disclaimer" className="hover:text-white cursor-pointer transition-colors">Disclaimer</Link>|
            <Link href="/terms-and-conditions" className="hover:text-white cursor-pointer transition-colors">Terms &amp; Conditions</Link>|
            <Link href="/privacy-policy" className="hover:text-white cursor-pointer transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
