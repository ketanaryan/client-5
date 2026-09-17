import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AdminRequestDetailClient from "./AdminRequestDetailClient"

export default async function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const workRequest = await prisma.workRequest.findUnique({
    where: { id: params.id },
    include: {
      client: {
        include: { 
          user: {
            select: { id: true, name: true, email: true, image: true, phone: true }
          } 
        }
      },
      tasks: true,
      documents: {
        include: { 
          uploadedBy: {
            select: { id: true, name: true, role: true }
          }
        },
        orderBy: { createdAt: "desc" }
      },
      invoices: true
    }
  })

  if (!workRequest) {
    redirect("/admin/work-requests")
  }

  // Fetch staff list for assignment
  const staffMembers = await prisma.user.findMany({
    where: { role: "STAFF" },
    select: { id: true, name: true, email: true }
  })

  return <AdminRequestDetailClient workRequest={workRequest} staffMembers={staffMembers} />
}

