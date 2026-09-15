import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ClientPortal from "./ClientDashboard"

export default async function ClientPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "CLIENT") {
    redirect("/") // send non-clients to their respective dashboards
  }

  // Fetch client data
  const clientData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      clientProfile: {
        include: {
          workRequests: {
            orderBy: { createdAt: "desc" }
          }
        }
      }
    }
  })

  // Fetch invoices where the work request belongs to this client
  const invoices = await prisma.invoice.findMany({
    where: {
      workRequest: {
        clientId: session.user.id
      }
    },
    orderBy: { issuedDate: "desc" },
    include: {
      workRequest: true,
      payments: true
    }
  })

  if (!clientData) {
    redirect("/login")
  }

  return (
    <ClientPortal 
      user={clientData} 
      profile={clientData.clientProfile} 
      workRequests={clientData.clientProfile?.workRequests || []} 
      invoices={invoices} 
    />
  )
}
