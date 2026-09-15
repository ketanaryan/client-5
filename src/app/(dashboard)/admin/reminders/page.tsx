import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, BellRing, AlertCircle, Clock } from "lucide-react"

export default async function RemindersPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Compliance Reminders</h2>
          <p className="text-slate-500">Automated statutory deadlines, GST filings, and client follow-ups.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-[#1e293b] hover:bg-[#334155]">
            <BellRing className="mr-2 h-4 w-4" /> Create Custom Reminder
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Data Cards for UI */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              URGENT: GSTR-3B Filing
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12 Clients</div>
            <p className="text-xs text-red-600 font-medium mt-1">
              Due Tomorrow
            </p>
            <Button size="sm" className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">Send Bulk SMS Reminder</Button>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">
              ITR Corporate
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">45 Clients</div>
            <p className="text-xs text-amber-600 font-medium mt-1">
              Due in 15 days
            </p>
            <Button variant="outline" size="sm" className="w-full mt-4 border-amber-300 text-amber-700 hover:bg-amber-100">Schedule Email Blast</Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              TDS Returns
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">28 Clients</div>
            <p className="text-xs text-blue-600 font-medium mt-1">
              Due Next Month
            </p>
            <Button variant="outline" size="sm" className="w-full mt-4 border-blue-300 text-blue-700 hover:bg-blue-100">Review Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
