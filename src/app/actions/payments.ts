"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function recordPayment(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const invoiceId = formData.get("invoiceId") as string
  const amount = parseFloat(formData.get("amount") as string)

  const utrNumber = formData.get("utrNumber") as string
  
  if (!invoiceId || isNaN(amount)) {
    throw new Error("Missing or invalid fields")
  }

  // Use a transaction to ensure payment is recorded and invoice is marked as PAID
  await prisma.$transaction([
    prisma.payment.create({
      data: {
        invoiceId,
        amount,
        utrNumber: utrNumber || "",
        status: "COMPLETED", // Admin is recording it, so it's completed
      }
    }),
    prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "PAID" }
    })
  ])

  revalidatePath("/admin/payments")
  revalidatePath("/admin/invoices")
  return { success: true }
}

export async function getUnpaidInvoices() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  return prisma.invoice.findMany({
    where: { 
      status: {
        in: ["UNPAID", "OVERDUE"]
      }
    },
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
}
