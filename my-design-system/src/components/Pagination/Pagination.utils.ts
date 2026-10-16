import type { PaginationItem } from './Pagination.types';

/**
 * Page slots for the desktop number row. Up to 7 pages are all shown; beyond
 * that the list collapses with ellipses, matching the Figma default
 * (`1 2 3 … 8 9 10`) and keeping the current page visible:
 * - near the start:  1 2 3 … n-2 n-1 n
 * - in the middle:   1 … c-1 c c+1 … n
 * - near the end:    1 2 3 … n-2 n-1 n  (current among the last three)
 */
export function getPageItems(current: number, pageCount: number): PaginationItem[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);
  if (current <= 3 || current >= pageCount - 2) {
    return [1, 2, 3, 'ellipsis', pageCount - 2, pageCount - 1, pageCount];
  }
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', pageCount];
}

export const clampPage = (page: number, pageCount: number) => Math.min(Math.max(1, Math.round(page) || 1), Math.max(1, pageCount));
