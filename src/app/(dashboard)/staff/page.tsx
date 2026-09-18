import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ClipboardList, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default async function StaffDashboard() {
  const session = await auth()
  
  if (!session?.user || (session.user.role !== "STAFF" && session.user.role !== "ADMIN")) {
    redirect("/login")
  }

  const userName = session.user.name?.split(' ')[0] || "User"
  
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  // Dynamic greeting based on IST
  const istTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
  const currentHour = istTime.getHours();
  let greeting = "Good evening";
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 17) {
    greeting = "Good afternoon";
  }

  // Fetch real data for the staff member
  const workRequests = await prisma.workRequest.findMany({
    where: { assignedStaffId: session.user.id },
    include: { 
      client: { 
        include: { 
          user: { select: { id: true, name: true } } 
        } 
      } 
    },
    orderBy: { createdAt: "desc" }
  })

  const assignedCount = workRequests.length
  const completedCount = workRequests.filter(wr => wr.status === "COMPLETED").length
  const inProgressCount = workRequests.filter(wr => wr.status === "IN_PROGRESS").length
  const overdueCount = workRequests.filter(wr => wr.dueDate && new Date(wr.dueDate) < new Date() && wr.status !== "COMPLETED").length

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "HIGH": return "text-red-600 bg-red-50 border-red-100"
      case "MEDIUM": return "text-blue-600 bg-blue-50 border-blue-100"
      case "LOW": return "text-emerald-600 bg-emerald-50 border-emerald-100"
      default: return "text-slate-500 bg-slate-50 border-slate-200"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 pb-10">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{greeting}, {userName}! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Here is your real-time work overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50/80 px-3 py-1.5 rounded-full font-medium border border-blue-100/50 shadow-sm">
          <CalendarDays className="h-4 w-4" />
          {currentDate}
        </div>
      </div>

      {/* Cards Area */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Assigned to Me</span>
              <span className="text-3xl font-bold text-slate-900">{assignedCount}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">In Progress</span>
              <span className="text-3xl font-bold text-slate-900">{inProgressCount}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Overdue</span>
              <span className="text-3xl font-bold text-slate-900">{overdueCount}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Completed</span>
              <span className="text-3xl font-bold text-slate-900">{completedCount}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3 shadow-sm border-slate-200/60">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-[15px] font-semibold text-slate-800">My Assigned Work</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase pl-6 py-4">Work</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Client</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Status</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Priority</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4 text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-500">You have no active assigned requests.</TableCell>
                  </TableRow>
                )}
                {workRequests.map((wr) => (
                  <TableRow key={wr.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6 py-4 font-medium text-slate-900">{wr.title}</TableCell>
                    <TableCell className="py-4 text-slate-600">{wr.client.companyName || wr.client.user.name}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">{wr.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={`${getPriorityStyle(wr.priority)} px-2 py-0.5 font-medium`}>{wr.priority}</Badge>
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-right">
                      <Link href={`/staff/requests/${wr.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage &rarr;</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
