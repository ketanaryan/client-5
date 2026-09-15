import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export function Navbar() {
  return (
    <div className="flex flex-col w-full relative z-50">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-100 py-2 px-6 lg:px-12 flex items-center justify-between text-xs sm:text-sm font-medium">
        <div>20+ Years of Excellence</div>
        <div className="flex items-center gap-6">
          <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+91 98765 43210</span>
          </a>
          <a href="mailto:contact@shantanuassociates.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">contact@shantanuassociates.com</span>
          </a>
        </div>
      </div>
      
      {/* Main Navigation Bar */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm sticky top-0">
        <Link className="flex items-center gap-3 group" href="#">
          <div className="h-10 w-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
            CA
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight text-blue-950">Shantanu & Associates</span>
            <span className="text-[10px] tracking-widest text-slate-500 font-medium uppercase mt-1">Chartered Accountants</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center h-full">
          <Link className="text-sm font-bold text-blue-950 px-4 h-full flex items-center border-b-2 border-transparent hover:border-emerald-600 hover:text-emerald-700 transition-colors" href="#services">Practice Areas</Link>
          <Link className="text-sm font-bold text-blue-950 px-4 h-full flex items-center border-b-2 border-transparent hover:border-emerald-600 hover:text-emerald-700 transition-colors" href="#about">About Firm</Link>
          <Link className="text-sm font-bold text-blue-950 px-4 h-full flex items-center border-b-2 border-transparent hover:border-emerald-600 hover:text-emerald-700 transition-colors" href="#contact">Contact</Link>
          <div className="w-px h-6 bg-slate-300 mx-4"></div>
          <Link href="/login">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-md px-6">
              Client Portal
            </Button>
          </Link>
        </nav>
      </header>
    </div>
  )
}
