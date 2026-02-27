import type { DealType, DealPhase, PhaseStatus } from './enums';
import type { Timestamp } from './common';

/** Phase entry with date and status */
export interface PhaseEntry {
  date: Timestamp | null;
  status: PhaseStatus;
}

/** All phases on a deal, keyed by phase identifier */
export type DealPhases = Record<DealPhase, PhaseEntry>;

/** Denormalized finance summary on deal doc */
export interface FinanceSummary {
  odchozi: number;
  prichozi: number;
  uschovaTotal: number;
}

/** Denormalized cadastral summary on deal doc */
export interface CadastralSummary {
  total: number;
  completed: number;
  pending: number;
}

/** Denormalized task summary on deal doc */
export interface TaskSummary {
  total: number;
  urgent: number;
  overdue: number;
}

/** Property (nemovitost) info embedded in deal */
export interface PropertyInfo {
  adresa: string;
  lv: string;
  katastr: string;
  parcela: string;
}

/** Deal document — `deals/{spzn}` */
export interface Deal {
  spzn: string;
  nazev: string;
  klient: string;
  typ: DealType;
  phases: DealPhases;
  financeSummary: FinanceSummary;
  cadastralSummary: CadastralSummary;
  taskSummary: TaskSummary;
  nemovitost: PropertyInfo;
  poznamky: string;
  archivovano: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** Create/update payload (without server-generated fields) */
export type DealInput = Omit<Deal, 'createdAt' | 'updatedAt'>;
