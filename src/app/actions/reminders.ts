"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createReminder(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const dueDateStr = formData.get("dueDate") as string
  const targetGroup = formData.get("targetGroup") as string || "ALL"
  
  if (!title || !dueDateStr) {
    throw new Error("Missing required fields")
  }

  const dueDate = new Date(dueDateStr)

  // Determine which clients to target
  let userWhereClause: any = { role: "CLIENT", isActive: true }

  if (targetGroup === "GST_REGISTERED") {
    userWhereClause.clientProfile = {
      encryptedGst: { not: null }
    }
  } else if (targetGroup === "PENDING_KYC") {
    userWhereClause.kycStatus = { in: ["PENDING", "REJECTED"] }
  } else if (targetGroup === "UNPAID_INVOICES") {
    userWhereClause.clientProfile = {
      workRequests: {
        some: {
          invoices: {
            some: {
              status: { in: ["UNPAID", "OVERDUE"] }
            }
          }
        }
      }
    }
  }

  const targetClients = await prisma.user.findMany({
    where: userWhereClause,
    select: { id: true }
  })

  const targetCount = targetClients.length

  // Create the Reminder
  const reminder = await prisma.reminder.create({
    data: {
      title,
      description,
      dueDate,
      targetCount,
      targetGroup,
      type: "CUSTOM"
    }
  })

  // Optionally, automatically create in-app notifications for these clients
  if (targetCount > 0) {
    const notificationsToCreate = targetClients.map(client => ({
      userId: client.id,
      title: `Reminder: ${title}`,
      message: description || `You have a new reminder due by ${dueDate.toLocaleDateString()}.`,
      link: "/client"
    }))

    await prisma.notification.createMany({
      data: notificationsToCreate
    })
  }

  revalidatePath("/admin/reminders")
  return { success: true }
}
