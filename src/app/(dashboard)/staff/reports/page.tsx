import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, CheckCircle2, Clock, AlertCircle } from "lucide-react"

export default async function StaffReportsPage() {
  const session = await auth()

  if (!session?.user?.role || !["STAFF", "ADMIN"].includes(session.user.role)) {
    redirect("/")
  }

  const userId = session.user.id as string

  const [activityLogs, totalAssigned, completedCount, inProgressCount, pendingCount] =
    await Promise.all([
      prisma.activityLog.findMany({
        where: { userId },
        orderBy: { timestamp: "desc" },
      }),
      prisma.workRequest.count({
        where: { assignedStaffId: userId },
      }),
      prisma.workRequest.count({
        where: { assignedStaffId: userId, status: "COMPLETED" },
      }),
      prisma.workRequest.count({
        where: { assignedStaffId: userId, status: "IN_PROGRESS" },
      }),
      prisma.workRequest.count({
        where: { assignedStaffId: userId, status: "PENDING" },
      }),
    ])

  const summaryCards = [
    {
      title: "Total Assigned Tasks",
      value: totalAssigned,
      icon: ClipboardList,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "In Progress",
      value: inProgressCount,
      icon: Clock,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: AlertCircle,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My Reports
        </h1>
        <p className="text-slate-500 mt-1">
          View your activity history and work summary.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            className="shadow-sm border-slate-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {card.title}
              </CardTitle>
              <div className={`rounded-md p-2 ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Log */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activityLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardList className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-500">
                No activity recorded yet.
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead className="text-slate-500 font-medium">
                      Date/Time
                    </TableHead>
                    <TableHead className="text-slate-500 font-medium">
                      Action Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-slate-50/50">
                      <TableCell className="text-slate-600 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        <span className="text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {log.actionDescription}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
