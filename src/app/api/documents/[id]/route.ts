import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { readFile } from "fs/promises"
import { join, resolve } from "path"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const doc = await prisma.document.findUnique({
    where: { id: params.id },
    include: { uploadedBy: true, workRequest: true }
  })

  if (!doc) {
    return new NextResponse("Document not found", { status: 404 })
  }

  // Strictly enforce authorization
  const isOwner = doc.uploadedById === session.user.id
  const isStaff = session.user.role === "STAFF" || session.user.role === "ADMIN"
  
  let hasAccess = isOwner || isStaff

  if (!hasAccess && session.user.role === "CLIENT") {
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: session.user.id }
    })
    
    if (doc.workRequest && clientProfile && doc.workRequest.clientId === clientProfile.id) {
      hasAccess = true
    }
  }

  if (!hasAccess) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  try {
    const storageDir = resolve(process.cwd(), "storage", "documents")
    const filePath = resolve(storageDir, doc.fileUrl)
    
    // Crucial: Prevent Directory Traversal Attack by ensuring the resolved path is within storageDir
    if (!filePath.startsWith(storageDir)) {
      console.warn("Security Alert: Path traversal attempt prevented")
      return new NextResponse("Forbidden", { status: 403 })
    }

    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${doc.title}"`,
        "Content-Type": "application/octet-stream",
        // Enforce secure headers
        "X-Content-Type-Options": "nosniff",
      }
    })
  } catch (error) {
    console.error("Error reading file", error)
    return new NextResponse("File not found on disk", { status: 404 })
  }
}
