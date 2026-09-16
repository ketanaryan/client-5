import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react"

export default async function StaffCalendarPage() {
  const session = await auth()
  if (!session?.user || !["STAFF", "ADMIN"].includes(session.user.role as string)) redirect("/login")

  const workRequests = await prisma.workRequest.findMany({
    where: { assignedStaffId: session.user.id },
    orderBy: { dueDate: "asc" },
    include: { client: { include: { user: true } } }
  })

  const upcoming = workRequests.filter(wr => wr.dueDate && new Date(wr.dueDate) >= new Date())
  const overdue = workRequests.filter(wr => wr.dueDate && new Date(wr.dueDate) < new Date() && wr.status !== "COMPLETED")

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Calendar</h2>
        <p className="text-slate-500 mt-1">Your upcoming deadlines and scheduled work.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <Clock className="h-5 w-5 text-red-500" /> Overdue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdue.length === 0 ? (
              <p className="text-sm text-slate-500">No overdue tasks. Great job!</p>
            ) : (
              overdue.map(wr => (
                <div key={wr.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{wr.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{wr.client.user.name}</p>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-none text-xs">
                    {wr.dueDate ? new Date(wr.dueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "N/A"}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <CalendarDays className="h-5 w-5 text-blue-500" /> Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-slate-500">No upcoming deadlines.</p>
            ) : (
              upcoming.slice(0, 10).map(wr => (
                <div key={wr.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{wr.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{wr.client.user.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-slate-200">
                      {wr.status.replace("_", " ")}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 border-none text-xs">
                      {wr.dueDate ? new Date(wr.dueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "N/A"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
