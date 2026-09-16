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

export async function submitClientPayment(invoiceId: string, amount: number, utrNumber: string) {
  const session = await auth()
  if (!session?.user || session.user.role !== "CLIENT") {
    throw new Error("Unauthorized")
  }

  if (!invoiceId || !utrNumber) {
    throw new Error("Missing fields")
  }

  // Ensure invoice belongs to the client
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { workRequest: true }
  })
  
  if (!invoice) throw new Error("Invoice not found")

  // Find client profile
  const profile = await prisma.clientProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (invoice.workRequest.clientId !== profile?.id) {
    throw new Error("Unauthorized access to this invoice")
  }

  await prisma.payment.create({
    data: {
      invoiceId,
      amount,
      utrNumber,
      status: "PENDING", // Wait for admin approval
    }
  })

  revalidatePath("/client")
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
