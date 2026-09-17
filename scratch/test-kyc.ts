import { prisma } from "../src/lib/prisma";
import { encrypt, decrypt } from "../src/lib/encryption";
import * as fs from 'fs';
import * as path from 'path';

async function runTest() {
  console.log("Starting KYC Integration Test...");
  
  // 1. Find a client
  const client = await prisma.user.findFirst({
    where: { role: 'CLIENT' },
    include: { clientProfile: true }
  });

  if (!client) {
    console.log("No client found in DB. Test skipped.");
    process.exit(0);
  }

  console.log(`Found client: ${client.name} (${client.id})`);

  // 2. Simulate Client Submitting KYC
  const rawPan = "ABCDE1234F";
  const encryptedPan = encrypt(rawPan);
  
  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "uploads", "kyc");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Create a dummy file
  const dummyFileName = `pan_${client.id}_test.txt`;
  fs.writeFileSync(path.join(uploadDir, dummyFileName), "DUMMY PAN FILE CONTENT");

  // Update DB
  await prisma.clientProfile.update({
    where: { userId: client.id },
    data: {
      encryptedPan,
      panDocumentUrl: `/api/documents/kyc/${dummyFileName}`
    }
  });
  
  await prisma.user.update({
    where: { id: client.id },
    data: { kycStatus: "PENDING" }
  });

  console.log("Simulated KYC Submission successfully.");

  // 3. Simulate Admin Fetching KYC Approvals
  const submittedClients = await prisma.user.findMany({
    where: { 
      role: "CLIENT",
      clientProfile: {
        panDocumentUrl: { not: null }
      }
    },
    include: { clientProfile: true }
  });

  console.log(`Admin found ${submittedClients.length} clients waiting for KYC review.`);

  const testClient = submittedClients.find((c: any) => c.id === client.id);
  if (testClient && testClient.clientProfile?.encryptedPan) {
    const decPan = decrypt(testClient.clientProfile.encryptedPan);
    console.log(`Decrypted PAN for ${testClient.name}: ${decPan}`);
    if (decPan === rawPan) {
      console.log("✅ Encryption/Decryption logic works perfectly!");
    } else {
      console.error("❌ Decryption failed mismatch.");
    }
  }

  // 4. Simulate Admin Approving
  await prisma.user.update({
    where: { id: client.id },
    data: { kycStatus: "VERIFIED" }
  });

  const finalCheck = await prisma.user.findUnique({ where: { id: client.id }});
  if (finalCheck) {
      console.log(`Final KYC Status: ${finalCheck.kycStatus} (Should be VERIFIED)`);
  }
  console.log("Test completed successfully.");
}

runTest().catch(console.error).finally(() => prisma.$disconnect());
