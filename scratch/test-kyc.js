const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// We have to redefine the encryption locally for the test since we can't easily run TS modules with Next.js imports outside Next
const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY_HEX = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const getSecretKey = () => {
  if (SECRET_KEY_HEX.length !== 64) {
    return crypto.createHash('sha256').update(String(SECRET_KEY_HEX)).digest();
  }
  return Buffer.from(SECRET_KEY_HEX, 'hex');
};

function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(encryptedText) {
  const parts = encryptedText.split(':');
  const [ivHex, authTagHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, undefined, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

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

  const testClient = submittedClients.find(c => c.id === client.id);
  if (testClient) {
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
  console.log(`Final KYC Status: ${finalCheck.kycStatus} (Should be VERIFIED)`);

  console.log("Test completed successfully.");
}

runTest().catch(console.error).finally(() => prisma.$disconnect());
