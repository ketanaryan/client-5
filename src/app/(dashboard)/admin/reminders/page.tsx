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

export default async function RemindersPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Compliance Reminders</h2>
          <p className="text-slate-500 mt-1">Automated statutory deadlines, GST filings, and client follow-ups.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm h-10">
            <BellRing className="mr-2 h-4 w-4" /> Create Custom Reminder
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Data Cards for UI */}
        <Card className="hover:shadow-md transition-all border-t-4 border-t-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              URGENT: GSTR-3B Filing
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-red-600 stroke-[2.5]" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-slate-900">12 Clients</div>
            <p className="text-sm font-semibold text-red-600 mt-1 flex items-center">
              Due Tomorrow
            </p>
            <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white shadow-sm font-semibold">Send Bulk SMS Reminder</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all border-t-4 border-t-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              ITR Corporate
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600 stroke-[2.5]" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-slate-900">45 Clients</div>
            <p className="text-sm font-medium text-amber-600 mt-1">
              Due in 15 days
            </p>
            <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold shadow-sm">Schedule Email Blast</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all border-t-4 border-t-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              TDS Returns
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <CalendarDays className="h-4 w-4 text-blue-600 stroke-[2.5]" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-slate-900">28 Clients</div>
            <p className="text-sm font-medium text-blue-600 mt-1">
              Due Next Month
            </p>
            <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold shadow-sm">Review Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
