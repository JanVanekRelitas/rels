/**
 * Firebase Timestamp placeholder.
 * In Firestore SDK context, use `firebase.firestore.Timestamp`.
 * This type is used for shared interfaces that work across client and server.
 */
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

/** Generic lookup item used in helper/lookup tables */
export interface LookupItem {
  value: string;
  label: string;
  order: number;
}

/** Lookup table document — `lookups/{type}` */
export interface LookupTable {
  items: LookupItem[];
}

/** Firebase Auth custom claims */
export interface UserClaims {
  role: 'lawyer' | 'assistant' | 'client';
  linkedDeals?: string[];
}
