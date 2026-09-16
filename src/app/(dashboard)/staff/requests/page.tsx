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
import Link from "next/link"

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  AWAITING_CLIENT: {
    label: "Awaiting Client",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  FOR_REVIEW: {
    label: "For Review",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
}

const priorityConfig: Record<string, { label: string; className: string }> = {
  HIGH: {
    label: "High",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  LOW: {
    label: "Low",
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "—"
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default async function StaffRequestsPage() {
  const session = await auth()
  if (
    !session?.user ||
    (session.user.role !== "STAFF" && session.user.role !== "ADMIN")
  ) {
    redirect("/login")
  }

  const workRequests = await prisma.workRequest.findMany({ where: { assignedStaffId: session.user.id }, orderBy: { createdAt: "desc" }, include: { client: { include: { user: true } } } })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          All Work Requests
        </h2>
        <p className="text-slate-500">
          Browse all active requests across the firm.
        </p>
      </div>

      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Fee Amount</TableHead>`n                <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workRequests.map((wr) => {
              const status = statusConfig[wr.status] ?? {
                label: wr.status,
                className: "bg-slate-50 text-slate-600 border-slate-200",
              }
              const priority = priorityConfig[wr.priority] ?? {
                label: wr.priority,
                className: "bg-slate-50 text-slate-600 border-slate-200",
              }

              return (
                <TableRow key={wr.id} className="hover:bg-slate-50">
                  <TableCell>
                    <p className="font-medium text-slate-900">{wr.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatDate(wr.createdAt)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-slate-900">
                      {wr.client.user.name ?? "—"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {wr.client.companyName ?? "—"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${status.className} border-0 shadow-none font-medium px-2 py-0.5`}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${priority.className} font-medium px-2 py-0.5 shadow-none`}
                    >
                      {priority.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {wr.dueDate ? formatDate(wr.dueDate) : "—"}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium text-slate-700">
                    {formatCurrency(wr.feeAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/staff/requests/${wr.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details &rarr;
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
            {workRequests.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-slate-500"
                >
                  No work requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}




