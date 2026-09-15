"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function StaffDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Assigned to Me</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Due Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">3</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Overdue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">2</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">15</div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader><CardTitle>My Work Queue</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>WR-1024</TableCell>
                  <TableCell>ABC Pvt Ltd</TableCell>
                  <TableCell>GST Return - Q2</TableCell>
                  <TableCell>Today</TableCell>
                  <TableCell><Badge>In Progress</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>WR-1025</TableCell>
                  <TableCell>Global Tech</TableCell>
                  <TableCell>Audit Prep</TableCell>
                  <TableCell className="text-red-600">Yesterday</TableCell>
                  <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader><CardTitle>Need Info from Client?</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Request missing documents or clarifications directly from the client portal.</p>
              <Button className="w-full">Send Message / Request Docs</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Task Reminders</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Follow up on WR-1025 docs</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Submit timesheet</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
