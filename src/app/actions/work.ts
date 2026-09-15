"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { z } from "zod"

const prisma = new PrismaClient()

// Zod Schemas for Runtime Validation
const ToggleTaskSchema = z.object({
  taskId: z.string().uuid("Invalid Task ID"),
  isCompleted: z.boolean()
})

const AddNoteSchema = z.object({
  workRequestId: z.string().uuid("Invalid Work Request ID"),
  content: z.string().min(1, "Note cannot be empty")
})

const MarkCompleteSchema = z.object({
  workRequestId: z.string().uuid("Invalid Work Request ID")
})

const SubmitPaymentSchema = z.object({
  invoiceId: z.string().uuid("Invalid Invoice ID"),
  utrNumber: z.string().min(5, "Invalid UTR Number")
})

export async function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
  try {
    const session = await auth()
    if (!session?.user?.id || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      throw new Error("Unauthorized")
    }

    const validated = ToggleTaskSchema.parse({ taskId, isCompleted })

    // Ownership check for STAFF
    if (session.user.role === "STAFF") {
      const task = await prisma.task.findUnique({
        where: { id: validated.taskId },
        include: { workRequest: true }
      })
      if (!task || task.workRequest.assignedStaffId !== session.user.id) {
        throw new Error("Forbidden: You are not assigned to this work request.")
      }
    }

    await prisma.task.update({
      where: { id: validated.taskId },
      data: { isCompleted: validated.isCompleted }
    })
    
    revalidatePath("/staff/my-work")
    revalidatePath("/client")
    return { success: true }
  } catch (error: any) {
    console.error("[toggleTaskCompletion]", error.message)
    return { success: false, message: error.message }
  }
}

export async function addInternalNote(workRequestId: string, content: string) {
  try {
    const session = await auth()
    if (!session?.user?.id || !["ADMIN", "STAFF"].includes(session.user.role as string)) {
      throw new Error("Unauthorized")
    }

    const validated = AddNoteSchema.parse({ workRequestId, content })

    if (session.user.role === "STAFF") {
      const wr = await prisma.workRequest.findUnique({ where: { id: validated.workRequestId } })
      if (!wr || wr.assignedStaffId !== session.user.id) {
        throw new Error("Forbidden")
      }
    }

    await prisma.internalNote.create({
      data: {
        workRequestId: validated.workRequestId,
        authorId: session.user.id,
        content: validated.content
      }
    })
    
    revalidatePath("/staff/my-work")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}

export async function markWorkComplete(workRequestId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id || !["ADMIN", "STAFF"].includes(session.user.role as string)) {
      throw new Error("Unauthorized")
    }

    const validated = MarkCompleteSchema.parse({ workRequestId })

    if (session.user.role === "STAFF") {
      const wr = await prisma.workRequest.findUnique({ where: { id: validated.workRequestId } })
      if (!wr || wr.assignedStaffId !== session.user.id) {
        throw new Error("Forbidden")
      }
    }

    await prisma.workRequest.update({
      where: { id: validated.workRequestId },
      data: { status: "COMPLETED" }
    })
    
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        actionDescription: `Work Request marked as COMPLETED.`
      }
    })
    
    revalidatePath("/staff/my-work")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}

export async function submitPayment(invoiceId: string, utrNumber: string) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== "CLIENT") {
      throw new Error("Unauthorized")
    }

    const validated = SubmitPaymentSchema.parse({ invoiceId, utrNumber })

    // Ensure invoice belongs to this client
    const invoice = await prisma.invoice.findUnique({
      where: { id: validated.invoiceId },
      include: { workRequest: { include: { client: true } } }
    })

    if (!invoice || invoice.workRequest.client.userId !== session.user.id) {
      throw new Error("Forbidden: This invoice does not belong to your account.")
    }

    await prisma.payment.create({
      data: {
        invoiceId: validated.invoiceId,
        utrNumber: validated.utrNumber,
        amount: invoice.amount,
        status: "PENDING"
      }
    })
    
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        actionDescription: `Submitted payment UTR: ${validated.utrNumber} for Invoice.`
      }
    })
    
    revalidatePath("/client")
    return { success: true, message: "Payment submitted for verification." }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
