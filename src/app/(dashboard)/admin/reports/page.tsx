import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { RevenueChart } from "@/components/reports/RevenueChart"

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Reports & Analytics</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time financial and operational metrics.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-xl border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-slate-500">Total Revenue (6 Months)</span>
              <span className="text-3xl font-semibold text-slate-900">₹{totalRevenue.toLocaleString("en-IN")}</span>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-500 mt-4" />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-slate-200/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl py-5 px-6">
          <CardTitle className="text-base font-semibold text-slate-900">Revenue Trend</CardTitle>
          <CardDescription>Paid invoices over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-6 pb-6">
          <div className="h-[300px] w-full">
            <RevenueChart data={chartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

