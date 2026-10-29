import { Fragment, useState } from 'react';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { cn } from '../utils/cn';
import data from '../../docs/sync-status.json';

/**
 * Sync status table: one row per component, one column per check, code and Figma side by side.
 * Reads docs/sync-status.json, which `npm run sync-status` writes. The page never computes
 * anything itself, so it can only be as fresh as that file (the banner says how old the Figma
 * snapshot is).
 */

type Row = (typeof data.rows)[number];
type Filter = 'all' | 'attention' | 'match' | 'not mirrored';

const statusColor = (status: string) => (status === 'match' ? 'Success' : status === 'drift' ? 'Warning' : status === 'missing in Figma' ? 'Error' : 'Gray');
const statusLabel = (status: string) => (status === 'match' ? 'Match' : status === 'drift' ? 'Differs' : status === 'missing in Figma' ? 'Missing in Figma' : 'Not mirrored');

const CheckCell = ({ value }: { value: boolean | null }) =>
  value === null ? (
    <span className="text-quaternary">-</span>
  ) : (
    <Badge size="sm" color={value ? 'Success' : 'Error'}>
      {value ? 'Yes' : 'No'}
    </Badge>
  );

const Findings = ({ row }: { row: Row }) => (
  <div className="flex flex-col gap-md px-xl py-lg">
    {row.why && <div className="text-sm text-tertiary">Not mirrored: {row.why}.</div>}
    {row.note && <div className="text-sm text-tertiary">Note: {row.note}.</div>}
    {row.issues.map((issue) => (
      <div key={issue.message} className="text-sm text-secondary">
        <span className="font-semibold text-primary">{data.checks.find((c) => c.id === issue.check)?.label ?? issue.check}:</span> {issue.message}
      </div>
    ))}
    {row.figma.length > 0 && <div className="text-sm text-tertiary">Figma: {row.figma.join(', ')}</div>}
    <div className="text-sm text-tertiary">Code props: {row.codeProps.join(', ') || 'none'}</div>
  </div>
);

export const SyncStatusTable = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<string | null>(null);
  const rows = data.rows.filter((r) => (filter === 'all' ? true : filter === 'attention' ? r.status === 'drift' || r.status === 'missing in Figma' : r.status === filter));
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: data.rows.length },
    { id: 'attention', label: 'Needs attention', count: data.counts.drift + data.counts.missing },
    { id: 'match', label: 'Match', count: data.counts.match },
    { id: 'not mirrored', label: 'Not mirrored', count: data.counts.notMirrored },
  ];

  return (
    <div className="not-prose flex flex-col gap-3xl">
      <div className="flex flex-col gap-md rounded-lg border border-secondary bg-secondary p-xl text-sm text-secondary">
        {data.summary.filter((line) => line !== data.howToRefresh).map((line) => (
          <div key={line}>
            {line}
          </div>
        ))}
        {data.snapshot.codeNewer && (
          <div className="font-semibold text-primary">The code changed after the last Figma snapshot, so the Figma side may be out of date.</div>
        )}
      </div>

      <div role="tablist" aria-label="Filter components" className="flex flex-wrap gap-sm">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'cursor-pointer rounded-md border px-lg py-sm text-sm font-semibold',
              filter === f.id ? 'border-secondary bg-primary text-primary' : 'border-transparent bg-secondary text-tertiary hover:text-secondary',
            )}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-secondary">
        <table className="m-0 w-full border-collapse text-sm">
          <thead>
            <tr className="bg-secondary text-left text-tertiary">
              <th scope="col" className="px-xl py-lg font-semibold">
                Component
              </th>
              <th scope="col" className="px-xl py-lg font-semibold">
                Status
              </th>
              {data.checks.map((c) => (
                <th key={c.id} scope="col" title={c.means} className="px-xl py-lg font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const expandable = row.issues.length > 0 || row.why || row.note;
              const isOpen = open === row.name;
              return (
                <Fragment key={row.name}>
                  <tr className="border-t border-secondary">
                    <th scope="row" className="px-xl py-lg text-left font-semibold text-primary">
                      {expandable ? (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpen(isOpen ? null : row.name)}
                          className="inline-flex cursor-pointer items-center gap-xs border-0 bg-transparent p-0 font-semibold text-primary"
                        >
                          <Icon name={isOpen ? 'expand_more' : 'chevron_right'} size="xs" />
                          {row.name}
                        </button>
                      ) : (
                        row.name
                      )}
                    </th>
                    <td className="px-xl py-lg">
                      <Badge size="sm" color={statusColor(row.status)}>
                        {statusLabel(row.status)}
                      </Badge>
                    </td>
                    {data.checks.map((c) => (
                      <td key={c.id} className="px-xl py-lg">
                        <CheckCell value={(row.checks as Record<string, boolean | null>)[c.id]} />
                      </td>
                    ))}
                  </tr>
                  {isOpen && (
                    <tr className="bg-secondary">
                      <td colSpan={2 + data.checks.length}>
                        <Findings row={row} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.figmaOnly.length > 0 && (
        <div className="flex flex-col gap-md">
          <h3 className="kds-h3 m-0">In Figma, not in code yet</h3>
          <div className="flex flex-wrap gap-sm">
            {data.figmaOnly.map((name) => (
              <Badge key={name} size="sm" color="Gray">
                {name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-tertiary">{data.howToRefresh}</div>
    </div>
  );
};
