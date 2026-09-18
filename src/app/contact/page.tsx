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
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#032b4e] mb-4">Reach us for Best Chartered Accounting Services</h2>
            <p className="text-slate-600 max-w-3xl leading-relaxed">
              Even though we are a firm of Chartered Accountants in Pune, with our services of online consultation and &apos;No Need to Visit&apos; approach for our clients, we act as your CA Near Me for prospective clients located anywhere on the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <div>
              <h3 className="text-2xl font-bold text-[#032b4e] mb-2">Send Your Message Us</h3>
              <p className="text-sm text-slate-500 mb-8">Your email address will not be published. Required fields are marked *</p>
              
              <form id="contact-form" action={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="name" placeholder="Name *" required className="h-12 bg-slate-50 border-slate-200" />
                  <Input name="phone" placeholder="Phone *" required type="tel" className="h-12 bg-slate-50 border-slate-200" />
                </div>
                <Input name="email" placeholder="Email *" required type="email" className="h-12 bg-slate-50 border-slate-200" />
                <Textarea name="message" placeholder="Comment *" required className="min-h-[150px] bg-slate-50 border-slate-200" />
                <Button disabled={loading} type="submit" className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-6 rounded-md font-bold text-base shadow-sm">
                  {loading ? "SUBMITTING..." : "SUBMIT"}
                </Button>
              </form>
            </div>

            {/* Right: Info Boxes */}
            <div className="space-y-6">
              <Button variant="outline" className="w-full sm:w-auto bg-[#84cc16] hover:bg-[#65a30d] text-white border-0 py-6 px-8 font-bold text-base shadow-sm hover:text-white">
                Download Firm&apos;s Profile
              </Button>

              <div className="flex gap-4 p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <MapPin className="w-8 h-8 text-[#10b981]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Address Info</h4>
                  <p className="text-slate-600 leading-relaxed">
                    B-2240, Ganga Trueno Business Park,<br />
                    New Airport Road, Vimannagar,<br />
                    Pune - 411014
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1">
                  <Clock className="w-8 h-8 text-[#10b981]" />
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
                  <PhoneCall className="w-8 h-8 text-[#10b981]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Contact Info</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Phone: +91-7219308077<br />
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.383569830836!2d73.9133033!3d18.5567319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1404c000001%3A0x867375db6a1f34f7!2sGanga%20Trueno%20Business%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
