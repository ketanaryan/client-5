import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { decrypt } from "@/lib/encryption"
import ClientPortal from "./ClientDashboard"

export default async function ClientPage({ searchParams }: { searchParams: { tab?: string, entityId?: string } }) {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "CLIENT") {
    redirect("/login")
  }

  // 1. Fetch the logged-in user's base client profile
  const baseUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      clientProfile: true
    }
  })

  if (!baseUser || !baseUser.clientProfile) {
    redirect("/login")
  }

  const groupId = baseUser.clientProfile.groupId

  // 2. If in a group, fetch all profiles in the group
  let allGroupProfiles: any[] = []
  if (groupId) {
    const group = await prisma.clientGroup.findUnique({
      where: { id: groupId },
      include: {
        clientProfiles: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    })
    if (group) {
      allGroupProfiles = group.clientProfiles
    }
  } else {
    // Just wrap their own profile if not in a group
    allGroupProfiles = [
      { ...baseUser.clientProfile, user: { id: baseUser.id, name: baseUser.name, email: baseUser.email } }
    ]
  }

  // 3. Determine which entity to view
  let activeProfileId = searchParams.entityId || baseUser.clientProfile.id
  // Ensure they aren't trying to view an entity they don't have access to
  const hasAccess = allGroupProfiles.some(p => p.id === activeProfileId)
  if (!hasAccess) {
    activeProfileId = baseUser.clientProfile.id
  }

  // 4. Fetch the FULL data for the active profile
  const activeProfileData = await prisma.clientProfile.findUnique({
    where: { id: activeProfileId },
    include: {
      user: true,
      workRequests: {
        orderBy: { createdAt: "desc" },
        include: { tasks: true }
      }
    }
  })

  if (!activeProfileData) redirect("/login")

  // Decrypt sensitive data for display
  const decryptedProfile = {
    ...activeProfileData,
    decryptedPan: activeProfileData.encryptedPan ? decrypt(activeProfileData.encryptedPan) : null,
    decryptedGst: activeProfileData.encryptedGst ? decrypt(activeProfileData.encryptedGst) : null,
  }

  // Fetch invoices and documents for the active profile
  const [invoices, documents] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        workRequest: {
          clientId: activeProfileId
        }
      },
      orderBy: { issuedDate: "desc" },
      include: {
        workRequest: true,
        payments: true
      }
    }),
    prisma.document.findMany({
      where: {
        OR: [
          { workRequest: { clientId: activeProfileId } },
          // If viewing their own profile, they can see docs they uploaded directly without a WR
          ...(activeProfileId === baseUser.clientProfile.id ? [{ uploadedById: session.user.id }] : [])
        ]
      },
      orderBy: { createdAt: "desc" },
      include: { 
        uploadedBy: {
          select: { id: true, name: true, role: true }
        } 
      }
    })
  ])

  // user prop is expected to have active user's core details for rendering
  const displayUser = {
    ...activeProfileData.user,
    kycStatus: activeProfileData.user.kycStatus
  }

  return (
    <ClientPortal 
      user={displayUser} 
      profile={decryptedProfile} 
      workRequests={activeProfileData.workRequests}
      invoices={invoices}
      documents={documents}
      allGroupProfiles={allGroupProfiles}
      activeProfileId={activeProfileId}
    />
  )
}
