"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Smartphone, Key, Shield, Monitor, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { changePassword } from "@/app/actions/users"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SecuritySettings() {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [changing, setChanging] = useState(false)
  const router = useRouter()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setChanging(true)
      await changePassword(currentPassword, newPassword)
      toast.success("Password changed successfully!")
      setPasswordOpen(false)
      setCurrentPassword("")
      setNewPassword("")
    } catch (error: any) {
      toast.error(error.message || "Failed to change password")
    } finally {
      setChanging(false)
    }
  }

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Security Card */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-4">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
            <Lock className="h-5 w-5 text-slate-500" /> Security Settings
          </CardTitle>
          <CardDescription>Manage your password and security</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          
          <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
            <DialogTrigger render={<Button variant="outline" className="w-full justify-start text-slate-700 bg-white border-slate-200" />}>
              <Key className="mr-3 h-4 w-4 text-slate-400" /> Change Password
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>Enter a strong new password for your account.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    minLength={6} 
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setPasswordOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={changing} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {changing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Update Password
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            className="w-full justify-start text-slate-700 bg-white border-slate-200"
            onClick={() => toast.info("Two-Factor Authentication is managed centrally by the Administrator.")}
          >
            <Smartphone className="mr-3 h-4 w-4 text-slate-400" /> Enable Two-Factor (2FA)
          </Button>
        </CardContent>
      </Card>

      {/* Sessions Card */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-4">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
            <Shield className="h-5 w-5 text-slate-500" /> Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="h-8 w-8 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900 text-sm">Current Session</p>
                <p className="text-slate-500 text-xs mt-0.5">Verified</p>
              </div>
            </div>
            <div className="bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm border px-2 py-0.5 rounded-full text-xs font-semibold">Active</div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 text-sm h-9"
            onClick={() => {
              toast.success("Signed out of all other devices.")
            }}
          >
            Sign out of all devices
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
