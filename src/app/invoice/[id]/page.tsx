import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Printer, Download, Mail, Send } from "lucide-react"

export default async function InvoicePrintPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      workRequest: {
        include: {
          client: {
            include: { user: true }
          }
        }
      }
    }
  })

  if (!invoice) return <div>Invoice not found</div>

  // Basic security: only admin, staff, or the client who owns it can view
  if (
    session.user.role === "CLIENT" && 
    invoice.workRequest.client.userId !== session.user.id
  ) {
    redirect("/login")
  }

  const invoiceNum = `INV-${invoice.id.split("-")[0].toUpperCase()}`
  const issuedDate = new Date(invoice.issuedDate).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans print:bg-white print:p-0 print:m-0">
      
      {/* Non-printable action bar */}
      <div className="max-w-[800px] mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 print:hidden">
        <div>
          <h2 className="font-semibold text-slate-800">Invoice {invoiceNum}</h2>
          <p className="text-sm text-slate-500">Status: <span className="font-medium text-slate-700">{invoice.status}</span></p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2" id="print-btn">
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* A4 Printable Sheet */}
      <div className="max-w-[800px] mx-auto bg-white shadow-lg print:shadow-none print:border-0 border border-slate-200 min-h-[1122px] relative overflow-hidden" id="invoice-sheet">
        
        {/* Top Accent Bar */}
        <div className="h-4 w-full bg-[#032b4e]"></div>

        <div className="p-12 pb-24">
          
          {/* Header Row */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 mb-2">
                <Image src="/ca-logo-cropped.png" alt="CA Logo" width={60} height={60} className="object-contain" />
                <h1 className="text-2xl font-bold text-[#032b4e] uppercase tracking-wider">Shantanu & Associates</h1>
              </div>
              <p className="text-sm text-slate-500">Chartered Accountants</p>
              <p className="text-sm text-slate-500 max-w-xs mt-1">
                No 1, 2nd Floor, 18th Cross Road, 23rd Main Road,<br/>
                JP Nagar 5th Phase, Bangalore - 560078
              </p>
              <p className="text-sm text-slate-500">GSTIN: 29XXXXXXXXXX1Z</p>
              <p className="text-sm text-slate-500">Email: shantanus.associates@gmail.com</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <h2 className="text-4xl font-light text-slate-300 uppercase tracking-widest mb-2">Invoice</h2>
              <div className="flex flex-col gap-1 mt-4 text-sm">
                <div className="flex justify-between gap-8"><span className="text-slate-500 font-medium">Invoice No:</span> <span className="font-semibold text-slate-800">{invoiceNum}</span></div>
                <div className="flex justify-between gap-8"><span className="text-slate-500 font-medium">Date:</span> <span className="font-semibold text-slate-800">{issuedDate}</span></div>
              </div>
            </div>
          </div>

          {/* Bill To Row */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Billed To:</h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h4 className="text-lg font-bold text-slate-900 mb-1">{invoice.workRequest.client.companyName || invoice.workRequest.client.user.name}</h4>
              <p className="text-sm text-slate-600 mb-0.5">{invoice.workRequest.client.user.name}</p>
              <p className="text-sm text-slate-600 mb-0.5">{invoice.workRequest.client.user.email}</p>
              <p className="text-sm text-slate-600">{invoice.workRequest.client.user.phone || "No phone provided"}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full mb-12">
            <thead>
              <tr className="border-b-2 border-slate-800">
                <th className="py-3 text-left text-sm font-bold text-slate-800 uppercase tracking-wider w-2/3">Description of Services</th>
                <th className="py-3 text-right text-sm font-bold text-slate-800 uppercase tracking-wider">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-6 text-slate-700">
                  <p className="font-semibold text-slate-900 text-base mb-1">{invoice.workRequest.title}</p>
                  <p className="text-sm text-slate-500">Professional services rendered as per the work request agreement.</p>
                </td>
                <td className="py-6 text-right font-semibold text-slate-900 text-base align-top">
                  {invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Totals Box */}
          <div className="flex justify-end mb-16">
            <div className="w-1/2">
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-semibold text-slate-900">{invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tax (0%)</span>
                <span className="font-semibold text-slate-900">0.00</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-[#032b4e]">
                <span className="text-lg font-bold text-[#032b4e]">Total Due</span>
                <span className="text-lg font-bold text-[#032b4e]">₹ {invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Bank Details & Notes */}
          <div className="border-t border-slate-200 pt-8 mt-16 flex justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Bank Details</h3>
              <p className="text-sm text-slate-600 mb-1"><strong>Bank:</strong> HDFC Bank Ltd.</p>
              <p className="text-sm text-slate-600 mb-1"><strong>A/C Name:</strong> CA Shantanu & Associates</p>
              <p className="text-sm text-slate-600 mb-1"><strong>A/C No:</strong> 502000XXXXXX12</p>
              <p className="text-sm text-slate-600"><strong>IFSC Code:</strong> HDFC0001234</p>
            </div>
            
            <div className="text-right">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Authorised Signatory</h3>
              <div className="h-16 w-32 border-b border-slate-300 ml-auto mb-2 relative">
                {/* Simulated signature or stamp could go here */}
                <div className="absolute bottom-1 right-2 text-blue-900/20 font-bold italic text-2xl -rotate-12">CA SHANTANU</div>
              </div>
              <p className="text-sm font-medium text-slate-800">For Shantanu & Associates</p>
            </div>
          </div>

        </div>

        {/* Bottom Accent Bar */}
        <div className="absolute bottom-0 w-full bg-slate-50 border-t border-slate-100 p-6 text-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Thank you for your business!</p>
        </div>

      </div>

      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('print-btn')?.addEventListener('click', () => {
          window.print();
        });
      `}} />
    </div>
  )
}
