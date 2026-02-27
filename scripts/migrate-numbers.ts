/**
 * Migration script: Numbers → Firestore
 *
 * Usage: npx tsx scripts/migrate-numbers.ts
 *
 * Reads data-analysis/parsed-output.txt and imports into Firestore.
 * Requires GOOGLE_APPLICATION_CREDENTIALS or Firebase emulator.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  const dataPath = join(__dirname, '..', 'data-analysis', 'parsed-output.txt');
  const data = readFileSync(dataPath, 'utf-8');

  console.log(`Read ${data.length} characters from parsed-output.txt`);
  console.log('Migration script stub — implement parsing logic in functions/src/migration/import.ts');

  // TODO: Initialize Firebase Admin, call runMigration(data)
}

main().catch(console.error);
