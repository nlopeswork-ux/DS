import type { HTMLAttributes } from 'react';

/** One slot of the page list: a page number or an ellipsis gap. */
export type PaginationItem = number | 'ellipsis';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total number of pages. */
  pageCount: number;
  /** Controlled current page (1-based). Pair it with `onPageChange`. */
  page?: number;
  /** Initial page when uncontrolled. Default: 1. */
  defaultPage?: number;
  /** Called with the new page when a number or an arrow is activated. */
  onPageChange?: (page: number) => void;
  /** Label of the previous arrow on desktop. Default: "Previous". */
  previousLabel?: string;
  /** Label of the next arrow on desktop. Default: "Next". */
  nextLabel?: string;
}
