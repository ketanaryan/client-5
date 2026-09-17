"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, Loader2, Eye } from "lucide-react"
import { approveKyc, rejectKyc } from "@/app/actions/kyc"

export function KycReviewModal({ client }: { client: any }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectInput, setShowRejectInput] = useState(false)

  const handleApprove = async () => {
    setLoading("approve")
    try {
      await approveKyc(client.id)
      setIsOpen(false)
      router.refresh()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }
    setLoading("reject")
    try {
      await rejectKyc(client.id, rejectionReason)
      setIsOpen(false)
      setRejectionReason("")
      setShowRejectInput(false)
      router.refresh()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
          <Eye className="w-4 h-4 mr-2" /> Review Documents
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>KYC Review: {client.name}</DialogTitle>
          <DialogDescription>
            Verify the provided documents against the textual information.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 py-4">
          
          {/* PAN Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 border-b pb-2">PAN Card</h3>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase">Submitted Number</label>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg font-mono text-slate-900">
                {client.decryptedPan || "Not Provided"}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase">Document File</label>
              {client.panDocumentUrl ? (
                <div className="h-48 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 relative group">
                  <iframe src={client.panDocumentUrl} className="w-full h-full" />
                  <a href={client.panDocumentUrl} target="_blank" className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Open in New Tab
                  </a>
                </div>
              ) : (
                <div className="h-48 border border-slate-200 border-dashed rounded-lg flex items-center justify-center text-slate-400 bg-slate-50 text-sm">
                  No document attached
                </div>
              )}
            </div>
          </div>

          {/* GST Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 border-b pb-2">GST Certificate</h3>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase">Submitted GSTIN</label>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg font-mono text-slate-900">
                {client.decryptedGst || "Not Provided"}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase">Document File</label>
              {client.gstDocumentUrl ? (
                <div className="h-48 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 relative group">
                  <iframe src={client.gstDocumentUrl} className="w-full h-full" />
                  <a href={client.gstDocumentUrl} target="_blank" className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Open in New Tab
                  </a>
                </div>
              ) : (
                <div className="h-48 border border-slate-200 border-dashed rounded-lg flex items-center justify-center text-slate-400 bg-slate-50 text-sm">
                  No GST document attached
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 mt-4">
          {showRejectInput ? (
            <div className="flex gap-2 w-full">
              <Input 
                placeholder="Reason for rejection (e.g. Blurry PAN image)..." 
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button variant="outline" onClick={() => setShowRejectInput(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleReject} disabled={loading === "reject"}>
                {loading === "reject" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Confirm Reject"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end gap-3 w-full">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setShowRejectInput(true)}>
                Reject KYC
              </Button>
              <Button onClick={handleApprove} disabled={loading === "approve"} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {loading === "approve" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <><CheckCircle2 className="w-4 h-4 mr-2" /> Approve & Verify</>}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
