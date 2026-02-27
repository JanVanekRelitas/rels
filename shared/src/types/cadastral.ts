import type { CadastralStatus } from './enums';
import type { Timestamp } from './common';

/** Cadastral proceeding — `deals/{spzn}/cadastral/{id}` */
export interface CadastralProceeding {
  id: string;
  spzn: string;
  cisloRizeni: string;
  katastrUrad: string;
  predmet: string;
  datumPodani: Timestamp;
  lhuta: Timestamp | null;
  status: CadastralStatus;
  poznamky: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CadastralProceedingInput = Omit<CadastralProceeding, 'id' | 'createdAt' | 'updatedAt'>;
