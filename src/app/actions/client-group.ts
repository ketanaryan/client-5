"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

/**
 * Creates a new Client Group (Business Family) and attaches multiple client profiles to it.
 */
export async function createClientGroup(name: string, primaryContactId: string, clientProfileIds: string[]) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const group = await prisma.clientGroup.create({
    data: {
      name,
      primaryContactId,
      clientProfiles: {
        connect: clientProfileIds.map(id => ({ id }))
      }
    }
  })

  revalidatePath("/admin/client-groups")
  return group
}

/**
 * Fetches all ClientProfiles in the group, and aggregates their WorkRequests and Invoices.
 */
export async function getGroupConsolidatedData(groupId: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const group = await prisma.clientGroup.findUnique({
    where: { id: groupId },
    include: {
      clientProfiles: {
        include: {
          user: {
            select: { name: true, email: true }
          },
          workRequests: {
            include: {
              tasks: true,
              invoices: {
                include: {
                  payments: true
                }
              },
              documents: true
            }
          }
        }
      }
    }
  })

  return group
}

/**
 * Removes a specific client profile from a group.
 */
export async function removeClientFromGroup(clientProfileId: string) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const profile = await prisma.clientProfile.update({
    where: { id: clientProfileId },
    data: {
      groupId: null
    }
  })

  revalidatePath("/admin/client-groups")
  return profile
}
