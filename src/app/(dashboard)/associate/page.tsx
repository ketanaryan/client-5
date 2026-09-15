"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AssociateDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Associate Portal</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">My Clients</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Requests</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">6</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">18</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">₹40,000</div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Raise New Work for Client</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Client</label>
              <select className="w-full p-2 border rounded-md"><option>Tech Innovators LLP</option></select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <select className="w-full p-2 border rounded-md"><option>ROC Compliance</option><option>GST Filing</option></select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea className="w-full p-2 border rounded-md" rows={3}></textarea>
            </div>
            <Button className="w-full">Submit Request</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Recent Client Requests</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Tech Innovators</TableCell>
                  <TableCell>ROC Compliance</TableCell>
                  <TableCell><Badge>In Progress</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alpha Trading</TableCell>
                  <TableCell>Audit</TableCell>
                  <TableCell><Badge variant="outline">Awaiting Client</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
