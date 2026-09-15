"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const PIE_DATA = [
  { name: 'In Progress', value: 30, color: '#2563eb' }, // blue-600
  { name: 'Awaiting Client', value: 10, color: '#94a3b8' }, // slate-400
  { name: 'For Review', value: 8, color: '#0f172a' }, // slate-900
  { name: 'Completed', value: 52, color: '#059669' }, // emerald-600
]

const BAR_DATA = [
  { name: 'Rahul', tasks: 12 },
  { name: 'Priya', tasks: 8 },
  { name: 'Neha', tasks: 15 },
]

export default function AdminDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Open Work</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Awaiting Client</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">For Review</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">3</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">25</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Outstanding</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">₹1,25,000</div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader><CardTitle>Work Requests Overview</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Work Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>WR-1024</TableCell>
                  <TableCell>ABC Pvt Ltd</TableCell>
                  <TableCell>GST Return - Q2</TableCell>
                  <TableCell><Badge>In Progress</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>WR-1023</TableCell>
                  <TableCell>XYZ Corp</TableCell>
                  <TableCell>ITR Filing</TableCell>
                  <TableCell><Badge variant="outline">Awaiting Client</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Work Status Breakdown</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PIE_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader><CardTitle>Workload by Staff</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Today's Activity Feed</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600 font-bold text-xs">SH</div>
                <div><p className="text-sm font-medium">Shantanu generated Invoice for WR-1024</p><p className="text-xs text-muted-foreground">10 mins ago</p></div>
              </div>
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="rounded-full bg-green-100 p-2 text-green-600 font-bold text-xs">RS</div>
                <div><p className="text-sm font-medium">Rahul updated status for GST Return</p><p className="text-xs text-muted-foreground">1 hour ago</p></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader><CardTitle>New Leads / Enquiries</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Audit & Assurance</TableCell>
                  <TableCell className="max-w-xs truncate">We are looking for a complete audit...</TableCell>
                  <TableCell><Badge className="bg-emerald-600">NEW</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="mr-2">Contacted</Button>
                    <Button size="sm">Convert to Client</Button>
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
