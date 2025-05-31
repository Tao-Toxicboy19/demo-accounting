import dayjs from 'dayjs';
import { JSX } from 'react';
import { TrashBinIcon } from '../../../icons';
import Icons from '../../common/icons';
import Badge from '../../ui/badge/badge';
import { TableRow, TableCell } from '../../ui/table';
import {
  CreateTransactionPayload,
  TransactionEntity,
} from '../../../services/types';
import { getCategoryLabel } from '../../../services/utils';
import { categories } from '../../../services/constants';

type Props = {
  index: number;
  item: TransactionEntity;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSelect: (item: Partial<CreateTransactionPayload>) => void;
};

export default function TransactionBodyRow({
  index,
  item,
  onDelete,
  onSelect,
}: Props): JSX.Element {
  const handleOpenModel = (): void =>
    onSelect({
      id: item._id,
      title: item.title,
      amount: item.amount,
      type: item.type,
      note: item.note,
      date: dayjs(item.date).format('YYYY-MM-DD'),
      installmentId: item.installmentId,
      category: item.category,
    });

  return (
    <TableRow key={item._id} onClick={handleOpenModel}>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {index + 1}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs">
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
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {item.amount}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {getCategoryLabel(item.category, categories)}
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
