/** Deal type — typ obchodu */
export type DealType =
  | 'PRODEJ'
  | 'KOUPĚ'
  | 'PŘEVOD'
  | 'DAROVÁNÍ'
  | 'SMĚNA'
  | 'VYPOŘÁDÁNÍ_SJM'
  | 'JINÉ';

/** Phase status for each deal phase */
export type PhaseStatus = 'done' | 'pending' | 'na';

/** Deal phase identifiers (column order on dashboard) */
export type DealPhase =
  | 'rezervace'
  | 'zpracovani'
  | 'finalizace'
  | 'uschova'
  | 'katastr'
  | 'vyplaceni'
  | 'dokonceni';

/** Task status */
export type TaskStatus = 'pending' | 'in_progress' | 'done';

/** Contact type — fyzická/právnická osoba */
export type ContactType = 'fyzická' | 'právnická';

/** User roles for Firebase Auth custom claims */
export type UserRole = 'lawyer' | 'assistant' | 'client';

/** Payment direction */
export type PaymentDirection = 'incoming' | 'outgoing';

/** Cadastral proceeding status */
export type CadastralStatus = 'podáno' | 'plomba' | 'zapsáno' | 'zamítnuto' | 'zastaveno';

/** Lookup table types */
export type LookupType =
  | 'procedureTypes'
  | 'approvalStatuses'
  | 'actionCodes'
  | 'dealTypes'
  | 'phases';
