"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Shield, Save, Camera, Loader2 } from "lucide-react"
import { updateUserAvatar, updateUserProfile } from "@/app/actions/users"
import Image from "next/image"
import { toast } from "sonner"

export default function ProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState(user.name || "")
  const [avatar, setAvatar] = useState<string | null>(user.image || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64String = event.target?.result as string
      setAvatar(base64String)
      setLoading(true)
      try {
        await updateUserAvatar(base64String)
        toast.success("Avatar updated successfully!")
      } catch (error) {
        console.error(error)
        toast.error("Failed to update avatar")
      }
      setLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await updateUserProfile(name)
      toast.success("Profile saved successfully!")
    } catch (error) {
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="h-16 w-16 rounded-xl bg-blue-100 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden transition-all relative">
              {avatar ? (
                <Image src={avatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <User className="h-7 w-7 text-blue-700" />
              )}
              
              <div 
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {loading ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Camera className="h-5 w-5 text-white" />}
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          <div>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription className="mt-1">
              Click on your picture to upload a new one.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="max-w-md bg-slate-50 focus:bg-white transition-colors" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
          <div className="relative max-w-md">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="email" defaultValue={user.email} disabled className="pl-9 bg-slate-100 cursor-not-allowed" />
          </div>
          <p className="text-xs text-slate-500">Email cannot be changed.</p>
        </div>
        <div className="space-y-3">
          <Label htmlFor="role" className="text-slate-700 font-semibold">Account Role</Label>
          <div className="relative max-w-md">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="role" defaultValue={user.role} disabled className="pl-9 bg-slate-100 cursor-not-allowed font-medium" />
          </div>
        </div>
        <div className="pt-2 border-t border-slate-100 mt-6">
          <Button onClick={handleSave} disabled={saving} className="mt-4 bg-[#032b4e] hover:bg-[#1c3a5e] text-white shadow-sm font-medium">
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} 
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
