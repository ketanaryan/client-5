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
    redirect("/") 
  }

  const clientData = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      clientProfile: {
        include: {
          workRequests: {
            orderBy: { createdAt: "desc" },
            include: { tasks: true }
          }
        }
      }
    }
  })

  if (!clientData || !clientData.clientProfile) {
    redirect("/login")
  }

  // Correct invoice fetch (using clientProfile.id)
  const invoices = await prisma.invoice.findMany({
    where: {
      workRequest: {
        clientId: clientData.clientProfile.id
      }
    },
    orderBy: { issuedDate: "desc" },
    include: {
      workRequest: true,
      payments: true
    }
  })

  // Fetch documents for the vault
  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { uploadedById: session.user.id },
        { workRequest: { clientId: clientData.clientProfile.id } }
      ]
    },
    orderBy: { createdAt: "desc" },
    include: { uploadedBy: true }
  })

  return (
    <ClientPortal 
      user={clientData} 
      profile={clientData.clientProfile} 
      workRequests={clientData.clientProfile.workRequests || []} 
      invoices={invoices}
      documents={documents} 
    />
  )
}

