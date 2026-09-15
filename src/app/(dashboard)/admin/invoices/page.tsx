import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Download, Eye, FileText, CheckCircle2, Clock } from "lucide-react"
import { format } from "date-fns"

export default async function InvoicesPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const invoices = await prisma.invoice.findMany({
    orderBy: { issuedDate: "desc" },
    include: {
      workRequest: {
        include: {
          client: {
            include: { user: true }
          }
        }
      }
    }
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Invoices</h2>
          <p className="text-slate-500">Manage billing, track outstanding payments, and issue receipts.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-[#1e293b] hover:bg-[#334155]">
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date Issued</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    INV-{invoice.id.slice(0, 8).toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium text-slate-900">
                    {invoice.workRequest.client.companyName || invoice.workRequest.client.user.name}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-slate-600 max-w-[200px] truncate">
                  {invoice.workRequest.title}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {format(new Date(invoice.issuedDate), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900">
                  ₹{invoice.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  {invoice.status === "PAID" ? (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Paid
                    </Badge>
                  ) : invoice.status === "UNPAID" ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
                      <Clock className="h-3 w-3" /> Pending
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {invoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                  No invoices generated yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
