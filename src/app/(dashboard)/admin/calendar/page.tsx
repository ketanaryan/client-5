import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function CalendarPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const workRequests = await prisma.workRequest.findMany({
    where: { dueDate: { not: null } },
    select: { id: true, title: true, dueDate: true, priority: true }
  })

  // Group by day for simple current month view
  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  
  const deadlinesByDay: Record<number, any[]> = {}
  workRequests.forEach(wr => {
    if (wr.dueDate) {
      const d = new Date(wr.dueDate)
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        const day = d.getDate()
        if (!deadlinesByDay[day]) deadlinesByDay[day] = []
        deadlinesByDay[day].push(wr)
      }
    }
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Firm Deadlines</h2>
          <p className="text-slate-500">Track all upcoming work request due dates.</p>
        </div>
      </div>

      <Card className="min-h-[500px] border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b text-center text-sm font-semibold bg-slate-50 text-slate-600 rounded-t-xl">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-4 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 min-h-[600px] bg-slate-50/30">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i + 1
              const hasItems = day <= daysInMonth && deadlinesByDay[day]
              return (
                <div key={i} className="border-r border-b p-3 min-h-[120px] bg-white transition-colors hover:bg-slate-50/50">
                  <span className={`text-sm font-medium ${day === now.getDate() ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center" : "text-slate-400"}`}>
                    {day <= daysInMonth ? day : ""}
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {hasItems && deadlinesByDay[day].map(item => (
                      <div key={item.id} className={`text-[10px] p-1.5 rounded font-medium border truncate ${
                        item.priority === "HIGH" ? "bg-red-50 text-red-700 border-red-200" :
                        item.priority === "MEDIUM" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}>
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
