"use server"

import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["STAFF", "CLIENT", "ASSOCIATE", "ADMIN"]),
  phone: z.string().optional(),
  companyName: z.string().optional(), // For clients
})

export async function createUser(data: z.infer<typeof CreateUserSchema>) {
  try {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    const validated = CreateUserSchema.parse(data)
    const existing = await prisma.user.findUnique({ where: { email: validated.email } })
    if (existing) throw new Error("Email already exists")

    const passwordHash = await bcrypt.hash(validated.password, 10)

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        passwordHash,
        role: validated.role,
        phone: validated.phone,
        ...(validated.role === "CLIENT" && {
          clientProfile: {
            create: {
              companyName: validated.companyName || validated.name
            }
          }
        }),
        ...(validated.role === "ASSOCIATE" && {
          associateProfile: {
            create: {}
          }
        })
      }
    })

    revalidatePath("/admin/staff")
    revalidatePath("/admin/clients")
    revalidatePath("/admin/associates")
    
    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateUserAvatar(base64Image: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: base64Image }
  })
  
  revalidatePath("/admin/profile")
  revalidatePath("/client")
  revalidatePath("/staff/profile")
  revalidatePath("/associate/profile")

  return { success: true }
}
export async function markAllNotificationsRead() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  await prisma.notification.updateMany({
    where: { userId: session.user.id, isRead: false },
    data: { isRead: true }
  })
  
  revalidatePath("/")

  return { success: true }
}

