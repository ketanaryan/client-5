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
import { Plus, Users, Mail, Phone } from "lucide-react"
import { CreateStaffDialog } from "@/components/staff/CreateStaffDialog"

export default async function AssociatesPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const associates = await prisma.user.findMany({
    where: { role: "ASSOCIATE" },
    orderBy: { createdAt: "desc" },
    include: {
      associateProfile: true
    }
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Associate Network</h2>
          <p className="text-slate-500">Manage external partners, specialized consultants, and outsourced work.</p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateStaffDialog roleType="ASSOCIATE" />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead>Professional Name</TableHead>
              <TableHead>Contact Details</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {associates.map((associate) => (
              <TableRow key={associate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{associate.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> {associate.email}</span>
                    {associate.phone && <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> {associate.phone}</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-slate-100 text-slate-700">
                    Tax / Audit
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={associate.isActive ? "default" : "secondary"} className={associate.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                    {associate.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="border-slate-200">
                    Assign Work
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {associates.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                  No associates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
