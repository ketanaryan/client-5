"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"

const EnquirySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  serviceRequested: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    if (error?.name === "ZodError") {
      return { success: false, message: error.errors?.[0]?.message || "Validation Error" }
    }
    return { success: false, message: "An error occurred while submitting your enquiry." }
  }
}
