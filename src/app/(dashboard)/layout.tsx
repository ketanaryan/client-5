import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Suspense } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect("/login")
  if (user.isFirstLogin) redirect("/setup-password")
  
  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10
  })
  
  const userRole = session.user.role as "ADMIN" | "STAFF" | "CLIENT" | "ASSOCIATE"
  const userName = session.user.name || "User"
  const userImage = user?.image || null


  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#EBF1F8]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0 bg-[#0B1425]">
        <Suspense fallback={<div className="w-64 h-full bg-[#0B1425] border-r border-[#15233A]"></div>}>
          <Sidebar role={userRole} userName={userName} userImage={userImage} />
        </Suspense>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#EBF1F8]">
        <Header role={userRole} userName={userName} userImage={userImage} notifications={notifications} />
        
        {/* Scrollable page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
