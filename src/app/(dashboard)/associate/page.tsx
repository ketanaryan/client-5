"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, CheckCircle2, IndianRupee } from "lucide-react"

export default function AssociateDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-8 pb-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Associate Portal</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your clients and service requests.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">My Clients</span>
              <span className="text-3xl font-bold text-slate-900">5</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Active Requests</span>
              <span className="text-3xl font-bold text-slate-900">6</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Completed</span>
              <span className="text-3xl font-bold text-slate-900">18</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Outstanding Fees</span>
              <span className="text-2xl font-bold text-red-600 tracking-tight">₹40,000</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IndianRupee className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 shadow-sm border-slate-200/60 flex flex-col h-full">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Raise New Work for Client</CardTitle>
            <CardDescription className="text-[13px]">Request our team to start work on behalf of your client.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-700">Select Client</label>
                <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow bg-white text-slate-900">
                  <option>Tech Innovators LLP</option>
                  <option>Alpha Trading Co</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-700">Service Type</label>
                <select className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow bg-white text-slate-900">
                  <option>ROC Compliance</option>
                  <option>GST Filing</option>
                  <option>Income Tax Return</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-700">Description / Notes</label>
                <textarea className="w-full p-3 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow bg-white text-slate-900 resize-none" rows={4} placeholder="Any specific requirements..."></textarea>
              </div>
            </div>
            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-[14px] font-medium shadow-sm mt-4">Submit Request</Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3 shadow-sm border-slate-200/60">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <CardTitle className="text-[15px] font-semibold text-slate-800">Recent Client Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Client</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Service</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-right font-medium text-slate-500 text-xs uppercase tracking-wider">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-slate-50/40 border-slate-100">
                  <TableCell className="font-medium text-slate-900 text-[14px]">Tech Innovators LLP</TableCell>
                  <TableCell className="text-[14px] text-slate-600">ROC Compliance</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-md border-0">In Progress</Badge>
                  </TableCell>
                  <TableCell className="text-right"><Button variant="outline" size="sm" className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 text-slate-700">View Status</Button></TableCell>
                </TableRow>
                <TableRow className="hover:bg-slate-50/40 border-slate-100">
                  <TableCell className="font-medium text-slate-900 text-[14px]">Alpha Trading Co</TableCell>
                  <TableCell className="text-[14px] text-slate-600">Audit FY 24-25</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium rounded-md border-0">Awaiting Client</Badge>
                  </TableCell>
                  <TableCell className="text-right"><Button variant="outline" size="sm" className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 text-slate-700">View Status</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
