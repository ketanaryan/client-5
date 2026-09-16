"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { mkdir, writeFile } from "fs/promises"
import { join } from "path"
import { randomUUID } from "crypto"

export async function uploadClientDocument(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
  
  // Ensure storage directory exists
  const storageDir = join(process.cwd(), "storage", "documents")
  await mkdir(storageDir, { recursive: true })
  
  const filePath = join(storageDir, filename)
  await writeFile(filePath, buffer)

  // Find if client profile
  const clientProfile = await prisma.clientProfile.findUnique({
    where: { userId: session.user.id }
  })

  await prisma.document.create({
    data: {
      title: file.name,
      fileUrl: filename, // Just store the filename, the API route will resolve it
      uploadedById: session.user.id,
      // If we wanted to tie it to a specific work request, we could accept workRequestId in formData
    }
  })

  revalidatePath("/client")
  return { success: true }
}

export async function deleteDocument(documentId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    include: { uploadedBy: true }
  })

  if (!doc) throw new Error("Document not found")

  // Only admin, staff, or the owner can delete
  if (session.user.role !== "ADMIN" && session.user.role !== "STAFF" && doc.uploadedById !== session.user.id) {
    throw new Error("Unauthorized")
  }

  // NOTE: For safety in this demo, we'll just delete the DB record.
  // In a real app, we'd also delete the file from the filesystem.
  await prisma.document.delete({
    where: { id: documentId }
  })

  revalidatePath("/client")
  return { success: true }
}
