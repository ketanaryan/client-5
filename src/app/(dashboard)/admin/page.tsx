"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { CalendarDays, Briefcase, Users, FileText, IndianRupee } from "lucide-react"

const PIE_DATA = [
  { name: 'In Progress', value: 30, color: '#3b82f6' }, // blue-500
  { name: 'Awaiting Client', value: 10, color: '#f59e0b' }, // amber-500
  { name: 'For Review', value: 8, color: '#8b5cf6' }, // violet-500
  { name: 'Completed', value: 52, color: '#10b981' }, // emerald-500
]

const BAR_DATA = [
  { name: 'Rahul', tasks: 12 },
  { name: 'Priya', tasks: 8 },
  { name: 'Neha', tasks: 15 },
]

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="flex flex-1 flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admin Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Here is the high-level summary of the practice.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50/80 px-3 py-1.5 rounded-full font-medium border border-blue-100/50 shadow-sm">
          <CalendarDays className="h-4 w-4" />
          {currentDate}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-medium text-slate-500">Open Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">12</div>
          </CardContent>
          <div className="absolute right-4 top-5 p-2 bg-blue-50 rounded-lg"><Briefcase className="h-5 w-5 text-blue-500"/></div>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-medium text-slate-500">Awaiting Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">4</div>
          </CardContent>
          <div className="absolute right-4 top-5 p-2 bg-amber-50 rounded-lg"><Users className="h-5 w-5 text-amber-500"/></div>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-medium text-slate-500">For Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">3</div>
          </CardContent>
          <div className="absolute right-4 top-5 p-2 bg-violet-50 rounded-lg"><FileText className="h-5 w-5 text-violet-500"/></div>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-medium text-slate-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">25</div>
          </CardContent>
          <div className="absolute right-4 top-5 p-2 bg-emerald-50 rounded-lg"><Briefcase className="h-5 w-5 text-emerald-500"/></div>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-medium text-slate-500">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 tracking-tight">₹1.25L</div>
          </CardContent>
          <div className="absolute right-4 top-5 p-2 bg-red-50 rounded-lg"><IndianRupee className="h-5 w-5 text-red-500"/></div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm border-slate-200/60">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Recent Work Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">ID</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Client</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Work Type</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-slate-50/40 border-slate-100">
                  <TableCell className="font-medium text-blue-600 text-sm">WR-1024</TableCell>
                  <TableCell className="text-sm font-medium text-slate-700">ABC Pvt Ltd</TableCell>
                  <TableCell className="text-sm text-slate-500">GST Return - Q2</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-md border-0">In Progress</Badge>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-slate-50/40 border-slate-100">
                  <TableCell className="font-medium text-blue-600 text-sm">WR-1023</TableCell>
                  <TableCell className="text-sm font-medium text-slate-700">XYZ Corp</TableCell>
                  <TableCell className="text-sm text-slate-500">ITR Filing</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium rounded-md border-0">Awaiting Client</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 shadow-sm border-slate-200/60 flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Work Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center p-6">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={PIE_DATA} innerRadius={65} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                    {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-slate-800">100</span>
                <span className="text-xs text-slate-500 font-medium">Total</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              {PIE_DATA.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[13px] text-slate-600 font-medium flex-1">{item.name}</span>
                  <span className="text-[13px] font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm border-slate-200/60">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Workload by Staff</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] p-6 pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={10} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="tasks" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm border-slate-200/60">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Today's Activity Feed</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              <div className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                <div className="rounded-full bg-blue-100 h-9 w-9 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">SH</div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-slate-700 leading-snug"><span className="font-semibold text-slate-900">Shantanu</span> generated Invoice for <span className="font-medium text-blue-600">WR-1024</span></p>
                  <p className="text-xs text-slate-400">10 mins ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                <div className="rounded-full bg-emerald-100 h-9 w-9 flex items-center justify-center text-emerald-700 font-bold text-xs flex-shrink-0">RS</div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-slate-700 leading-snug"><span className="font-semibold text-slate-900">Rahul</span> updated status for <span className="font-medium text-slate-900">GST Return</span></p>
                  <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-2">
        <Card className="shadow-sm border-slate-200/60">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">New Leads / Enquiries</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Name</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Service</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Message</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-slate-50/40 border-slate-100">
                  <TableCell className="font-medium text-slate-900 text-[14px]">John Doe</TableCell>
                  <TableCell className="text-[14px] text-slate-600">Audit & Assurance</TableCell>
                  <TableCell className="text-[13px] text-slate-500 max-w-[250px] truncate">We are looking for a complete audit of our financial statements...</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium rounded-md border-0">New</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="mr-2 h-8 text-xs border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50">Contacted</Button>
                    <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-none">Convert to Client</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
