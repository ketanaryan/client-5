"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { verifyPayment } from "@/app/actions/payments"
import { toast } from "sonner"

export function VerifyPaymentButton({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState(false)

  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 h-7 text-xs px-2"
      disabled={loading}
      onClick={async () => {
        try {
          setLoading(true)
          await verifyPayment(paymentId)
          toast.success("Payment verified and invoice marked as PAID")
        } catch (e) {
          toast.error("Failed to verify payment")
        } finally {
          setLoading(false)
        }
      }}
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <CheckCircle2 className="h-3 w-3 mr-1" />}
      Verify
    </Button>
  )
}
