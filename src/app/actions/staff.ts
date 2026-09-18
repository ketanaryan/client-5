"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function createStaff(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const role = formData.get("role") as "STAFF" | "ASSOCIATE"
  const address = formData.get("address") as string
  const ageStr = formData.get("age") as string
  const gender = formData.get("gender") as string
  
  // Note: if photo is sent as base64 string or we handle it later
  const image = formData.get("image") as string
  
  if (!name || !email || !role) {
    throw new Error("Missing required fields")
  }

  const age = ageStr ? parseInt(ageStr, 10) : null

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("Email already registered")
  }

  const passwordHash = await bcrypt.hash("password123", 10)

  if (role === "ASSOCIATE") {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "ASSOCIATE",
        phone: phone || null,
        address: address || null,
        age,
        gender: gender || null,
        image: image || null,
        associateProfile: {
          create: {}
        }
      }
    })
    revalidatePath("/admin/associates")
  } else {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "STAFF",
        phone: phone || null,
        address: address || null,
        age,
        gender: gender || null,
        image: image || null,
      }
    })
    revalidatePath("/admin/staff")
  }

  return { success: true }
}
