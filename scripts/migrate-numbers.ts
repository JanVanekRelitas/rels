/**
 * Migration script: Numbers JSON export → Firestore
 *
 * Usage:
 *   npx tsx scripts/migrate-numbers.ts [--dry-run] [--emulator]
 *
 * Reads data-analysis/export.json and imports into Firestore.
 * Requires GOOGLE_APPLICATION_CREDENTIALS env var or --emulator flag.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

// ---- Types ----

interface ExportTable {
  sheet: string;
  table: string;
  headers: string[];
  row_count: number;
  rows: Record<string, unknown>[];
}

interface ExportData {
  _meta: {
    source: string;
    exported_at: string;
    stats: Record<string, number>;
  };
  tables: Record<string, ExportTable>;
}

interface MigrationReport {
  startedAt: string;
  completedAt?: string;
  dryRun: boolean;
  collections: Record<string, { written: number; skipped: number; errors: string[] }>;
  warnings: string[];
}

// ---- Helpers ----

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const USE_EMULATOR = args.includes('--emulator');

function toTimestamp(isoStr: string | null | undefined): Timestamp | null {
  if (!isoStr || typeof isoStr !== 'string') return null;
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return null;
    return Timestamp.fromDate(d);
  } catch {
    return null;
  }
}

function toNumber(val: unknown): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

function toBool(val: unknown): boolean {
  if (typeof val === 'boolean') return val;
  if (val === 'True' || val === 'true' || val === true) return true;
  return false;
}

function toStr(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

function toSpzn(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'number') return String(val);
  return String(val).trim();
}

/** Check if a deal row has any meaningful data beyond defaults */
function isDealEmpty(row: Record<string, unknown>): boolean {
  const nazev = toStr(row.nazev);
  const klient = toStr(row.klient);
  // Empty deal if no name AND no client
  return !nazev && !klient;
}

/** Parse duration strings like "7:00" to hours as number */
function durationToHours(val: unknown): number {
  if (val === null || val === undefined) return 0;
  const s = String(val);
  // Match "H:MM" or "D day(s), H:MM:SS"
  const dayMatch = s.match(/(\d+)\s+day/);
  const timeMatch = s.match(/(\d+):(\d+)/);
  let hours = 0;
  if (dayMatch) hours += parseInt(dayMatch[1]) * 24;
  if (timeMatch) {
    hours += parseInt(timeMatch[1]);
    hours += parseInt(timeMatch[2]) / 60;
  }
  return hours;
}

// ---- Mappers ----

function mapDeal(row: Record<string, unknown>, dbRow: Record<string, unknown> | undefined, nemRow: Record<string, unknown> | undefined, escRow: Record<string, unknown> | undefined) {
  const spzn = toSpzn(row.spzn);
  const now = Timestamp.now();

  // Map phase columns from the REALITNÍ OBCHODY table
  // Phase statuses derived from the data
  const mapPhaseEntry = (dateVal: unknown) => {
    const ts = typeof dateVal === 'string' ? toTimestamp(dateVal) : null;
    // A date means done; a specific text value means pending/na
    const strVal = toStr(dateVal);
    let status: 'done' | 'pending' | 'na' = 'pending';
    if (ts) status = 'done';
    else if (strVal === 'X' || strVal === 'OK' || strVal === 'A') status = 'done';
    else if (strVal === 'BEZ RS' || strVal === '') status = 'na';
    else if (strVal && strVal !== '0') status = 'pending';
    return { date: ts, status };
  };

  // Determine archivovano from the data
  const archivaceDne = toStr(row.archivace_dne);
  const archivovano = !!archivaceDne && archivaceDne !== '0' && archivaceDne !== 'False';

  // Property info from NEMOVITOSTI + databáze
  const nemovitost = {
    adresa: toStr(nemRow?.ulice_nazev_obec || nemRow?.nemovitost || ''),
    lv: '',
    katastr: toStr(dbRow?.katastralní_uzemi || ''),
    parcela: '',
  };

  return {
    spzn,
    nazev: toStr(row.nazev),
    klient: toStr(row.klient),
    typ: 'JINÉ' as const, // will be overridden if databáze has info
    phases: {
      rezervace: mapPhaseEntry(row.rezervace),
      zpracovani: mapPhaseEntry(row.zpracovani),
      finalizace: mapPhaseEntry(row.finalizace_prevodce),
      uschova: mapPhaseEntry(row.uschova_stav),
      katastr: mapPhaseEntry(row.katastr_knv),
      vyplaceni: mapPhaseEntry(row.predano),
      dokonceni: mapPhaseEntry(row.archivace),
    },
    financeSummary: {
      odchozi: 0, // will be computed from payments
      prichozi: 0,
      uschovaTotal: toNumber(escRow?.uschova_celkem || 0),
    },
    cadastralSummary: { total: 0, completed: 0, pending: 0 },
    taskSummary: { total: 0, urgent: 0, overdue: 0 },
    nemovitost,
    poznamky: toStr(row.poznamka),
    uschovniUcet: toStr(row.uschovni_ucet),
    aktivni: toBool(row.aktivni),
    archivovano,
    createdAt: now,
    updatedAt: now,
  };
}

function mapCase(row: Record<string, unknown>) {
  const now = Timestamp.now();
  return {
    spzn: toSpzn(row.spzn),
    pripad: toStr(row.pripad),
    klient: toStr(row.klient),
    aktualniStav: toStr(row.aktualni_stav),
    poznamky: toStr(row.poznamky),
    kArchivaci: toBool(row.k_archivaci),
    archivovano: toBool(row.archivovano),
    createdAt: now,
    updatedAt: now,
  };
}

function mapTask(row: Record<string, unknown>) {
  const now = Timestamp.now();
  return {
    spzn: toSpzn(row.spzn),
    kauza: toStr(row.kauza),
    klient: toStr(row.klient),
    ukol: toStr(row.ukol),
    odhad: toNumber(row.odhad) || null,
    realnyTime: toNumber(row.realny_cas) || null,
    datum: toTimestamp(toStr(row.datum)),
    urgent: toBool(row.urgent),
    lhuta: toTimestamp(toStr(row.lhuta)),
    poznamka: toStr(row.poznamka_ke_zpracovani),
    status: 'pending' as const,
    assignedTo: '',
    createdAt: now,
    updatedAt: now,
  };
}

function mapOutgoingPayment(row: Record<string, unknown>) {
  return {
    spzn: toSpzn(row.spzn),
    direction: 'outgoing' as const,
    castka: toNumber(row.castka),
    datum: null as Timestamp | null,
    typVyplaty: toStr(row.typ_vyplaty),
    poznamka: toStr(row.poznamka),
    podminkaJine: toStr(row.podminka_jine),
    ok: toBool(row.ok),
    vyplaceno: toBool(row.vyplaceno_1) || toBool(row.vyplaceno_2),
    createdAt: Timestamp.now(),
  };
}

function mapIncomingPayment(row: Record<string, unknown>) {
  return {
    spzn: toSpzn(row.spzn),
    direction: 'incoming' as const,
    castka: toNumber(row.castka),
    datum: toTimestamp(toStr(row.datum)),
    createdAt: Timestamp.now(),
  };
}

function mapCadastral(row: Record<string, unknown>) {
  const now = Timestamp.now();

  // Map stav to CadastralStatus
  const rawStav = toStr(row.stav);
  let status = 'podáno';
  if (rawStav === 'V' || rawStav === 'PROVEDENO') status = 'zapsáno';
  else if (rawStav === 'P' || rawStav === 'PLOMBA') status = 'plomba';
  else if (rawStav === 'Z' || rawStav === 'ZAMÍTNUTO') status = 'zamítnuto';
  else if (rawStav === 'ZASTAVENO') status = 'zastaveno';

  return {
    spzn: toSpzn(row.spzn),
    cisloRizeni: toStr(row.cj),
    katastrUrad: toStr(row.podani_ku || row.kp || ''),
    predmet: toStr(row.druh || row.predmet_rizeni || ''),
    datumPodani: toTimestamp(toStr(row.podani_kdy)) || now,
    lhuta: toTimestamp(toStr(row.konec_lhuty)),
    status,
    problem: toStr(row.problem || row.problem_poznamka || ''),
    kDoplneni: toStr(row.k_doplneni),
    poznamky: toStr(row.poznamka || ''),
    createdAt: now,
    updatedAt: now,
  };
}

function mapEscrowAccount(row: Record<string, unknown>) {
  const now = Timestamp.now();
  return {
    cisloUctu: toStr(row.ucet),
    spzn: toSpzn(row.spzn),
    kauza: toStr(row.kauza),
    klient: toStr(row.klient),
    stav: toStr(row.stav),
    zustatek: toNumber(row.zustatek),
    createdAt: now,
    updatedAt: now,
  };
}

function mapSubjekt(row: Record<string, unknown>) {
  return {
    spzn: toSpzn(row.spzn),
    nazev: toStr(row.nazev),
    klient: toStr(row.klient),
  };
}

function mapAttendanceEntry(row: Record<string, unknown>) {
  return {
    datum: toStr(row.datum),
    prichod: toStr(row.prichod),
    odchod: toStr(row.odchod),
    hodiny: durationToHours(row.hodiny),
  };
}

// ---- Main migration ----

async function main() {
  console.log(`RELS Migration Script`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Target: ${USE_EMULATOR ? 'Emulator' : 'Production Firestore'}`);
  console.log('');

  // Load export data
  const exportPath = join(__dirname, '..', 'data-analysis', 'export.json');
  console.log(`Loading ${exportPath}...`);
  const raw = readFileSync(exportPath, 'utf-8');
  const data: ExportData = JSON.parse(raw);
  console.log(`Loaded: ${Object.keys(data.tables).length} tables, ${data._meta.stats.total_rows} rows`);
  console.log('');

  // Initialize Firebase
  if (USE_EMULATOR) {
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    initializeApp({ projectId: 'rels-system' });
  } else {
    const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (credPath) {
      const sa = JSON.parse(readFileSync(credPath, 'utf-8')) as ServiceAccount;
      initializeApp({ credential: cert(sa) });
    } else {
      // Use application default credentials
      initializeApp({ projectId: 'rels-system' });
    }
  }

  const db = getFirestore();
  const BATCH_SIZE = 450; // Firestore max is 500, leave some room

  const report: MigrationReport = {
    startedAt: new Date().toISOString(),
    dryRun: DRY_RUN,
    collections: {},
    warnings: [],
  };

  function initReport(name: string) {
    report.collections[name] = { written: 0, skipped: 0, errors: [] };
  }

  async function commitBatch(batch: FirebaseFirestore.WriteBatch, label: string) {
    if (DRY_RUN) return;
    try {
      await batch.commit();
    } catch (err) {
      const msg = `Batch commit error (${label}): ${err}`;
      console.error(msg);
      report.warnings.push(msg);
    }
  }

  // ---- Build lookup maps ----

  // Index databáze rows by spzn for deal enrichment
  const dbBySpzn = new Map<string, Record<string, unknown>>();
  if (data.tables.databaze) {
    for (const row of data.tables.databaze.rows) {
      const spzn = toSpzn(row.spzn);
      if (spzn) dbBySpzn.set(spzn, row);
    }
    console.log(`  databáze index: ${dbBySpzn.size} entries`);
  }

  // Index nemovitosti by spzn
  const nemBySpzn = new Map<string, Record<string, unknown>>();
  if (data.tables.nemovitosti) {
    for (const row of data.tables.nemovitosti.rows) {
      const spzn = toSpzn(row.spzn);
      if (spzn) nemBySpzn.set(spzn, row);
    }
    console.log(`  nemovitosti index: ${nemBySpzn.size} entries`);
  }

  // Index úschova by spzn
  const escBySpzn = new Map<string, Record<string, unknown>>();
  if (data.tables.uschova) {
    for (const row of data.tables.uschova.rows) {
      const spzn = toSpzn(row.spzn);
      if (spzn) escBySpzn.set(spzn, row);
    }
    console.log(`  úschova index: ${escBySpzn.size} entries`);
  }

  console.log('');

  // ---- 1. Deals (realitni_obchody) ----
  {
    const table = data.tables.realitni_obchody;
    if (table) {
      initReport('deals');
      console.log(`Migrating deals... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn) {
          report.collections.deals.skipped++;
          continue;
        }

        // Skip completely empty deal slots
        if (isDealEmpty(row)) {
          report.collections.deals.skipped++;
          continue;
        }

        const dbRow = dbBySpzn.get(spzn);
        const nemRow = nemBySpzn.get(spzn);
        const escRow = escBySpzn.get(spzn);
        const doc = mapDeal(row, dbRow, nemRow, escRow);

        const ref = db.collection('deals').doc(spzn);
        batch.set(ref, doc);
        batchCount++;
        report.collections.deals.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, `deals batch`);
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'deals final');
      console.log(`  deals: ${report.collections.deals.written} written, ${report.collections.deals.skipped} skipped`);
    }
  }

  // ---- 2. Cases (advokatni_kauzy) ----
  {
    const table = data.tables.advokatni_kauzy;
    if (table) {
      initReport('cases');
      console.log(`Migrating cases... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn) {
          report.collections.cases.skipped++;
          continue;
        }

        const doc = mapCase(row);
        const ref = db.collection('cases').doc(spzn);
        batch.set(ref, doc);
        batchCount++;
        report.collections.cases.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'cases batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'cases final');
      console.log(`  cases: ${report.collections.cases.written} written, ${report.collections.cases.skipped} skipped`);
    }
  }

  // ---- 3. Tasks (ukoly) ----
  {
    const table = data.tables.ukoly;
    if (table) {
      initReport('tasks');
      console.log(`Migrating tasks... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const ukol = toStr(row.ukol);
        if (!ukol) {
          report.collections.tasks.skipped++;
          continue;
        }

        const doc = mapTask(row);
        const ref = db.collection('tasks').doc(); // auto-ID
        batch.set(ref, doc);
        batchCount++;
        report.collections.tasks.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'tasks batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'tasks final');
      console.log(`  tasks: ${report.collections.tasks.written} written, ${report.collections.tasks.skipped} skipped`);
    }
  }

  // ---- 4. Outgoing Payments → deals/{spzn}/payments/ ----
  {
    const table = data.tables.odchozi_platby;
    if (table) {
      initReport('outgoing_payments');
      console.log(`Migrating outgoing payments... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      // Track totals per deal for financeSummary
      const outTotals = new Map<string, number>();

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn || !toNumber(row.castka)) {
          report.collections.outgoing_payments.skipped++;
          continue;
        }

        const doc = mapOutgoingPayment(row);
        const ref = db.collection('deals').doc(spzn).collection('payments').doc();
        batch.set(ref, doc);
        batchCount++;
        report.collections.outgoing_payments.written++;

        outTotals.set(spzn, (outTotals.get(spzn) || 0) + doc.castka);

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'outgoing_payments batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'outgoing_payments final');

      // Update deal financeSummary.odchozi
      if (!DRY_RUN) {
        let updateBatch = db.batch();
        let updateCount = 0;
        for (const [spzn, total] of outTotals) {
          const ref = db.collection('deals').doc(spzn);
          updateBatch.update(ref, { 'financeSummary.odchozi': total });
          updateCount++;
          if (updateCount >= BATCH_SIZE) {
            await commitBatch(updateBatch, 'deal odchozi update');
            updateBatch = db.batch();
            updateCount = 0;
          }
        }
        if (updateCount > 0) await commitBatch(updateBatch, 'deal odchozi update final');
      }

      console.log(`  outgoing payments: ${report.collections.outgoing_payments.written} written, ${report.collections.outgoing_payments.skipped} skipped`);
    }
  }

  // ---- 5. Incoming Payments → deals/{spzn}/payments/ ----
  {
    const table = data.tables.prichozi_platby;
    if (table) {
      initReport('incoming_payments');
      console.log(`Migrating incoming payments... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      const inTotals = new Map<string, number>();

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn || !toNumber(row.castka)) {
          report.collections.incoming_payments.skipped++;
          continue;
        }

        const doc = mapIncomingPayment(row);
        const ref = db.collection('deals').doc(spzn).collection('payments').doc();
        batch.set(ref, doc);
        batchCount++;
        report.collections.incoming_payments.written++;

        inTotals.set(spzn, (inTotals.get(spzn) || 0) + doc.castka);

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'incoming_payments batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'incoming_payments final');

      // Update deal financeSummary.prichozi
      if (!DRY_RUN) {
        let updateBatch = db.batch();
        let updateCount = 0;
        for (const [spzn, total] of inTotals) {
          const ref = db.collection('deals').doc(spzn);
          updateBatch.update(ref, { 'financeSummary.prichozi': total });
          updateCount++;
          if (updateCount >= BATCH_SIZE) {
            await commitBatch(updateBatch, 'deal prichozi update');
            updateBatch = db.batch();
            updateCount = 0;
          }
        }
        if (updateCount > 0) await commitBatch(updateBatch, 'deal prichozi update final');
      }

      console.log(`  incoming payments: ${report.collections.incoming_payments.written} written, ${report.collections.incoming_payments.skipped} skipped`);
    }
  }

  // ---- 6. Cadastral Proceedings (active) → deals/{spzn}/cadastral/ ----
  {
    const table = data.tables['katastralní_rizeni'];
    if (table) {
      initReport('cadastral');
      console.log(`Migrating cadastral proceedings... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn) {
          report.collections.cadastral.skipped++;
          continue;
        }

        const doc = mapCadastral(row);
        const ref = db.collection('deals').doc(spzn).collection('cadastral').doc();
        batch.set(ref, doc);
        batchCount++;
        report.collections.cadastral.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'cadastral batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'cadastral final');
      console.log(`  cadastral: ${report.collections.cadastral.written} written, ${report.collections.cadastral.skipped} skipped`);
    }
  }

  // ---- 7. Archive Cadastral → deals/{spzn}/cadastral/ (with archived flag) ----
  for (const tableKey of ['archiv_katastralní_rizeni', 'archiv_katastralní_rizeni_1'] as const) {
    const table = data.tables[tableKey];
    if (table) {
      const reportKey = `${tableKey}`;
      initReport(reportKey);
      console.log(`Migrating ${tableKey}... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn || spzn === 'SHRNUTÍ') {
          report.collections[reportKey].skipped++;
          continue;
        }

        const doc = {
          ...mapCadastral(row),
          archived: true,
          kauza: toStr(row.kauza),
          nemovitost: toStr(row.nemovitost),
          povoleniVkladu: toStr(row.povoleni_vkladu_skonceni),
        };
        const ref = db.collection('deals').doc(spzn).collection('cadastral').doc();
        batch.set(ref, doc);
        batchCount++;
        report.collections[reportKey].written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, `${tableKey} batch`);
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, `${tableKey} final`);
      console.log(`  ${tableKey}: ${report.collections[reportKey].written} written, ${report.collections[reportKey].skipped} skipped`);
    }
  }

  // ---- 8. Escrow Accounts (uschovni_ucty) ----
  {
    const table = data.tables.uschovni_ucty;
    if (table) {
      initReport('escrowAccounts');
      console.log(`Migrating escrow accounts... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const ucet = toStr(row.ucet);
        if (!ucet || ucet === 'CELKEM') {
          report.collections.escrowAccounts.skipped++;
          continue;
        }

        const doc = mapEscrowAccount(row);
        // Use account number as doc ID (replacing / with -)
        const docId = ucet.replace(/\//g, '-');
        const ref = db.collection('escrowAccounts').doc(docId);
        batch.set(ref, doc);
        batchCount++;
        report.collections.escrowAccounts.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'escrowAccounts batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'escrowAccounts final');
      console.log(`  escrowAccounts: ${report.collections.escrowAccounts.written} written, ${report.collections.escrowAccounts.skipped} skipped`);
    }
  }

  // ---- 9. Subjekty (contacts-like: spzn-to-name directory) ----
  {
    const table = data.tables.subjekty;
    if (table) {
      initReport('subjekty');
      console.log(`Migrating subjekty... (${table.row_count} rows)`);
      let batch = db.batch();
      let batchCount = 0;

      for (const row of table.rows) {
        const spzn = toSpzn(row.spzn);
        if (!spzn) {
          report.collections.subjekty.skipped++;
          continue;
        }

        const doc = mapSubjekt(row);
        const ref = db.collection('subjekty').doc(spzn);
        batch.set(ref, doc);
        batchCount++;
        report.collections.subjekty.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'subjekty batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'subjekty final');
      console.log(`  subjekty: ${report.collections.subjekty.written} written, ${report.collections.subjekty.skipped} skipped`);
    }
  }

  // ---- 10. Attendance (docházka) ----
  {
    const table = data.tables.dochazka_jitka;
    if (table) {
      initReport('attendance');
      console.log(`Migrating attendance (Jitka)... (${table.row_count} rows)`);

      // Group by month
      const byMonth = new Map<string, Array<Record<string, unknown>>>();
      for (const row of table.rows) {
        const datumStr = toStr(row.datum);
        if (!datumStr) continue;
        const d = new Date(datumStr);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (!byMonth.has(monthKey)) byMonth.set(monthKey, []);
        byMonth.get(monthKey)!.push(row);
      }

      let batch = db.batch();
      let batchCount = 0;

      for (const [monthKey, entries] of byMonth) {
        const mappedEntries = entries.map(mapAttendanceEntry);
        const totalHours = mappedEntries.reduce((sum, e) => sum + e.hodiny, 0);

        const doc = {
          userId: 'jitka',
          mesic: monthKey,
          entries: mappedEntries,
          mesicniHodiny: totalHours,
          sazba: 200,
          celkem: totalHours * 200,
        };

        const ref = db.collection('attendance').doc(monthKey).collection('users').doc('jitka');
        batch.set(ref, doc);
        batchCount++;
        report.collections.attendance.written++;

        if (batchCount >= BATCH_SIZE) {
          await commitBatch(batch, 'attendance batch');
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) await commitBatch(batch, 'attendance final');
      console.log(`  attendance: ${report.collections.attendance.written} months written`);
    }
  }

  // ---- 11. Update deal task/cadastral summaries ----
  {
    if (!DRY_RUN) {
      console.log('Updating deal summaries...');

      // Count tasks per deal
      const taskCounts = new Map<string, { total: number; urgent: number }>();
      if (data.tables.ukoly) {
        for (const row of data.tables.ukoly.rows) {
          const spzn = toSpzn(row.spzn);
          if (!spzn) continue;
          const counts = taskCounts.get(spzn) || { total: 0, urgent: 0 };
          counts.total++;
          if (toBool(row.urgent)) counts.urgent++;
          taskCounts.set(spzn, counts);
        }
      }

      let batch = db.batch();
      let count = 0;
      for (const [spzn, counts] of taskCounts) {
        const ref = db.collection('deals').doc(spzn);
        batch.update(ref, {
          'taskSummary.total': counts.total,
          'taskSummary.urgent': counts.urgent,
        });
        count++;
        if (count >= BATCH_SIZE) {
          await commitBatch(batch, 'task summary update');
          batch = db.batch();
          count = 0;
        }
      }
      if (count > 0) await commitBatch(batch, 'task summary update final');
      console.log(`  Updated task summaries for ${taskCounts.size} deals`);
    }
  }

  // ---- Report ----
  report.completedAt = new Date().toISOString();

  console.log('');
  console.log('='.repeat(60));
  console.log('MIGRATION REPORT');
  console.log('='.repeat(60));
  console.log(`Started:   ${report.startedAt}`);
  console.log(`Completed: ${report.completedAt}`);
  console.log(`Dry run:   ${report.dryRun}`);
  console.log('');

  let totalWritten = 0;
  let totalSkipped = 0;
  for (const [name, stats] of Object.entries(report.collections)) {
    console.log(`  ${name}: ${stats.written} written, ${stats.skipped} skipped`);
    totalWritten += stats.written;
    totalSkipped += stats.skipped;
    if (stats.errors.length > 0) {
      for (const err of stats.errors) {
        console.log(`    ERROR: ${err}`);
      }
    }
  }

  console.log('');
  console.log(`Total: ${totalWritten} written, ${totalSkipped} skipped`);

  if (report.warnings.length > 0) {
    console.log('');
    console.log('Warnings:');
    for (const w of report.warnings) {
      console.log(`  - ${w}`);
    }
  }

  // Save report
  const reportPath = join(__dirname, '..', 'data-analysis', 'migration-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
