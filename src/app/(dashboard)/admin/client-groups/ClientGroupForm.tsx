"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { createClientGroup } from "@/app/actions/client-group"
import { useRouter } from "next/navigation"

export function ClientGroupForm({ unassignedProfiles }: { unassignedProfiles: any[] }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [primaryContactId, setPrimaryContactId] = useState("")
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleToggle = (id: string) => {
    setSelectedProfiles(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !primaryContactId || selectedProfiles.length === 0) {
      toast.error("Please fill all required fields and select at least one entity.")
      return
    }

    try {
      setIsSubmitting(true)
      await createClientGroup(name, primaryContactId, selectedProfiles)
      toast.success("Group created successfully!")
      setOpen(false)
      setName("")
      setPrimaryContactId("")
      setSelectedProfiles([])
      router.refresh()
    } catch (error) {
      toast.error("Failed to create group")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Create New Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Client Group</DialogTitle>
          <DialogDescription>Group multiple entities into a single business family.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Group Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. The Sharma Group" required />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Contact User ID (Admin/Owner)</label>
            <Input value={primaryContactId} onChange={e => setPrimaryContactId(e.target.value)} placeholder="User UUID" required />
            <p className="text-xs text-slate-500">The user who will have access to all entities in this group.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Select Entities (Client Profiles)</label>
            <div className="max-h-[200px] overflow-y-auto border rounded-md p-3 space-y-2 bg-slate-50">
              {unassignedProfiles.length === 0 && <p className="text-sm text-slate-500">No unassigned profiles available.</p>}
              {unassignedProfiles.map(profile => (
                <div key={profile.id} className="flex items-center space-x-2 bg-white border p-2 rounded-lg">
                  <Checkbox 
                    id={`profile-${profile.id}`} 
                    checked={selectedProfiles.includes(profile.id)}
                    onCheckedChange={() => handleToggle(profile.id)}
                  />
                  <label htmlFor={`profile-${profile.id}`} className="text-sm font-medium leading-none cursor-pointer flex-1">
                    {profile.companyName || profile.user.name} 
                    <span className="block text-xs text-slate-500 font-normal mt-0.5">{profile.user.email}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
