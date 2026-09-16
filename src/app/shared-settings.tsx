import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bell, Shield } from "lucide-react"

export default async function UserSettingsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Account Settings</h2>
          <p className="text-slate-500 mt-1">Manage your account preferences and notifications.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription className="mt-1">
                  Manage how you receive updates.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <p className="text-sm text-slate-600">Your email notifications are currently enabled by default. Contact the admin to change these settings.</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <CardTitle className="text-lg">Security & Access</CardTitle>
                <CardDescription className="mt-1">
                  Your current account permissions.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
             <p className="text-sm text-slate-600">Your account operates under the <strong>{session.user.role}</strong> role. You have access to assigned workspace areas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
