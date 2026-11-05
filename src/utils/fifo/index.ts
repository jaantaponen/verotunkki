import {
  calculateFIFOCapitalGains,
  CapitalResults,
  calculateFIFOTransactions,
} from './fifo';
import { Operation, Transaction } from './types';

/**
 * Returns only the transactions whose sell date falls in the given calendar year.
 * Pass `null` for year to return all transactions unchanged.
 */
export function filterTransactionsByYear<T extends Pick<Transaction, 'selldate'>>(
  transactions: T[],
  year: number | null
): T[] {
  if (year === null) return transactions;
  return transactions.filter(t => new Date(t.selldate).getFullYear() === year);
}

/**
 * Returns the sorted list of distinct sell-date years present in the transactions.
 */
export function getSellYears<T extends Pick<Transaction, 'selldate'>>(
  transactions: T[]
): number[] {
  const years = new Set(transactions.map(t => new Date(t.selldate).getFullYear()));
  return Array.from(years).sort((a, b) => a - b);
}

export { calculateFIFOCapitalGains, calculateFIFOTransactions };
export type { CapitalResults, Operation };

