import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { WorkRequestsTable } from "@/components/work-requests/WorkRequestsTable"
import { getClients } from "@/app/actions/work-requests"

export default async function WorkRequestsPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  // Fetch real data from the database
  const workRequests = await prisma.workRequest.findMany({
    include: {
      client: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Get clients for the create dialog
  const clients = await getClients()

  return (
    <div className="h-full py-4">
      <WorkRequestsTable data={workRequests} clients={clients} />
    </div>
  )
}
