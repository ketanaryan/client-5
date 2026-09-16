import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, CheckCircle2, IndianRupee } from "lucide-react"

export default async function AssociateDashboard() {
  const session = await auth()
  if (!session?.user || (session.user.role !== "ASSOCIATE" && session.user.role !== "ADMIN")) {
    redirect("/login")
  }

  // Real data for associate
  // Assuming Associate profile links them to specific clients, but right now Associate has no relations in schema.
  // Actually, we don't have an Associate -> Client relation built into the schema yet. 
  // Let's just fetch WorkRequests where they might be related, or just a placeholder message for now.
  // Wait, looking at schema, ClientProfile doesn't link to Associate. 
  // Let's just give them 0s if there's no actual associate relation, or just generic data.
  // For safety, just 0s.
  
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
              <span className="text-3xl font-bold text-slate-900">0</span>
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
              <span className="text-3xl font-bold text-slate-900">0</span>
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
              <span className="text-3xl font-bold text-slate-900">0</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Total Earnings</span>
              <span className="text-3xl font-bold text-slate-900">?0</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IndianRupee className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200/60">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-[15px] font-semibold text-slate-800">My Clients' Requests</CardTitle>
          <CardDescription>Recent work requests from clients under your portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/30">
              <TableRow>
                <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase pl-6 py-4">Client</TableHead>
                <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Work</TableHead>
                <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-xs tracking-wider uppercase py-4 text-right pr-6">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-slate-500">No active clients assigned yet.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
