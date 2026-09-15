"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { recordPayment } from "@/app/actions/payments"
import { Loader2, Plus, IndianRupee } from "lucide-react"

export function RecordPaymentDialog({ unpaidInvoices }: { unpaidInvoices: any[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [invoiceId, setInvoiceId] = useState("")

  const selectedInv = unpaidInvoices.find(inv => inv.id === invoiceId)
  const defaultAmount = selectedInv?.amount || ""

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const formData = new FormData(e.currentTarget)
      formData.append("invoiceId", invoiceId)
      await recordPayment(formData)
      setOpen(false)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to record payment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-[#1e293b] hover:bg-[#334155] text-white shadow-md rounded-lg flex items-center transition-all group">
          <Plus className="mr-2 h-4 w-4" /> Record Manual Payment
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] bg-white border-slate-200/60 shadow-lg rounded-[2rem] overflow-hidden">
        <DialogHeader className="bg-slate-50/50 p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center">
              <IndianRupee className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">Record Payment</DialogTitle>
              <DialogDescription className="text-[13px] text-slate-500">
                Log an incoming client payment manually.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Unpaid Invoice</label>
            <Select value={invoiceId} onValueChange={(val) => setInvoiceId(val || "")} required>
              <SelectTrigger className="w-full h-10 bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-lg">
                <SelectValue placeholder="Select invoice" />
              </SelectTrigger>
              <SelectContent>
                {unpaidInvoices.length === 0 && (
                  <SelectItem value="none" disabled>No unpaid invoices</SelectItem>
                )}
                {unpaidInvoices.map(inv => (
                  <SelectItem key={inv.id} value={inv.id}>
                    INV-{inv.id.slice(0,8).toUpperCase()} (₹{inv.amount}) - {inv.workRequest.client.companyName || inv.workRequest.client.user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Amount (₹) *</label>
              <Input name="amount" type="number" step="0.01" required defaultValue={defaultAmount} className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-lg h-10 font-semibold text-slate-900" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Method</label>
              <Select name="method" defaultValue="ONLINE">
                <SelectTrigger className="w-full h-10 bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">Online/NEFT</SelectItem>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CHEQUE">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">UTR / Reference Number</label>
            <Input name="utrNumber" placeholder="Optional" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-lg h-10 font-mono text-sm" />
          </div>
          
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !invoiceId || invoiceId === "none"} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm w-24">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Record"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
