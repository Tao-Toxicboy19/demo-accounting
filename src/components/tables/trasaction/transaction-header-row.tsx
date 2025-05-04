import clsx from 'clsx';
import { JSX } from 'react';
import { TableHeader, TableRow, TableCell } from '../../ui/table';

const TABLE_HEADERS: string[] = [
  'No.',
  'Name',
  'Type',
  'Amount',
  'Date',
  'Note',
  'Actions',
];

export default function TransactionHeaderRow(): JSX.Element {
  return (
    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
      <TableRow>
        {TABLE_HEADERS.map((item, index) => (
          <TableCell
            key={item}
            isHeader
            className={clsx(
              'px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400',
              index === TABLE_HEADERS.length - 1 ? 'text-center' : 'text-start',
            )}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );
}
