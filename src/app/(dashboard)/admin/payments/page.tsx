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
import { Plus, IndianRupee, CreditCard, Hash } from "lucide-react"
import { format } from "date-fns"
import { RecordPaymentDialog } from "@/components/payments/RecordPaymentDialog"
import { getUnpaidInvoices } from "@/app/actions/payments"

export default async function PaymentsPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      invoice: {
        include: {
          workRequest: {
            include: {
              client: { include: { user: true } }
            }
          }
        }
      }
    }
  })

  const unpaidInvoices = await getUnpaidInvoices()

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Payments Ledger</h2>
          <p className="text-slate-500">Track all incoming payments, UTR numbers, and cash receipts.</p>
        </div>
        <div className="flex items-center space-x-2">
          <RecordPaymentDialog unpaidInvoices={unpaidInvoices} />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead>Payment ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Invoice Ref</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead>Method & UTR</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-emerald-600" />
                    PAY-{payment.id.slice(0, 8).toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium text-slate-900">
                    {payment.invoice.workRequest.client.companyName || payment.invoice.workRequest.client.user.name}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  INV-{payment.invoice.id.slice(0, 8).toUpperCase()}
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <CreditCard className="h-3 w-3" /> ONLINE
                    </div>
                    {payment.utrNumber && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                        <Hash className="h-3 w-3" /> {payment.utrNumber}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-slate-900">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  {(payment.status as string) === "VERIFIED" ? (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Verified
                    </Badge>
                  ) : payment.status === "PENDING" ? (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Verification Pending
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Failed</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                  No payments recorded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
