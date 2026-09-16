"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setupFirstPassword } from "@/app/actions/setup"
import { ShieldCheck, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SetupPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const res = await setupFirstPassword(formData)
    
    if (res.success && res.redirectUrl) {
      toast.success("Account Secured", {
        description: "Your new private password has been saved."
      })
      router.push(res.redirectUrl)
    } else {
      setError(res.error || "An error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-[#032b4e] p-8 text-center text-white">
          <ShieldCheck className="h-12 w-12 mx-auto text-emerald-400 mb-4" />
          <h1 className="text-2xl font-bold tracking-tight">Secure Your Account</h1>
          <p className="text-blue-100 text-sm mt-2">
            For financial data compliance, you must set a new private password before accessing the vault.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">New Private Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              minLength={8}
              placeholder="Minimum 8 characters"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              required 
              minLength={8}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save & Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  )
}
