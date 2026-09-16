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
        include: { user: true }
      },
      tasks: true,
      documents: {
        include: { uploadedBy: true },
        orderBy: { createdAt: "desc" }
      },
      notes: {
        include: { author: true },
        orderBy: { createdAt: "desc" }
      }
    }
  })

  if (!workRequest) {
    redirect("/staff/requests")
  }

  return <RequestDetailClient workRequest={workRequest} currentUser={session.user} />
}
