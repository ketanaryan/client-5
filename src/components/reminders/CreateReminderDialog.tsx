"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BellRing } from "lucide-react"
import { createReminder } from "@/app/actions/reminders"

export function CreateReminderDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      await createReminder(formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm h-10 rounded-lg px-4 text-sm">
          <BellRing className="mr-2 h-4 w-4" /> Create Custom Reminder
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] rounded-xl bg-white border-slate-200">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">Create Reminder</DialogTitle>
            <DialogDescription className="text-slate-500">
              Add a new statutory deadline or client follow-up reminder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-slate-700 font-medium text-sm">Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. GSTR-1 Filing"
                className="col-span-3 rounded-lg border-slate-200 shadow-sm"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-slate-700 font-medium text-sm">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="e.g. Ensure all invoices are verified."
                className="col-span-3 rounded-lg border-slate-200 shadow-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate" className="text-slate-700 font-medium text-sm">Due Date *</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                className="col-span-3 rounded-lg border-slate-200 shadow-sm"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetCount" className="text-slate-700 font-medium text-sm">Target Clients Count</Label>
              <Input
                id="targetCount"
                name="targetCount"
                type="number"
                defaultValue={0}
                className="col-span-3 rounded-lg border-slate-200 shadow-sm"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-lg shadow-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="rounded-lg shadow-sm font-medium bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? "Creating..." : "Create Reminder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
