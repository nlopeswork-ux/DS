import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import type { PaginationProps } from './Pagination.types';

interface PaginationPlaygroundProps extends Omit<PaginationProps, 'page' | 'defaultPage'> {
  /** Story-only: the starting page; changing it resets the preview to that page. */
  startPage: number;
}

/**
 * Story-only wrapper: keeps the page in state so clicking numbers and arrows
 * really navigates, and remounts when the starting page or the page count change.
 */
const PaginationPlayground = ({ startPage, pageCount, ...props }: PaginationPlaygroundProps) => (
  <div className="w-[1216px] max-w-full">
    <Pagination key={`${startPage}-${pageCount}`} {...props} pageCount={pageCount} defaultPage={startPage} />
  </div>
);

const meta = {
  title: 'Components/Pagination',
  component: PaginationPlayground,
  // The Docs page comes from Pagination.mdx (<Meta of={PaginationStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'padded',
    controls: { expanded: false },
  },
  args: {
    pageCount: 10,
    startPage: 1,
    previousLabel: 'Previous',
    nextLabel: 'Next',
  },
  argTypes: {
    pageCount: { name: 'Page Count', description: 'Total number of pages.', control: { type: 'number', min: 1, max: 99 } },
    startPage: { name: 'Current Page', description: 'Starting page. Click the numbers and arrows to navigate.', control: { type: 'number', min: 1, max: 99 } },
    previousLabel: { name: 'Previous Label', description: 'Desktop label of the previous arrow.', control: 'text' },
    nextLabel: { name: 'Next Label', description: 'Desktop label of the next arrow.', control: 'text' },
    // Technical noise — kept out of the Live Playground.
    onPageChange: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof PaginationPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — navigate with the numbers and the arrows. */
export const Playground: Story = {};

/**
 * How the number row collapses as the current page moves.
 * Outside the sidebar (`!dev`) — embedded in Pagination.mdx via `<Canvas of={PaginationStories.Windowing} />`.
 */
export const Windowing: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex w-full max-w-[900px] flex-col gap-2xl">
      {[
        { label: '5 pages — all shown', pageCount: 5, page: 3 },
        { label: '10 pages, page 1 — start', pageCount: 10, page: 1 },
        { label: '10 pages, page 5 — middle', pageCount: 10, page: 5 },
        { label: '10 pages, page 10 — end', pageCount: 10, page: 10 },
      ].map(({ label, pageCount, page }) => (
        <div key={label} className="flex flex-col gap-md">
          <span className="text-sm font-medium text-secondary">{label}</span>
          <Pagination pageCount={pageCount} page={page} onPageChange={() => {}} />
        </div>
      ))}
    </div>
  ),
};

const Controlled = () => {
  const [page, setPage] = useState(4);
  return (
    <div className="flex w-full max-w-[900px] flex-col gap-lg">
      <p className="text-sm text-tertiary">
        Showing results for page <strong className="text-secondary">{page}</strong>
      </p>
      <Pagination pageCount={24} page={page} onPageChange={setPage} />
    </div>
  );
};

/**
 * Controlled usage — the page lives in the parent.
 * Outside the sidebar (`!dev`) — embedded in Pagination.mdx via `<Canvas of={PaginationStories.ControlledExample} />`.
 */
export const ControlledExample: Story = {
  tags: ['!dev'],
  render: () => <Controlled />,
};
