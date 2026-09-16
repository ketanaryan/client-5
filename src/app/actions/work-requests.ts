"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createWorkRequest(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const clientId = formData.get("clientId") as string
  const title = formData.get("title") as string
  const priority = formData.get("priority") as "LOW" | "MEDIUM" | "HIGH"
  const feeAmount = formData.get("feeAmount") ? parseFloat(formData.get("feeAmount") as string) : null
  const dueDateStr = formData.get("dueDate") as string
  
  if (!clientId || !title || !priority) {
    throw new Error("Missing required fields")
  }

  let dueDate: Date | undefined
  if (dueDateStr) {
    dueDate = new Date(dueDateStr)
  }

  await prisma.workRequest.create({
    data: {
      clientId,
      title,
      priority,
      feeAmount,
      dueDate,
      status: "PENDING",
    }
  })

  revalidatePath("/admin/work-requests")
  return { success: true }
}

export async function createClientWorkRequest(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "CLIENT") {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  if (!title) {
    throw new Error("Missing request title")
  }

  const profile = await prisma.clientProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (!profile) {
    throw new Error("Client profile not found")
  }

  await prisma.workRequest.create({
    data: {
      clientId: profile.id,
      title,
      priority: "MEDIUM",
      status: "PENDING",
    }
  })

  revalidatePath("/client")
  return { success: true }
}

export async function updateWorkRequestStatus(id: string, status: "PENDING" | "IN_PROGRESS" | "AWAITING_CLIENT" | "FOR_REVIEW" | "COMPLETED") {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  await prisma.workRequest.update({
    where: { id },
    data: { status }
  })

  revalidatePath("/admin/work-requests")
  return { success: true }
}

export async function getClients() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
  
  return prisma.clientProfile.findMany({
    include: { user: true }
  })
}

export async function updateWorkRequestFee(id: string, feeAmount: number) {
  const session = await auth()
  if (!session?.user || (session.user.role !== "STAFF" && session.user.role !== "ADMIN")) {
    throw new Error("Unauthorized")
  }
  await prisma.workRequest.update({
    where: { id },
    data: { feeAmount }
  })
  revalidatePath("/staff/requests")
  return { success: true }
}

export async function addTaskToRequest(workRequestId: string, description: string) {
  const session = await auth()
  if (!session?.user || (session.user.role !== "STAFF" && session.user.role !== "ADMIN")) {
    throw new Error("Unauthorized")
  }
  await prisma.task.create({
    data: {
      workRequestId,
      description,
    }
  })
  return { success: true }
}

export async function toggleTaskStatus(taskId: string, isCompleted: boolean) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  
  await prisma.task.update({
    where: { id: taskId },
    data: { isCompleted }
  })
  return { success: true }
}
