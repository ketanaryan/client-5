import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, IndianRupee, FileText, ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

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

  // Aggregate invoices for revenue efficiently
  const revenueResult = await prisma.invoice.aggregate({
    where: { status: "PAID" },
    _sum: { amount: true }
  })
  const totalRevenue = revenueResult._sum.amount || 0

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your practice today.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Total Clients</p>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex items-baseline space-x-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{totalClients}</h2>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Active Requests</p>
              <FileText className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex items-baseline space-x-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{activeRequests}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Staff Members</p>
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline space-x-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{totalStaff}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Collected Revenue</p>
              <IndianRupee className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex items-baseline space-x-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">₹{totalRevenue.toLocaleString("en-IN")}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 py-5 px-6">
            <CardTitle className="text-base font-semibold text-slate-900">Recent Work Requests</CardTitle>
            <Link href="/admin/work-requests" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-100">
                  <TableHead className="font-medium text-slate-500 text-xs h-11 pl-6">Work</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs h-11">Client</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs h-11">Assigned To</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs h-11">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-500 text-sm">No recent requests.</TableCell>
                  </TableRow>
                )}
                {recentRequests.map((wr) => (
                  <TableRow key={wr.id} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                    <TableCell className="pl-6 py-4 font-medium text-slate-900 text-sm">{wr.title}</TableCell>
                    <TableCell className="py-4 text-slate-600 text-sm">{wr.client.companyName || wr.client.user.name}</TableCell>
                    <TableCell className="py-4 text-slate-600 text-sm">{(staffMap.get(wr.assignedStaffId || "") || "Unassigned")}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200/80 border-0 shadow-none font-medium text-xs rounded-md px-2 py-0.5">{wr.status.replace("_", " ")}</Badge>
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




