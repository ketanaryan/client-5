"use client"

import { useState } from "react"
import { Navbar } from "@/components/public/Navbar"
import { Footer } from "@/components/public/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, PhoneCall } from "lucide-react"
import ServiceCarousel from "@/components/public/ServiceCarousel"
import { submitEnquiry } from "@/app/actions/enquiry"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    const result = await submitEnquiry(formData)
    setLoading(false)
    alert(result.message)
    if (result.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement
      form?.reset()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="bg-[#032b4e] pt-32 pb-20 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/img_adf3301b42.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Get in touch with us for expert financial guidance, compliance, and growth strategies.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1425] mb-3 tracking-tight">Connect with Our Advisory Desk</h2>
            <p className="text-slate-600 max-w-3xl leading-relaxed text-[15px]">
              Headquartered in Bangalore, our firm delivers structured online consultations, statutory compliance, and corporate advisory for clients across India and globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <div>
              <h3 className="text-2xl font-bold text-[#0B1425] mb-2 tracking-tight">Send Us a Message</h3>
              <p className="text-xs text-slate-500 mb-6">All information provided remains strictly confidential. Required fields are marked *</p>
              
              <form id="contact-form" action={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input name="name" placeholder="Full Name *" required className="h-11 bg-slate-50 border-slate-200 rounded-lg text-sm" />
                  <Input name="phone" placeholder="Phone Number *" required type="tel" className="h-11 bg-slate-50 border-slate-200 rounded-lg text-sm" />
                </div>
                <Input name="email" placeholder="Email Address *" required type="email" className="h-11 bg-slate-50 border-slate-200 rounded-lg text-sm" />
                <Textarea name="message" placeholder="Details of your business requirement or query *" required className="min-h-[140px] bg-slate-50 border-slate-200 rounded-lg text-sm resize-none" />
                <Button disabled={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-lg font-bold text-sm shadow-sm transition-all">
                  {loading ? "Submitting..." : "Send Message →"}
                </Button>
              </form>
            </div>

            {/* Right: Info Boxes */}
            <div className="space-y-6">
              <Button variant="outline" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-0 py-6 px-8 font-bold text-base shadow-sm hover:text-white">
                Download Firm&apos;s Profile
              </Button>

              <div className="flex gap-4 p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <MapPin className="w-8 h-8 text-[#0f4a7b]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Address Info</h4>
                  <p className="text-slate-600 leading-relaxed">
                    No 1, 2nd Floor, 18th Cross Road,<br />
                    23rd Main Road, JP Nagar 5th Phase,<br />
                    Bangalore - 560078
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <Clock className="w-8 h-8 text-[#0f4a7b]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Office Schedule</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Monday to Saturday: 10.00 am to 06.30 pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <PhoneCall className="w-8 h-8 text-[#0f4a7b]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Contact Info</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Phone: +91-8668555246<br />
                    Email: shantanus.associates@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] bg-slate-100 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.809315330315!2d77.5852922750756!3d12.90393298740529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1511227161b3%3A0xc00f2adfb2a20b9e!2sJP%20Nagar%205th%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560078!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </section>

      {/* CA Services We Offer */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#032b4e]">CA Services We Offer</h2>
        </div>
        <ServiceCarousel />
      </section>

      <Footer />
    </div>
  )
}
