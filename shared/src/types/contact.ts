import type { ContactType } from './enums';
import type { Timestamp } from './common';

/** Contact document — `contacts/{id}` */
export interface Contact {
  id: string;
  jmeno: string;
  typ: ContactType;
  rodneCislo: string | null;
  ico: string | null;
  adresa: string;
  telefon: string;
  email: string;
  datovka: string | null;
  poznamky: string;
  linkedDeals: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ContactInput = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
