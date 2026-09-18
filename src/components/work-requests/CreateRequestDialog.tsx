"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createWorkRequest } from "@/app/actions/work-requests"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function CreateRequestDialog({ clients }: { clients: any[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState("")
  const [priority, setPriority] = useState("MEDIUM")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      formData.append("clientId", clientId)
      formData.append("priority", priority)
      await createWorkRequest(formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
      alert("Failed to create work request.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white shadow-md whitespace-nowrap rounded-lg group">
          + New Request
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] bg-white border-slate-200/60 shadow-lg rounded-[2rem] overflow-hidden">
        <DialogHeader className="bg-slate-50/50 p-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">New Work Request</DialogTitle>
          <DialogDescription className="text-[13px] text-slate-500">
            Create a new task or compliance request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Client</label>
            <Select value={clientId} onValueChange={(val) => setClientId(val || "")} required>
              <SelectTrigger className="w-full h-10 bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-lg">
                {clientId ? (
                  <span>{clients.find(c => c.id === clientId)?.companyName || clients.find(c => c.id === clientId)?.user.name || clientId}</span>
                ) : (
                  <span className="text-slate-500">Select client</span>
                )}
              </SelectTrigger>
              <SelectContent>
                {clients.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.companyName || c.user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Work Title</label>
            <Input name="title" required placeholder="e.g., GST Return - Q2" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-lg h-10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Priority</label>
              <Select value={priority} onValueChange={(val) => setPriority(val || "MEDIUM")}>
                <SelectTrigger className="w-full h-10 bg-slate-50/30 border-slate-200 rounded-lg">
                  {priority === "LOW" ? "Low" : priority === "MEDIUM" ? "Medium" : priority === "HIGH" ? "High" : priority}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Fee (₹)</label>
              <Input name="feeAmount" type="number" placeholder="Optional" className="bg-slate-50/30 border-slate-200 rounded-lg h-10" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Due Date</label>
            <Input name="dueDate" type="date" className="bg-slate-50/30 border-slate-200 rounded-lg h-10" />
          </div>
          
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !clientId} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm w-24">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
