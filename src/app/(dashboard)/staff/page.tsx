"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CalendarDays, ClipboardList, AlertCircle, CheckCircle2 } from "lucide-react"
import { useSession } from "next-auth/react"

const PIE_DATA = [
  { name: 'In Progress', value: 3, color: '#3b82f6' },
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
    <div className="flex flex-1 flex-col gap-8 pb-10">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Good morning, {userName}! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Here is your work overview for today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50/80 px-3 py-1.5 rounded-full font-medium border border-blue-100/50 shadow-sm">
          <CalendarDays className="h-4 w-4" />
          {currentDate}
        </div>
      </div>

      {/* Cards Area */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Assigned to Me</span>
              <span className="text-3xl font-bold text-slate-900">2</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Due Today</span>
              <span className="text-3xl font-bold text-slate-900">0</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Overdue</span>
              <span className="text-3xl font-bold text-slate-900">0</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Completed</span>
              <span className="text-3xl font-bold text-slate-900">1</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Area */}
      <Card className="shadow-sm border-slate-200/60">
        <CardHeader className="border-b border-slate-100 bg-slate-50/30">
          <CardTitle className="text-[15px] font-semibold text-slate-800">My Work</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">ID</TableHead>
                <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Client / Associate</TableHead>
                <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Work</TableHead>
                <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Due Date</TableHead>
                <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50/40 border-slate-100">
                <TableCell className="font-medium text-blue-600 text-sm">WR-1024</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-slate-900 font-medium">ABC Pvt Ltd</span>
                    <span className="text-xs text-slate-500">TaxPro Consultants</span>
                  </div>
                </TableCell>
                <TableCell className="text-[14px] text-slate-600">GST Return - Aug 2026</TableCell>
                <TableCell className="text-[14px] text-slate-600">05 Sep 2026</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-md border-0">In Progress</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider">High</span>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-slate-50/40 border-slate-100">
                <TableCell className="font-medium text-blue-600 text-sm">WR-1022</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-slate-900 font-medium">Mr. Raj Kumar</span>
                  </div>
                </TableCell>
                <TableCell className="text-[14px] text-slate-600">ITR - AY 2026-27</TableCell>
                <TableCell className="text-[14px] text-slate-600">31 Aug 2026</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium rounded-md border-0">Completed</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider">High</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Work Progress Donut */}
        <Card className="shadow-sm border-slate-200/60 flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Work Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="h-[200px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-slate-800">4</span>
                <span className="text-xs text-slate-500 font-medium">Tasks</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 w-full justify-center mt-2">
              {PIE_DATA.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[13px] text-slate-600 font-medium">{item.name}</span>
                  <span className="text-[13px] font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Reminders */}
        <Card className="shadow-sm border-slate-200/60">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Task Reminders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 p-2">
              <div className="flex items-center justify-between hover:bg-slate-50/80 rounded-xl p-4 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shadow-sm shadow-blue-500/50"></div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-slate-900 leading-snug">GST Return - Aug 2026</span>
                    <span className="text-[13px] text-slate-500">WR-1024 - ABC Pvt Ltd</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium border-0 px-3">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
