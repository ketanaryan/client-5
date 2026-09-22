import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { ClientGroupForm } from "./ClientGroupForm"

export default async function ClientGroupsPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const groups = await prisma.clientGroup.findMany({
    include: {
      primaryContact: {
        select: { name: true, email: true }
      },
      clientProfiles: {
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  // Fetch all users with role CLIENT that are not in a group
  const unassignedProfiles = await prisma.clientProfile.findMany({
    where: { groupId: null },
    include: {
      user: {
        select: { id: true, name: true, email: true }
      }
    }
  })

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10 pt-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Client Groups</h2>
          <p className="text-sm text-slate-500 mt-1">Manage Business Families and consolidated entities.</p>
        </div>
        <ClientGroupForm unassignedProfiles={unassignedProfiles} />
      </div>

      <div className="grid gap-6 mt-4">
        <Card className="rounded-xl border-slate-200/60 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl py-5 px-6">
            <CardTitle className="text-base font-semibold text-slate-900">Existing Groups</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                  <TableHead className="font-medium text-slate-500 text-xs h-11 pl-6">Group Name</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs h-11">Primary Contact</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs h-11">Entities (Clients)</TableHead>
                  <TableHead className="font-medium text-slate-500 text-xs h-11 text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-slate-500 text-sm">No client groups found.</TableCell>
                  </TableRow>
                )}
                {groups.map((group) => (
                  <TableRow key={group.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6 py-4 font-medium text-slate-900 text-sm flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      {group.name}
                    </TableCell>
                    <TableCell className="py-4 text-slate-600 text-sm">
                      {group.primaryContact.name} <br/>
                      <span className="text-xs text-slate-400">{group.primaryContact.email}</span>
                    </TableCell>
                    <TableCell className="py-4 text-slate-600 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {group.clientProfiles.map(p => (
                          <Badge key={p.id} variant="secondary" className="bg-slate-100 font-normal">
                            {p.companyName || p.user.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right pr-6">
                      <Button variant="outline" size="sm" className="h-8 text-xs">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
