"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { encrypt } from "@/lib/encryption"
import { revalidatePath } from "next/cache"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import crypto from "crypto"

export async function submitKyc(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "CLIENT") {
    throw new Error("Unauthorized")
  }

  const panNumber = formData.get("panNumber") as string
  const gstin = formData.get("gstin") as string
  const panFile = formData.get("panFile") as File
  const gstFile = formData.get("gstFile") as File

  if (!panNumber || !panFile) {
    throw new Error("PAN details and document are required")
  }

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "uploads", "kyc")
  await mkdir(uploadDir, { recursive: true })

  let panDocumentUrl = ""
  let gstDocumentUrl = ""

  // Save PAN File
  if (panFile && panFile.size > 0) {
    const ext = panFile.name.split('.').pop()
    const fileName = `pan_${session.user.id}_${crypto.randomBytes(4).toString('hex')}.${ext}`
    const buffer = Buffer.from(await panFile.arrayBuffer())
    await writeFile(path.join(uploadDir, fileName), buffer)
    panDocumentUrl = `/api/documents/kyc/${fileName}`
  }

  // Save GST File
  if (gstFile && gstFile.size > 0) {
    const ext = gstFile.name.split('.').pop()
    const fileName = `gst_${session.user.id}_${crypto.randomBytes(4).toString('hex')}.${ext}`
    const buffer = Buffer.from(await gstFile.arrayBuffer())
    await writeFile(path.join(uploadDir, fileName), buffer)
    gstDocumentUrl = `/api/documents/kyc/${fileName}`
  }

  // Encrypt sensitive texts
  const encryptedPan = encrypt(panNumber)
  const encryptedGst = gstin ? encrypt(gstin) : null

  // Update Database
  await prisma.$transaction([
    prisma.clientProfile.update({
      where: { userId: session.user.id },
      data: {
        encryptedPan,
        encryptedGst,
        panDocumentUrl: panDocumentUrl || undefined,
        gstDocumentUrl: gstDocumentUrl || undefined,
        kycRejectionReason: null // Reset rejection reason on new submission
      }
    }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { kycStatus: "PENDING" }
    })
  ])

  revalidatePath("/client")
  return { success: true }
}

export async function approveKyc(userId: string) {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.user.update({
    where: { id: userId },
    data: { kycStatus: "VERIFIED" }
  })
  
  await prisma.clientProfile.update({
    where: { userId },
    data: { kycRejectionReason: null }
  })

  revalidatePath("/admin/clients")
  return { success: true }
}

export async function rejectKyc(userId: string, reason: string) {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.user.update({
    where: { id: userId },
    data: { kycStatus: "REJECTED" }
  })

  await prisma.clientProfile.update({
    where: { userId },
    data: { kycRejectionReason: reason }
  })

  revalidatePath("/admin/clients")
  return { success: true }
}
