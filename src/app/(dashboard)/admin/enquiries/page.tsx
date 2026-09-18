import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProvisionClientButton, DeleteEnquiryButton } from "@/components/enquiries/ProvisionClientButton"

// Server component
export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col h-full bg-[#f8fafd]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Leads & Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">Manage contact form submissions from the landing page.</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase pl-6 py-4">Date</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4">Name</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4">Contact Info</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4">Service Interested In</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4 w-[25%]">Message</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4">Status</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                    No enquiries found yet.
                  </TableCell>
                </TableRow>
              ) : (
                enquiries.map((enq) => (
                  <TableRow key={enq.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <span className="text-slate-600 text-sm whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="font-semibold text-slate-800">{enq.name}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-blue-600">{enq.email}</span>
                        {enq.phone && <span className="text-xs text-slate-500">{enq.phone}</span>}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {enq.serviceRequested ? (
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                          {enq.serviceRequested.split(', ').filter(Boolean).map((srv, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 font-medium text-xs whitespace-nowrap">
                              {srv}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm italic">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                        {enq.message}
                      </p>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={enq.status === "CONVERTED" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-2.5 py-0.5" : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-2.5 py-0.5"}>
                        {enq.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right py-4">
                      <div className="flex items-center justify-end gap-2">
                        <ProvisionClientButton enquiryId={enq.id} status={enq.status} />
                        <DeleteEnquiryButton enquiryId={enq.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
