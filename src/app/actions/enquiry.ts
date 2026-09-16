"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteEnquiry(enquiryId: string) {
  try {
    await prisma.enquiry.delete({ where: { id: enquiryId } })
    revalidatePath("/admin/enquiries")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

const EnquirySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  serviceRequested: z.string().optional(),
  message: z.string().min(2, "Message must be at least 2 characters"),
})

import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendWelcomeEmail, sendAdminNotificationEmail } from "@/lib/email"

export async function submitEnquiry(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceRequested: formData.get("serviceRequested") as string,
      message: formData.get("message") as string,
    }

    const validated = EnquirySchema.parse(rawData)

    await prisma.enquiry.create({
      data: validated,
    })

    // Instantly notify admin via Resend
    await sendAdminNotificationEmail(validated)

    return { success: true, message: "Your enquiry has been submitted successfully. We will contact you soon." }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message || "Validation Error" }
    }
    return { success: false, message: "An error occurred while submitting your enquiry." }
  }
}

export async function convertEnquiryToClient(enquiryId: string) {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: enquiryId }
    })
    
    if (!enquiry) {
      throw new Error("Enquiry not found")
    }

    if (enquiry.status === "CONVERTED") {
      throw new Error("Enquiry already converted")
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: enquiry.email }
    })
    
    if (existingUser) {
      // If user already exists, just mark the enquiry as converted so it doesn't stay 'NEW'
      await prisma.enquiry.update({
        where: { id: enquiryId },
        data: { status: "CONVERTED" }
      })
      revalidatePath("/admin/enquiries")
      return { success: true, message: "Client already exists. Enquiry marked as converted." }
    }

    // Generate secure temp password
    const tempPassword = crypto.randomBytes(4).toString("hex") // 8 characters
    const passwordHash = await bcrypt.hash(tempPassword, 10)

    // Generate userCode (CLI-XXXX) safely avoiding unique constraint errors
    const lastUser = await prisma.user.findFirst({
      where: { role: "CLIENT", userCode: { startsWith: "CLI-" } },
      orderBy: { userCode: "desc" }
    })
    
    let nextNum = 1000
    if (lastUser && lastUser.userCode) {
      const parts = lastUser.userCode.split("-")
      if (parts.length === 2 && !isNaN(parseInt(parts[1]))) {
        nextNum = parseInt(parts[1]) + 1
      }
    }
    const userCode = `CLI-${nextNum}`

    // Create User and ClientProfile
    await prisma.user.create({
      data: {
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        passwordHash,
        role: "CLIENT",
        userCode,
        isFirstLogin: true,
        kycStatus: "PENDING",
        clientProfile: {
          create: {
            companyName: enquiry.name
          }
        }
      }
    })

    // Update Enquiry status
    await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { status: "CONVERTED" }
    })

    // Send Welcome Email
    await sendWelcomeEmail(enquiry.email, tempPassword, enquiry.name)

    revalidatePath("/admin/enquiries")

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
