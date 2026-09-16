"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { convertEnquiryToClient } from "@/app/actions/enquiry"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export function ProvisionClientButton({ enquiryId, status }: { enquiryId: string, status: string }) {
  const [loading, setLoading] = useState(false)

  if (status === "CONVERTED") {
    return (
      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium px-3 py-1">
        Portal Active
      </Badge>
    )
  }

  const handleProvision = async () => {
    setLoading(true)
    const result = await convertEnquiryToClient(enquiryId)
    setLoading(false)
    
    if (result.success) {
      toast.success("Secure Client Portal Provisioned", {
        description: "Credentials emailed to client.",
        className: "bg-emerald-50 text-emerald-900 border-emerald-200"
      })
    } else {
      toast.error("Failed to provision portal", {
        description: result.error
      })
    }
  }

  return (
    <Button 
      onClick={handleProvision} 
      disabled={loading}
      className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-medium"
      size="sm"
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Provision Portal
    </Button>
  )
}
