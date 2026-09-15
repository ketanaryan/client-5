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
import { Plus, MoreHorizontal, Mail, Phone } from "lucide-react"
import { CreateStaffDialog } from "@/components/staff/CreateStaffDialog"

export default async function StaffPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const staff = await prisma.user.findMany({
    where: { role: "STAFF" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { activityLogs: true }
      }
    }
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Staff Directory</h2>
          <p className="text-slate-500">Manage your internal team members and access.</p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateStaffDialog roleType="STAFF" />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Activity Log</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium text-slate-900">
                  {member.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> {member.email}</span>
                    {member.phone && <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> {member.phone}</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={member.isActive ? "default" : "secondary"} className={member.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                    {member.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">
                  {member._count.activityLogs} actions recorded
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {staff.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                  No staff members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
