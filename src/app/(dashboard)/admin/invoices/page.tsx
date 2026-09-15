import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { InvoicesTable } from "@/components/invoices/InvoicesTable"
import { getCompletedWorkRequests } from "@/app/actions/invoices"

export default async function InvoicesPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  const invoices = await prisma.invoice.findMany({
    orderBy: { issuedDate: "desc" },
    include: {
      workRequest: {
        include: {
          client: {
            include: { user: true }
          }
        }
      }
    }
  })

  const pendingWorkRequests = await getCompletedWorkRequests()

  return (
    <div className="h-full py-4">
      <InvoicesTable data={invoices} pendingWorkRequests={pendingWorkRequests} />
    </div>
  )
}
