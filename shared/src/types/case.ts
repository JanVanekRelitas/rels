import type { Timestamp } from './common';

/** Legal case document — `cases/{spzn}` */
export interface LegalCase {
  spzn: string;
  pripad: string;
  klient: string;
  aktualniStav: string;
  poznamky: string;
  kArchivaci: boolean;
  archivovano: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type LegalCaseInput = Omit<LegalCase, 'createdAt' | 'updatedAt'>;
