"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createInvoice } from "@/app/actions/invoices"
import { Loader2, Plus, Receipt } from "lucide-react"

export function CreateInvoiceDialog({ pendingWorkRequests }: { pendingWorkRequests: any[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [workRequestId, setWorkRequestId] = useState("")

  // Auto-fill fee amount if the selected work request has one
  const selectedWr = pendingWorkRequests.find(wr => wr.id === workRequestId)
  const defaultAmount = selectedWr?.feeAmount || ""

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const formData = new FormData(e.currentTarget)
      formData.append("workRequestId", workRequestId)
      await createInvoice(formData)
      setOpen(false)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to create invoice.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-[#1e293b] hover:bg-[#334155] text-white shadow-md rounded-lg flex items-center transition-all group">
          <Plus className="mr-2 h-4 w-4" /> Generate Invoice
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] bg-white border-slate-200/60 shadow-lg rounded-[2rem] overflow-hidden">
        <DialogHeader className="bg-slate-50/50 p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center">
              <Receipt className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">Generate Invoice</DialogTitle>
              <DialogDescription className="text-[13px] text-slate-500">
                Bill a completed work request.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Completed Work Request</label>
            <Select value={workRequestId} onValueChange={(val) => setWorkRequestId(val || "")} required>
              <SelectTrigger className="w-full h-10 bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-indigo-500/20 transition-all rounded-lg">
                <SelectValue placeholder="Select work request" />
              </SelectTrigger>
              <SelectContent>
                {pendingWorkRequests.length === 0 && (
                  <SelectItem value="none" disabled>No unbilled completed work</SelectItem>
                )}
                {pendingWorkRequests.map(wr => (
                  <SelectItem key={wr.id} value={wr.id}>
                    {wr.client.companyName || wr.client.user.name} - {wr.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Invoice Amount (₹) *</label>
            <Input name="amount" type="number" step="0.01" required defaultValue={defaultAmount} placeholder="e.g., 5000" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-indigo-500/20 transition-all rounded-lg h-10 text-lg font-semibold" />
          </div>
          
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !workRequestId || workRequestId === "none"} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm w-24">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
