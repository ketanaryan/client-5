import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, BellRing, AlertCircle, Clock } from "lucide-react"
import { CreateReminderDialog } from "@/components/reminders/CreateReminderDialog"

export default async function RemindersPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const reminders = await prisma.reminder.findMany({
    orderBy: { dueDate: 'asc' },
    where: { isCompleted: false }
  })

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Compliance Reminders</h2>
          <p className="text-sm text-slate-500 mt-1">Automated statutory deadlines, GST filings, and client follow-ups.</p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateReminderDialog />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reminders.length === 0 ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-500 bg-white rounded-xl border border-slate-200/60 shadow-sm">
            <BellRing className="h-10 w-10 text-slate-300 mb-3" />
            <p>No active reminders found.</p>
          </div>
        ) : (
          reminders.map((reminder) => {
            const isUrgent = new Date(reminder.dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 // Less than 3 days
            
            return (
              <Card key={reminder.id} className={`rounded-xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-4 ${isUrgent ? 'border-t-red-500 border-slate-200/60' : 'border-t-blue-500 border-slate-200/60'}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {reminder.title}
                  </CardTitle>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isUrgent ? 'bg-red-50' : 'bg-blue-50'}`}>
                    {isUrgent ? (
                      <AlertCircle className={`h-4 w-4 stroke-[2.5] text-red-600`} />
                    ) : (
                      <CalendarDays className={`h-4 w-4 stroke-[2.5] text-blue-600`} />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-semibold text-slate-900">{reminder.targetCount} Clients</div>
                  <p className={`text-sm font-medium mt-1 flex items-center ${isUrgent ? 'text-red-600' : 'text-slate-500'}`}>
                    Due {new Date(reminder.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  {reminder.description && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{reminder.description}</p>
                  )}
                  <Button className={`w-full mt-6 shadow-sm font-medium ${isUrgent ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {isUrgent ? 'Send Bulk SMS Reminder' : 'Schedule Notification'}
                  </Button>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

