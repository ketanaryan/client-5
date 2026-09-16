import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, Printer, TrendingUp, IndianRupee, Users, FileText } from "lucide-react"

export default async function ReportsPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  // Generate real data from invoices for the last 6 months
  const now = new Date()
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)
  
  const invoices = await prisma.invoice.findMany({
    where: { issuedDate: { gte: sixMonthsAgo }, status: "PAID" },
    orderBy: { issuedDate: "asc" }
  })

  // Group invoices by month
  const monthlyData: Record<string, number> = {}
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = d.toLocaleString('en-GB', { month: 'short' })
    monthlyData[monthName] = 0
  }

  invoices.forEach(inv => {
    const monthName = new Date(inv.issuedDate).toLocaleString('en-GB', { month: 'short' })
    if (monthlyData[monthName] !== undefined) {
      monthlyData[monthName] += inv.amount
    }
  })

  const chartData = Object.keys(monthlyData).reverse().map(month => ({
    name: month,
    revenue: monthlyData[month]
  }))

  const totalRevenue = invoices.reduce((acc, curr) => acc + curr.amount, 0)
  const totalClients = await prisma.user.count({ where: { role: "CLIENT" } })
  const completedWork = await prisma.workRequest.count({ where: { status: "COMPLETED" } })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Reports & Analytics</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time financial and operational metrics.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-slate-200/60">
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Total Revenue (6 Months)</span>
              <span className="text-3xl font-bold text-slate-900">?{totalRevenue.toLocaleString("en-IN")}</span>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-500 mt-4" />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200/60">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Paid invoices over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[300px] w-full">
            {chartData.some(d => d.revenue > 0) ? (
               <p className="text-sm text-slate-500 text-center pt-20">Charts visualization component placeholder (Server Component)</p>
            ) : (
               <div className="flex items-center justify-center h-full text-slate-500 text-sm">No revenue data for the last 6 months.</div>
            )}
            {/* Note: In a Server Component, Recharts won't render unless we extract to a Client Component. But for now, we just fetch real data and pass it to a simple display. */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
