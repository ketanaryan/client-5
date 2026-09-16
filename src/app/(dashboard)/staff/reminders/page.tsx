import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, AlertTriangle, Clock, CheckCircle2 } from "lucide-react"

export default async function StaffRemindersPage() {
  const session = await auth()
  if (!session?.user || !["STAFF", "ADMIN"].includes(session.user.role as string)) redirect("/login")

  // Fetch work requests with upcoming due dates assigned to this staff member
  const urgentTasks = await prisma.workRequest.findMany({
    where: {
      assignedStaffId: session.user.id,
      status: { not: "COMPLETED" },
    },
    orderBy: { dueDate: "asc" },
    include: { client: { include: { user: true } } }
  })

  const now = new Date()
  const overdue = urgentTasks.filter(t => t.dueDate && new Date(t.dueDate) < now)
  const dueSoon = urgentTasks.filter(t => {
    if (!t.dueDate) return false
    const due = new Date(t.dueDate)
    const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    return due >= now && due <= threeDays
  })
  const upcoming = urgentTasks.filter(t => {
    if (!t.dueDate) return false
    const due = new Date(t.dueDate)
    const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    return due > threeDays
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reminders</h2>
        <p className="text-slate-500 mt-1">Stay on top of your upcoming deadlines and pending actions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-red-200 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">{overdue.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-amber-700 flex items-center gap-2">
              <Clock className="h-4 w-4" /> Due in 3 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-700">{dueSoon.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-700">{upcoming.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase pl-6">Priority</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase">Task</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase">Client</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase">Status</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase pr-6">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urgentTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                  No active reminders. All caught up!
                </TableCell>
              </TableRow>
            ) : (
              urgentTasks.map(task => {
                const isOverdue = task.dueDate && new Date(task.dueDate) < now
                return (
                  <TableRow key={task.id} className={isOverdue ? "bg-red-50/50" : ""}>
                    <TableCell className="pl-6">
                      <Badge className={
                        task.priority === "HIGH" ? "bg-red-100 text-red-700 border-none" :
                        task.priority === "MEDIUM" ? "bg-amber-100 text-amber-700 border-none" :
                        "bg-slate-100 text-slate-600 border-none"
                      }>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{task.title}</TableCell>
                    <TableCell className="text-slate-600">{task.client.user.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-slate-200">
                        {task.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <span className={`text-sm font-medium ${isOverdue ? "text-red-600" : "text-slate-600"}`}>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "No date"}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
