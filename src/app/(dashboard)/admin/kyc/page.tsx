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
import { CheckCircle2, XCircle, FileText, AlertCircle } from "lucide-react"
import { decrypt } from "@/lib/encryption"
import { KycReviewModal } from "./KycReviewModal"

export default async function AdminKycPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  // Fetch all clients who have submitted KYC docs
  const submittedClients = await prisma.user.findMany({
    where: { 
      role: "CLIENT",
      clientProfile: {
        panDocumentUrl: { not: null }
      }
    },
    orderBy: { createdAt: "desc" },
    include: {
      clientProfile: true
    }
  })

  // Decrypt data securely on server before sending to client component
  const secureClients = submittedClients.map(client => {
    const profile = client.clientProfile;
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      kycStatus: client.kycStatus,
      companyName: profile?.companyName,
      panDocumentUrl: profile?.panDocumentUrl,
      gstDocumentUrl: profile?.gstDocumentUrl,
      decryptedPan: profile?.encryptedPan ? decrypt(profile.encryptedPan) : null,
      decryptedGst: profile?.encryptedGst ? decrypt(profile.encryptedGst) : null,
    }
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">KYC Approvals</h2>
          <p className="text-sm text-slate-500 mt-2">
            Review and verify submitted client KYC documents securely.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Client</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {secureClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  No KYC submissions found.
                </TableCell>
              </TableRow>
            )}
            {secureClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <p className="text-sm font-medium text-slate-900">{client.name}</p>
                  <p className="text-xs text-slate-500">{client.email}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-slate-900">{client.companyName || "N/A"}</p>
                </TableCell>
                <TableCell>
                  {client.kycStatus === "VERIFIED" ? (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  ) : client.kycStatus === "REJECTED" ? (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <XCircle className="w-3 h-3 mr-1" /> Rejected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      <AlertCircle className="w-3 h-3 mr-1" /> Pending Review
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <KycReviewModal client={client} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
