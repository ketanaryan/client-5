import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userRole = session.user.role as "ADMIN" | "STAFF" | "CLIENT" | "ASSOCIATE"
  const userName = session.user.name || "User"


  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0 bg-white">
        <Sidebar role={userRole} userName={userName} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#f8fafc]">
        <Header role={userRole} />
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
