import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { readFile } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const session = await auth()
  
  // Must be logged in
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const filename = params.filename
  
  // Extract user ID from filename (format: type_userId_hash.ext)
  const parts = filename.split('_')
  if (parts.length < 3) {
    return new NextResponse("Invalid file format", { status: 400 })
  }
  
  const targetUserId = parts[1]

  // Authorization checks
  let isAuthorized = false
  if (session.user.role === "ADMIN") {
    isAuthorized = true // Admin can view any KYC doc
  } else if (session.user.id === targetUserId) {
    isAuthorized = true // Users can view their own KYC docs
  }

  if (!isAuthorized) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  try {
    const filePath = path.join(process.cwd(), "uploads", "kyc", filename)
    const fileBuffer = await readFile(filePath)
    
    // Determine content type
    const ext = filename.split('.').pop()?.toLowerCase()
    let contentType = 'application/octet-stream'
    if (ext === 'pdf') contentType = 'application/pdf'
    if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg'
    if (ext === 'png') contentType = 'image/png'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`
      }
    })
  } catch (error) {
    return new NextResponse("File not found", { status: 404 })
  }
}
