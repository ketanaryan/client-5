"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const EnquirySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  serviceRequested: z.string().optional(),
  message: z.string().min(2, "Message must be at least 2 characters"),
})

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

    // Update status
    await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { status: "CONVERTED" }
    })

    // Here we would normally provision the User and ClientProfile
    // but the user requested mock functionality for now.
    revalidatePath("/admin/enquiries")

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
