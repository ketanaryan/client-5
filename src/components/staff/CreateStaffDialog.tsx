"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createStaff } from "@/app/actions/staff"
import { Loader2, Plus } from "lucide-react"

export function CreateStaffDialog({ roleType }: { roleType: "STAFF" | "ASSOCIATE" }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const formData = new FormData(e.currentTarget)
      formData.append("role", roleType)
      await createStaff(formData)
      setOpen(false)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to create user.")
    } finally {
      setLoading(false)
    }
  }

  const roleName = roleType === "STAFF" ? "Staff Member" : "Associate"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-[#1e293b] hover:bg-[#334155] text-white shadow-md rounded-lg flex items-center transition-all group">
          <Plus className="mr-2 h-4 w-4" /> Onboard {roleName}
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] bg-white border-slate-200/60 shadow-lg rounded-[2rem] overflow-hidden">
        <DialogHeader className="bg-slate-50/50 p-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">Onboard {roleName}</DialogTitle>
          <DialogDescription className="text-[13px] text-slate-500">
            Create a new internal account. Default password will be <strong className="text-slate-700 font-mono">password123</strong>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Full Name *</label>
            <Input name="name" required placeholder="e.g., Priya Mehta" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Email Address *</label>
            <Input name="email" type="email" required placeholder="staff@ca.com" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Phone</label>
            <Input name="phone" type="tel" placeholder="Optional" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
          </div>
          
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-black text-white rounded-lg shadow-sm w-24">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Onboard"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
