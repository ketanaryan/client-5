"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createInvoice(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const workRequestId = formData.get("workRequestId") as string
  const amount = parseFloat(formData.get("amount") as string)
  
  if (!workRequestId || isNaN(amount)) {
    throw new Error("Missing or invalid fields")
  }

  await prisma.invoice.create({
    data: {
      workRequestId,
      amount,
      status: "UNPAID",
    }
  })

  revalidatePath("/admin/invoices")
  return { success: true }
}

export async function updateInvoiceStatus(id: string, status: "PAID" | "UNPAID" | "OVERDUE") {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.invoice.update({
    where: { id },
    data: { status }
  })

  revalidatePath("/admin/invoices")
  return { success: true }
}

export async function getCompletedWorkRequests() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  return prisma.workRequest.findMany({
    where: { 
      status: "COMPLETED",
      invoices: {
        none: {} // Only fetch work requests that don't have invoices yet
      }
    },
    include: {
      client: {
        include: { user: true }
      }
    }
  })
}
