/**
 * Create a Firebase Auth user with lawyer role.
 * Usage: GOOGLE_APPLICATION_CREDENTIALS=service-account-key.json npx tsx scripts/create-user.ts
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { join } from 'path';

const saPath = join(__dirname, '..', 'service-account-key.json');
const sa = JSON.parse(readFileSync(saPath, 'utf-8'));
initializeApp({ credential: cert(sa) });

const auth = getAuth();

const email = process.argv[2] || 'info@relitas.cz';
const password = process.argv[3] || 'Rels2024!';
const displayName = process.argv[4] || 'Jan Vaněk';
const role = process.argv[5] || 'lawyer';

async function main() {
  try {
    const user = await auth.createUser({ email, password, displayName });
    await auth.setCustomUserClaims(user.uid, { role });

    console.log('User created successfully!');
    console.log(`  UID:      ${user.uid}`);
    console.log(`  Email:    ${email}`);
    console.log(`  Name:     ${displayName}`);
    console.log(`  Role:     ${role}`);
    console.log(`  Password: ${password}`);
  } catch (err: any) {
    if (err.code === 'auth/email-already-exists') {
      console.log('User already exists, updating claims...');
      const user = await auth.getUserByEmail(email);
      await auth.setCustomUserClaims(user.uid, { role });
      console.log(`  UID:  ${user.uid}`);
      console.log(`  Role set to: ${role}`);
    } else {
      throw err;
    }
  }
}

main().catch(console.error);
