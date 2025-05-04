import dayjs from 'dayjs';
import { JSX } from 'react';
import { TrashBinIcon } from '../../../icons';
import Icons from '../../common/icons';
import Badge from '../../ui/badge/badge';
import { TableRow, TableCell } from '../../ui/table';
import { TransactionEntity } from '../../../services/types';

type Props = {
  index: number;
  item: TransactionEntity;
  onDelete: () => void;
};

export default function TransactionBodyRow({
  index,
  item,
  onDelete,
}: Props): JSX.Element {
  return (
    <TableRow key={item._id}>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {index + 1}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {item.title}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <Badge
          size="sm"
          color={
            item.type === 'income'
              ? 'success'
              : item.type === 'expense'
                ? 'warning'
                : 'error'
          }
        >
          {item.type}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {item.amount}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {dayjs(item.date).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {item.note}
      </TableCell>
      <TableCell className="px-4 py-3 text-theme-sm flex justify-center items-center">
        <button
          onClick={onDelete}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <Icons path={TrashBinIcon} className="w-5 h-5" />
        </button>
      </TableCell>
    </TableRow>
  );
}
