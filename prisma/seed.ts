import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { prisma } from "../src/lib/prisma"

async function main() {
  console.log('Clearing database...')
  await prisma.invoice.deleteMany()
  await prisma.activityLog.deleteMany()
  await prisma.task.deleteMany()
  await prisma.workRequest.deleteMany()
  await prisma.clientProfile.deleteMany()
  await prisma.associateProfile.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('password123', 10)

  console.log('Creating users...')
  const admin = await prisma.user.create({
    data: { name: 'Shantanu', email: 'admin@ca.com', role: 'ADMIN', passwordHash }
  })
  
  const staff1 = await prisma.user.create({
    data: { name: 'Rahul Sharma', email: 'rahul@ca.com', role: 'STAFF', passwordHash }
  })
  
  const staff2 = await prisma.user.create({
    data: { name: 'Priya Mehta', email: 'priya@ca.com', role: 'STAFF', passwordHash }
  })

  const staff3 = await prisma.user.create({
    data: { name: 'Neha Gupta', email: 'neha@ca.com', role: 'STAFF', passwordHash }
  })

  const client = await prisma.user.create({
    data: { 
      name: 'ABC Pvt Ltd', email: 'client@ca.com', role: 'CLIENT', passwordHash,
      clientProfile: {
        create: {
          companyName: 'ABC Pvt Ltd',
          address: '123 Business Park, Mumbai',
          encryptedPan: 'iv:tag:encrypted', // Mock encryption
          encryptedGst: 'iv:tag:encrypted'
        }
      }
    },
    include: { clientProfile: true }
  })

  const associate = await prisma.user.create({
    data: {
      name: 'TaxPro Consultants', email: 'associate@ca.com', role: 'ASSOCIATE', passwordHash,
      associateProfile: { create: {} }
    }
  })

  console.log('Creating Work Requests...')
  const wr1 = await prisma.workRequest.create({
    data: {
      clientId: client.clientProfile!.id, title: 'GST Return - Q2', status: 'IN_PROGRESS', priority: 'HIGH',
      assignedStaffId: staff1.id, feeAmount: 15000, dueDate: new Date(new Date().setDate(new Date().getDate() + 5))
    }
  })

  const wr2 = await prisma.workRequest.create({
    data: {
      clientId: client.clientProfile!.id, title: 'ITR Filing FY 24-25', status: 'AWAITING_CLIENT', priority: 'MEDIUM',
      assignedStaffId: staff2.id, feeAmount: 25000, dueDate: new Date(new Date().setDate(new Date().getDate() + 10))
    }
  })

  const wr3 = await prisma.workRequest.create({
    data: {
      clientId: client.clientProfile!.id, title: 'ROC Compliance', status: 'COMPLETED', priority: 'LOW',
      assignedStaffId: staff3.id, feeAmount: 40000, dueDate: new Date()
    }
  })

  console.log('Creating Invoices...')
  await prisma.invoice.create({ data: { workRequestId: wr1.id, amount: 15000, status: 'UNPAID' } })
  await prisma.invoice.create({ data: { workRequestId: wr2.id, amount: 25000, status: 'OVERDUE', issuedDate: new Date(new Date().setDate(new Date().getDate() - 40)) } })
  await prisma.invoice.create({ data: { workRequestId: wr3.id, amount: 40000, status: 'PAID' } })

  console.log('Creating Activity Logs...')
  await prisma.activityLog.create({ data: { userId: admin.id, actionDescription: 'Generated Invoice for WR-1024' } })
  await prisma.activityLog.create({ data: { userId: staff1.id, actionDescription: 'Updated status to In Progress for GST Return' } })
  await prisma.activityLog.create({ data: { userId: client.id, actionDescription: 'Uploaded requested documents for ITR Filing' } })

  console.log('Database seeded successfully!')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
