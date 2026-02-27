/**
 * Czech locale formatting utilities.
 */

const CZ_LOCALE = 'cs-CZ';

/** Format a number as Czech currency (Kč) */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CZ_LOCALE, {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Format a Date or timestamp seconds as Czech date string (d. M. yyyy) */
export function formatDate(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date * 1000) : date;
  return new Intl.DateTimeFormat(CZ_LOCALE, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(d);
}

/** Format a Date as Czech date + time (d. M. yyyy H:mm) */
export function formatDateTime(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date * 1000) : date;
  return new Intl.DateTimeFormat(CZ_LOCALE, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

/** Format hours as "Xh Ym" */
export function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
