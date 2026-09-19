"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, Receipt, Calendar, FileText } from "lucide-react"
import { CreateInvoiceDialog } from "./CreateInvoiceDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { updateInvoiceStatus } from "@/app/actions/invoices"
import { toast } from "sonner"

const tabs = ["All", "Unpaid", "Paid", "Overdue"]

export function InvoicesTable({ data, pendingWorkRequests }: { data: any[], pendingWorkRequests: any[] }) {
  const [activeTab, setActiveTab] = useState("All")
  const [search, setSearch] = useState("")
  const [invoiceToSend, setInvoiceToSend] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSendInvoice = async () => {
    if (!invoiceToSend) return
    setIsSending(true)
    try {
      const { sendInvoice } = await import("@/app/actions/invoices")
      await sendInvoice(invoiceToSend)
      toast.success("Invoice sent successfully via Email, WhatsApp, and In-App notification!")
    } catch (e) {
      toast.error("Failed to send invoice.")
    } finally {
      setIsSending(false)
      setInvoiceToSend(null)
    }
  }

  const filteredData = data.filter((row) => {
    const matchesTab = activeTab === "All" || row.status.toLowerCase() === activeTab.toLowerCase()
    const matchesSearch = row.workRequest.title.toLowerCase().includes(search.toLowerCase()) || 
                          (row.workRequest.client.companyName || row.workRequest.client.user.name).toLowerCase().includes(search.toLowerCase()) ||
                          row.id.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID": return <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-emerald-100 transition-colors">Paid</Badge>
      case "UNPAID": return <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-amber-100 transition-colors">Unpaid</Badge>
      case "OVERDUE": return <Badge className="bg-red-50 text-red-600 border border-red-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-red-100 transition-colors">Overdue</Badge>
      default: return <Badge className="bg-slate-50 text-slate-500 border border-slate-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-slate-100 transition-colors">Pending</Badge>
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden relative">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-slate-100 gap-4 bg-slate-50/30">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Invoices</h2>
          <p className="text-sm text-slate-500 mt-1">Manage billing and track payments.</p>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between px-6 py-4 gap-4 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeTab === tab 
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search invoices..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 rounded-full shadow-inner h-10 text-[13px]"
            />
          </div>
          <CreateInvoiceDialog pendingWorkRequests={pendingWorkRequests} />
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase pl-6 py-4">Invoice #</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Client</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Work Request</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Status</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Issued Date</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4 text-right">Amount</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4 text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} className="border-b border-slate-100/60 hover:bg-slate-50/80 transition-colors group">
                <TableCell className="pl-6 py-4 font-medium text-slate-500 text-xs font-mono">
                  INV-{row.id.split("-")[0].toUpperCase()}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[14px] text-slate-800">{row.workRequest.client.companyName || row.workRequest.client.user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700 font-medium text-[14px]">{row.workRequest.title}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(row.status)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5 text-slate-600 text-[13px]">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    {new Date(row.issuedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span className="font-semibold text-slate-800 text-[15px]">
                    ₹{row.amount.toLocaleString('en-IN')}
                  </span>
                </TableCell>
                <TableCell className="pr-6 text-right py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => window.open(`/invoice/${row.id}`, '_blank')}
                      className="inline-flex items-center justify-center gap-1.5 text-[12px] font-medium text-blue-700 hover:text-blue-800 transition-colors border border-blue-200 hover:border-blue-300 hover:bg-blue-100 rounded-lg px-3 py-1.5 bg-blue-50 shadow-sm outline-none"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      View PDF
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors border border-slate-200 rounded-lg px-3 py-1.5 bg-white shadow-sm hover:border-slate-300 outline-none">
                        Mark as <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-200/60 p-1">
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer rounded-lg my-0.5" onClick={() => window.open(`/invoice/${row.id}`, '_blank')}>
                            View / Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[13px] text-blue-600 font-medium hover:bg-blue-50 cursor-pointer rounded-lg my-0.5" onClick={() => setInvoiceToSend(row.id)}>
                            Send to Client
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="bg-slate-100" />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-1.5">Change Status</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        {["PAID", "UNPAID", "OVERDUE"].map(status => (
                          <DropdownMenuItem 
                            key={status}
                            className="text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer rounded-lg my-0.5"
                            onClick={() => updateInvoiceStatus(row.id, status as any)}
                          >
                            Mark as {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Receipt className="h-8 w-8 text-slate-300 mb-2" />
                    <p>No invoices found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={!!invoiceToSend} onOpenChange={(open) => !open && !isSending && setInvoiceToSend(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Invoice to Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this invoice to the client? This will send an email, a WhatsApp message, and an in-app notification.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4">
            <Button variant="outline" onClick={() => setInvoiceToSend(null)} disabled={isSending}>
              Cancel
            </Button>
            <Button onClick={handleSendInvoice} disabled={isSending} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSending ? "Sending..." : "Yes, Send Invoice"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
