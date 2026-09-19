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

export async function sendInvoice(id: string) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      workRequest: {
        include: {
          client: true
        }
      }
    }
  })

  if (!invoice) throw new Error("Invoice not found")

  // Create an in-app notification for the client
  await prisma.notification.create({
    data: {
      userId: invoice.workRequest.client.userId,
      title: "Invoice Issued",
      message: `Your invoice INV-${invoice.id.split("-")[0].toUpperCase()} for ₹${invoice.amount.toLocaleString('en-IN')} has been issued.`,
      link: `/client`
    }
  })

  // Simulated Email & WhatsApp send
  console.log(`[EMAIL] Sent invoice PDF link to client ${invoice.workRequest.client.userId}`)
  console.log(`[WHATSAPP] Sent invoice details to client ${invoice.workRequest.client.userId}`)

  // Update invoice status if needed (e.g. keeping it UNPAID but marking as sent internally)
  // For now, just revalidate
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
        include: { 
          user: {
            select: { id: true, name: true, email: true, phone: true }
          } 
        }
      }
    }
  })
}
