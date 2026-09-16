import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, Smartphone, Key, Shield, Monitor } from "lucide-react"
import { prisma } from "@/lib/prisma"
import ProfileForm from "./ProfileForm"

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

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfileForm user={user} />
        </div>
        
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
              <Button variant="outline" className="w-full justify-start text-slate-700 bg-white border-slate-200">
                <Key className="mr-3 h-4 w-4 text-slate-400" /> Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-slate-700 bg-white border-slate-200">
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
                    <p className="font-medium text-slate-900 text-sm">Windows PC - Chrome</p>
                    <p className="text-slate-500 text-xs mt-0.5">Bangalore, India • Current</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm">Active</Badge>
              </div>
              <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 text-sm h-9">
                Sign out of all devices
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
