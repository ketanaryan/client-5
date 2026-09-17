"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { mkdir, writeFile, unlink } from "fs/promises"
import { join, extname, basename } from "path"
import { randomUUID } from "crypto"

// Allowed extensions for high security
const ALLOWED_EXTENSIONS = new Set([
  ".pdf", ".jpg", ".jpeg", ".png", 
  ".xls", ".xlsx", ".doc", ".docx", 
  ".csv", ".txt", ".zip"
])

export async function uploadClientDocument(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")

  const buffer = Buffer.from(await file.arrayBuffer())

  // Backend Size Check (5MB)
  if (buffer.length > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit")
  }

  // Security Check: Extension Validation
  const originalName = file.name || "unnamed_file"
  const ext = extname(originalName).toLowerCase()
  
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`File type ${ext} is not allowed for security reasons.`)
  }

  // Sanitize filename to prevent Path Traversal
  const safeName = basename(originalName).replace(/[^a-zA-Z0-9.\-_]/g, "_")
  const filename = `${randomUUID()}-${safeName}`
  
  const workRequestId = formData.get("workRequestId") as string | null

  // Ensure storage directory exists securely outside public root
  const storageDir = join(process.cwd(), "storage", "documents")
  await mkdir(storageDir, { recursive: true })
  
  const filePath = join(storageDir, filename)
  await writeFile(filePath, buffer)

  if (workRequestId) {
    const wr = await prisma.workRequest.findUnique({
      where: { id: workRequestId },
      include: { client: true }
    })
    if (!wr) throw new Error("Work request not found")
    
    // Auth check for work request access
    if (session.user.role === "CLIENT" && wr.client.userId !== session.user.id) {
      throw new Error("Unauthorized to upload to this work request")
    }
    if (session.user.role === "STAFF" && wr.assignedStaffId !== session.user.id) {
      // Allow STAFF to upload only if assigned
      throw new Error("Unauthorized to upload to this work request")
    }
  }

  // Link file to client
  await prisma.document.create({
    data: {
      title: safeName,
      fileUrl: filename,
      uploadedById: session.user.id,
      workRequestId: workRequestId || null,
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
    include: { workRequest: true }
  })

  if (!doc) throw new Error("Document not found")

  let isAuthorized = false;

  if (session.user.role === "ADMIN") {
    isAuthorized = true;
  } else if (doc.uploadedById === session.user.id) {
    isAuthorized = true;
  } else if (session.user.role === "STAFF" && doc.workRequest?.assignedStaffId === session.user.id) {
    isAuthorized = true;
  }

  if (!isAuthorized) {
    throw new Error("Unauthorized")
  }

  // Strictly delete from filesystem as well for data hygiene
  try {
    const storageDir = join(process.cwd(), "storage", "documents")
    const filePath = join(storageDir, doc.fileUrl)
    // Prevent traversal out of the documents folder
    if (filePath.startsWith(storageDir)) {
      await unlink(filePath).catch(() => console.log("File already missing from disk"))
    }
  } catch (e) {
    console.error(e)
  }

  await prisma.document.delete({
    where: { id: documentId }
  })

  revalidatePath("/client")
  return { success: true }
}
