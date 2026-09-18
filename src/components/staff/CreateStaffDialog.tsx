"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createStaff } from "@/app/actions/staff"
import { Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

export function CreateStaffDialog({ roleType }: { roleType: "STAFF" | "ASSOCIATE" }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      setPhotoBase64(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const formData = new FormData(e.currentTarget)
      formData.append("role", roleType)
      if (photoBase64) {
        formData.append("image", photoBase64)
      }
      const res = await createStaff(formData)
      setOpen(false)
      setPhotoBase64(null)
      toast.success(`Account created! Email sent. (Temp password: ${res?.generatedPassword})`)
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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-white border-slate-200/60 shadow-lg rounded-[2rem] overflow-hidden">
        <DialogHeader className="bg-slate-50/50 p-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">Onboard {roleName}</DialogTitle>
          <DialogDescription className="text-[13px] text-slate-500">
            Create a new internal account. A secure random password will be generated and emailed to the staff member.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="flex gap-4">
            {photoBase64 && (
              <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoBase64} alt="Avatar Preview" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="space-y-1.5 flex-1">
              <label className="text-[13px] font-medium text-slate-700">Photo</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Full Name *</label>
            <Input name="name" required placeholder="e.g., Priya Mehta" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Email Address *</label>
            <Input name="email" type="email" required placeholder="staff@ca.com" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Phone</label>
              <Input name="phone" type="tel" placeholder="Optional" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Age</label>
              <Input name="age" type="number" min="18" max="100" placeholder="e.g., 28" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-[13px] font-medium text-slate-700">Gender</label>
              <select name="gender" className="flex h-10 w-full rounded-lg border border-slate-200 bg-slate-50/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-slate-700">Address</label>
            <Input name="address" placeholder="Full Address" className="bg-slate-50/30 border-slate-200 focus:ring-2 focus:ring-slate-900/20 transition-all rounded-lg h-10" />
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
