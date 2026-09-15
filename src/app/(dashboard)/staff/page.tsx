"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { CalendarDays, ClipboardList, AlertCircle, CheckCircle2 } from "lucide-react"
import { useSession } from "next-auth/react"

const PIE_DATA = [
  { name: 'In Progress', value: 1, color: '#3b82f6' },
  { name: 'Completed', value: 1, color: '#10b981' },
]

export default function StaffDashboard() {
  const { data: session } = useSession()
  const userName = session?.user?.name?.split(' ')[0] || "User"
  
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Good morning, {userName}! 👋</h2>
          <p className="text-muted-foreground text-sm mt-1">Here's your work overview for today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium">
          <CalendarDays className="h-4 w-4" />
          {currentDate}
        </div>
      </div>

      {/* Cards Area */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-500">Assigned to Me</span>
              <span className="text-3xl font-bold text-slate-900">2</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-500">Due Today</span>
              <span className="text-3xl font-bold text-slate-900">0</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-500">Overdue</span>
              <span className="text-3xl font-bold text-slate-900">0</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-500">Completed</span>
              <span className="text-3xl font-bold text-slate-900">1</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Area */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-white">
          <CardTitle className="text-lg font-semibold text-slate-900">My Work</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-medium text-slate-500">ID</TableHead>
                <TableHead className="font-medium text-slate-500">Client / Associate</TableHead>
                <TableHead className="font-medium text-slate-500">Work</TableHead>
                <TableHead className="font-medium text-slate-500">Due Date</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="font-medium text-slate-500">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-blue-600">WR-1024</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-900 font-medium">ABC Pvt Ltd</span>
                    <span className="text-xs text-slate-500">TaxPro Consultants</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">GST Return - Aug 2026</TableCell>
                <TableCell className="text-slate-600">05 Sep 2026</TableCell>
                <TableCell><Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-medium rounded-md">In Progress</Badge></TableCell>
                <TableCell><span className="text-red-500 bg-red-50 px-2 py-1 rounded-md text-xs font-semibold">High</span></TableCell>
              </TableRow>
              <TableRow className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-blue-600">WR-1022</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-900 font-medium">Mr. Raj Kumar</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">ITR - AY 2026-27</TableCell>
                <TableCell className="text-slate-600">31 Aug 2026</TableCell>
                <TableCell><Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-medium rounded-md">Completed</Badge></TableCell>
                <TableCell><span className="text-red-500 bg-red-50 px-2 py-1 rounded-md text-xs font-semibold">High</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Work Progress Donut */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-white">
            <CardTitle className="text-lg font-semibold text-slate-900">Work Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="h-[200px] w-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col gap-4 flex-1 pl-8">
              {PIE_DATA.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600 font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Reminders */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-white">
            <CardTitle className="text-lg font-semibold text-slate-900">Task Reminders</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between bg-slate-50/80 border border-slate-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">GST Return - Aug 2026</span>
                  <span className="text-xs text-slate-500 mt-0.5">WR-1024 - ABC Pvt Ltd</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 font-medium border-0">Upcoming</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
