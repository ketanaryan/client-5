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
  const targetCount = parseInt(formData.get("targetCount") as string)
  
  if (!title || !dueDateStr || isNaN(targetCount)) {
    throw new Error("Missing or invalid fields")
  }

  const dueDate = new Date(dueDateStr)

  await prisma.reminder.create({
    data: {
      title,
      description,
      dueDate,
      targetCount,
      type: "CUSTOM"
    }
  })

  revalidatePath("/admin/reminders")
  return { success: true }
}
