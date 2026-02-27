/**
 * SP.ZN. (spisová značka / file number) utilities.
 *
 * Format: numeric string, e.g. "500123" (deal) or "636001" (legal case).
 * - 500xxx = real estate deals
 * - 636xxx = legal (advocacy) cases
 */

/** Check whether a string is a valid SP.ZN. */
export function isValidSpzn(value: string): boolean {
  return /^\d{6}$/.test(value);
}

/** Determine if SP.ZN. belongs to a real estate deal (500xxx) */
export function isDealSpzn(spzn: string): boolean {
  return spzn.startsWith('500') || spzn.startsWith('501');
}

/** Determine if SP.ZN. belongs to a legal case (636xxx) */
export function isCaseSpzn(spzn: string): boolean {
  return spzn.startsWith('636');
}

/** Format SP.ZN. for display */
export function formatSpzn(spzn: string): string {
  return `SP.ZN. ${spzn}`;
}

/** Parse SP.ZN. from a string that may contain the "SP.ZN." prefix or extra whitespace */
export function parseSpzn(input: string): string | null {
  const match = input.replace(/\s+/g, '').match(/(?:SP\.?ZN\.?\s*)?(\d{6})/i);
  return match ? match[1] : null;
}
