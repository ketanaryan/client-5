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

  // Generate a random 8-character password
  const randomPassword = Math.random().toString(36).slice(-8)
  const passwordHash = await bcrypt.hash(randomPassword, 10)

  // In a real production app, you would use Resend/SendGrid here.
  console.log(`[EMAIL SIMULATION] Sending Onboarding Email to ${email}`)
  console.log(`[EMAIL SIMULATION] Subject: Welcome to Shantanu & Associates - Your Account Details`)
  console.log(`[EMAIL SIMULATION] Body: Hello ${name},\nYour account has been created. Your login email is ${email} and your temporary password is: ${randomPassword}\nPlease log in and change your password immediately.`)

  if (role === "ASSOCIATE") {
    const newUser = await prisma.user.create({
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
    
    // Create an in-app notification for the newly onboarded user
    await prisma.notification.create({
      data: {
        userId: newUser.id,
        title: "Welcome to the Portal",
        message: "Your account has been successfully set up. Please update your password in Settings.",
        link: "/associate/settings",
      }
    })
    revalidatePath("/admin/associates")
  } else {
    const newUser = await prisma.user.create({
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
    
    await prisma.notification.create({
      data: {
        userId: newUser.id,
        title: "Welcome to the Portal",
        message: "Your account has been successfully set up. Please update your password in Settings.",
        link: "/staff/settings",
      }
    })
    revalidatePath("/admin/staff")
  }

  return { success: true, generatedPassword: randomPassword }
}
