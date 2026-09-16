import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Shield, Save } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) redirect("/login")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h2>
          <p className="text-slate-500 mt-1">Manage your personal account settings.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription className="mt-1">
                  Your basic account details.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
              <Input id="name" defaultValue={user.name || ""} className="max-w-md bg-slate-50 focus:bg-white transition-colors" />
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
              <Button className="mt-4 bg-[#032b4e] hover:bg-[#1c3a5e] text-white shadow-sm font-medium">
                <Save className="h-4 w-4 mr-2" /> Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
