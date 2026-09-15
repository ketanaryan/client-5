"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function createClient(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const companyName = formData.get("companyName") as string
  const phone = formData.get("phone") as string
  
  if (!name || !email) {
    throw new Error("Missing required fields")
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("Email already registered")
  }

  const passwordHash = await bcrypt.hash("password123", 10)

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "CLIENT",
      phone: phone || null,
      clientProfile: {
        create: {
          companyName: companyName || null,
        }
      }
    }
  })

  revalidatePath("/admin/clients")
  return { success: true }
}
