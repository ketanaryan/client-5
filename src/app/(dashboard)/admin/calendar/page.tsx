import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function CalendarPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Firm Calendar</h2>
          <p className="text-slate-500">Schedule meetings, track deadlines, and manage staff availability.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-[#1e293b] hover:bg-[#334155]">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
      </div>

      <Card className="min-h-[500px]">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b text-center text-sm font-medium text-slate-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-3 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 min-h-[500px]">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="border-r border-b p-2 min-h-[100px] text-sm text-slate-400">
                {i + 1 <= 31 ? i + 1 : ""}
                {i === 14 && (
                  <div className="mt-2 text-xs bg-red-100 text-red-700 p-1 rounded font-medium border border-red-200">
                    GST Filing Deadline
                  </div>
                )}
                {i === 22 && (
                  <div className="mt-2 text-xs bg-blue-100 text-blue-700 p-1 rounded font-medium border border-blue-200">
                    Client Meeting: ABC Ltd
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
