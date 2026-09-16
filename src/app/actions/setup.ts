"use server"

import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const PasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export async function setupFirstPassword(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" }
  }

  const rawData = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  try {
    const validated = PasswordSchema.parse(rawData)
    const passwordHash = await bcrypt.hash(validated.password, 10)

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        passwordHash,
        isFirstLogin: false
      }
    })

    // Cannot redirect inside a try-catch returning a value directly like this if we want to pass success back to a client form.
    // So we'll return success, and let the client component do the redirect.
    return { success: true, redirectUrl: `/${user.role.toLowerCase()}` }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation Error" }
    }
    return { success: false, error: "An error occurred." }
  }
}
