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
import { Plus, Building2, UserCircle, Briefcase, FileText } from "lucide-react"
import { CreateClientDialog } from "@/components/clients/CreateClientDialog"
import { SearchInput } from "@/components/ui/search-input"

export default async function ClientsPage({ searchParams }: { searchParams: { q?: string } }) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const query = searchParams.q || ""

  const clients = await prisma.user.findMany({
    where: { 
      role: "CLIENT",
      ...(query && {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { userCode: { contains: query, mode: "insensitive" } },
          { clientProfile: { companyName: { contains: query, mode: "insensitive" } } },
        ]
      })
    },
    orderBy: { createdAt: "desc" },
    include: {
      clientProfile: {
        include: {
          _count: {
            select: { workRequests: true }
          }
        }
      }
    }
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Client CRM</h2>
          <p className="text-slate-500">Manage your chartered accountancy clients and entities.</p>
        </div>
        <div className="flex items-center space-x-3 ml-auto">
          <SearchInput placeholder="Search client ID, company, name..." />
          <CreateClientDialog />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[120px]">Client ID</TableHead>
              <TableHead>Entity Name</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Active Work</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-semibold text-slate-700">
                  <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 font-mono tracking-wide">
                    {client.userCode || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{client.clientProfile?.companyName || "N/A"}</p>
                      {client.clientProfile?.encryptedGst && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5 font-medium">
                          <Briefcase className="h-3 w-3" /> GST Registered
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium text-slate-900">{client.name}</p>
                  <p className="text-xs text-slate-500">{client.email}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4 text-slate-400" />
                    {client.clientProfile?._count.workRequests || 0} active jobs
                  </div>
                </TableCell>
                <TableCell>
                  {client.isActive ? (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Active Client
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="border-slate-200">
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
