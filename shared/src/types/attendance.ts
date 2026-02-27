import type { Timestamp } from './common';

/** Single attendance entry for a day */
export interface AttendanceEntry {
  date: Timestamp;
  prichod: string;
  odchod: string;
  hodiny: number;
}

/** Monthly attendance document — `attendance/{yyyy-mm}/{userId}` */
export interface MonthlyAttendance {
  userId: string;
  mesic: string;
  entries: AttendanceEntry[];
  mesicniHodiny: number;
  sazba: number;
  celkem: number;
}
