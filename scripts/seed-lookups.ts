/**
 * Seed lookup tables into Firestore.
 *
 * Usage: npx tsx scripts/seed-lookups.ts
 */

const lookups = {
  dealTypes: {
    items: [
      { value: 'PRODEJ', label: 'Prodej', order: 1 },
      { value: 'KOUPĚ', label: 'Koupě', order: 2 },
      { value: 'PŘEVOD', label: 'Převod', order: 3 },
      { value: 'DAROVÁNÍ', label: 'Darování', order: 4 },
      { value: 'SMĚNA', label: 'Směna', order: 5 },
      { value: 'VYPOŘÁDÁNÍ_SJM', label: 'Vypořádání SJM', order: 6 },
      { value: 'JINÉ', label: 'Jiné', order: 7 },
    ],
  },
  phases: {
    items: [
      { value: 'rezervace', label: 'Rezervace', order: 1 },
      { value: 'zpracovani', label: 'Zpracování', order: 2 },
      { value: 'finalizace', label: 'Finalizace', order: 3 },
      { value: 'uschova', label: 'Úschova', order: 4 },
      { value: 'katastr', label: 'Katastr', order: 5 },
      { value: 'vyplaceni', label: 'Vyplacení', order: 6 },
      { value: 'dokonceni', label: 'Dokončení', order: 7 },
    ],
  },
  cadastralStatuses: {
    items: [
      { value: 'podáno', label: 'Podáno', order: 1 },
      { value: 'plomba', label: 'Plomba', order: 2 },
      { value: 'zapsáno', label: 'Zapsáno', order: 3 },
      { value: 'zamítnuto', label: 'Zamítnuto', order: 4 },
      { value: 'zastaveno', label: 'Zastaveno', order: 5 },
    ],
  },
};

async function main() {
  console.log('Lookup tables to seed:', Object.keys(lookups));
  console.log('Seed script stub — connect to Firestore and write lookup documents');

  // TODO: Initialize Firebase Admin, batch-write to lookups/ collection
}

main().catch(console.error);
