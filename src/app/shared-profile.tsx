import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ProfileForm from "./ProfileForm"
import SecuritySettings from "./SecuritySettings"

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
        
        <SecuritySettings />
      </div>
    </div>
  )
}
