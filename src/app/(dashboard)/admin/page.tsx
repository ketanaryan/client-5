import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, IndianRupee, FileText } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const [
    totalClients,
    totalStaff,
    activeRequests,
    recentRequests
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.user.count({ where: { role: "STAFF" } }),
    prisma.workRequest.count({ where: { status: { not: "COMPLETED" } } }),
        prisma.workRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: { include: { user: true } } }
    })
  ])

  // Fetch staff names for mapping
  const staffMembers = await prisma.user.findMany({ where: { role: "STAFF" }, select: { id: true, name: true } })
  const staffMap = new Map(staffMembers.map(s => [s.id, s.name]))

  // Aggregate invoices for revenue
  const invoices = await prisma.invoice.findMany({
    where: { status: "PAID" }
  })
  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0)

  return (
    <div className="flex flex-1 flex-col gap-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admin Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time overview of your practice.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-slate-200/60">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Total Clients</span>
              <span className="text-3xl font-bold text-slate-900">{totalClients}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200/60">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Active Requests</span>
              <span className="text-3xl font-bold text-slate-900">{activeRequests}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Staff Members</span>
              <span className="text-3xl font-bold text-slate-900">{totalStaff}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Collected Revenue</span>
              <span className="text-2xl font-bold text-slate-900">?{totalRevenue.toLocaleString("en-IN")}</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-sm border-slate-200/60">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Recent Work Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase pl-6 py-4">Work</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Client</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Assigned To</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-500">No recent requests.</TableCell>
                  </TableRow>
                )}
                {recentRequests.map((wr) => (
                  <TableRow key={wr.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6 py-4 font-medium text-slate-900">{wr.title}</TableCell>
                    <TableCell className="py-4 text-slate-600">{wr.client.companyName || wr.client.user.name}</TableCell>
                    <TableCell className="py-4 text-slate-600">{(staffMap.get(wr.assignedStaffId) || "Unassigned")}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">{wr.status.replace("_", " ")}</Badge>
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


