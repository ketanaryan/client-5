"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitEnquiry } from "./actions/enquiry"

export default function LandingPage() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    const result = await submitEnquiry(formData)
    setLoading(false)
    alert(result.message)
    if (result.success) {
      // Clear form
      const form = document.getElementById("enquiry-form") as HTMLFormElement
      form?.reset()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link className="flex items-center justify-center" href="#">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-2">CA</div>
          <span className="font-bold text-xl">ABC & CO.</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">Home</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#services">Services</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">Contact</Link>
          <Link href="/login"><Button>Professional Portal</Button></Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-gray-900">Your Trust. Our Commitment.</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl mb-8">Expert chartered accountancy services delivering precision, compliance, and strategic financial growth for your enterprise.</p>
          <Link href="/login"><Button size="lg" className="bg-blue-600 hover:bg-blue-700">Access Portal</Button></Link>
        </section>
        
        <section id="services" className="w-full py-16 px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {['Audit & Assurance', 'Direct Taxation', 'Indirect Taxation', 'Corporate & Regulatory', 'Advisory Services'].map(service => (
              <div key={service} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <p className="text-gray-500">Comprehensive {service.toLowerCase()} tailored to your business needs.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="w-full py-16 bg-white flex justify-center px-4">
          <div className="max-w-md w-full border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Need Our Services?</h2>
            <form id="enquiry-form" action={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Name</label>
                <Input name="name" required placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <Input name="email" type="email" required placeholder="john@company.com" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Phone (Optional)</label>
                <Input name="phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Service Needed</label>
                <select name="serviceRequested" className="w-full p-2 border rounded-md text-sm">
                  <option value="Audit & Assurance">Audit & Assurance</option>
                  <option value="Direct Taxation">Direct Taxation</option>
                  <option value="Indirect Taxation">Indirect Taxation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Message</label>
                <textarea name="message" required className="w-full p-2 border rounded-md text-sm" rows={4} placeholder="Tell us how we can help..."></textarea>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Send Enquiry"}
              </Button>
            </form>
          </div>
        </section>
        
        <section className="w-full py-12 bg-blue-600 text-white flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl w-full">
            <div><h4 className="text-4xl font-bold">10+</h4><p>Years Experience</p></div>
            <div><h4 className="text-4xl font-bold">250+</h4><p>Assignments</p></div>
            <div><h4 className="text-4xl font-bold">15+</h4><p>Team Members</p></div>
            <div><h4 className="text-4xl font-bold">98%</h4><p>Client Retention</p></div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2026 CA ABC & CO. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  )
}
