import type { PaymentDirection } from './enums';
import type { Timestamp } from './common';

/** Payment document — `deals/{spzn}/payments/{id}` */
export interface Payment {
  id: string;
  spzn: string;
  direction: PaymentDirection;
  castka: number;
  datum: Timestamp;
  popis: string;
  variabilniSymbol: string;
  protiucet: string;
  poznamky: string;
  createdAt: Timestamp;
}

export type PaymentInput = Omit<Payment, 'id' | 'createdAt'>;
