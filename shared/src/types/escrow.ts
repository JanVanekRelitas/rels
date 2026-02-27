import type { Timestamp } from './common';

/** Escrow deposit entry — `deals/{spzn}/escrow/{id}` */
export interface EscrowEntry {
  id: string;
  spzn: string;
  castka: number;
  datum: Timestamp;
  typ: 'příjem' | 'výdej';
  popis: string;
  poznamky: string;
  createdAt: Timestamp;
}

export type EscrowEntryInput = Omit<EscrowEntry, 'id' | 'createdAt'>;

/** Escrow bank account — `escrowAccounts/{id}` */
export interface EscrowAccount {
  id: string;
  cisloUctu: string;
  spzn: string;
  klient: string;
  zustatek: number;
  poznamky: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type EscrowAccountInput = Omit<EscrowAccount, 'id' | 'createdAt' | 'updatedAt'>;
