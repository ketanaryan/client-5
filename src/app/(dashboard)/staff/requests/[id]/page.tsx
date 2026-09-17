import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import RequestDetailClient from "./RequestDetailClient"

export default async function StaffRequestDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session?.user || (session.user.role !== "STAFF" && session.user.role !== "ADMIN")) {
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
      notes: {
        include: { 
          author: {
            select: { id: true, name: true, role: true, image: true }
          } 
        },
        orderBy: { createdAt: "desc" }
      }
    }
  })

  if (!workRequest) {
    redirect("/staff/requests")
  }

  // IDOR Protection: Prevent staff from viewing work requests they are not assigned to.
  if (session.user.role === "STAFF" && workRequest.assignedStaffId !== session.user.id) {
    redirect("/staff/requests")
  }

  return <RequestDetailClient workRequest={workRequest} currentUser={session.user} />
}
