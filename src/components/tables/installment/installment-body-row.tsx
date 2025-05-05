import { JSX } from 'react';
import {
  InstallmentEntity,
  InstallmentFormInput,
} from '../../../services/types';
import { TableRow, TableCell } from '../../ui/table';
import dayjs from 'dayjs';
import { TrashBinIcon } from '../../../icons';
import Icons from '../../common/icons';

type Props = {
  index: number;
  item: InstallmentEntity;
  onDelete: () => void;
  onSelect: (item: Partial<InstallmentFormInput>) => void;
};

export default function InstallmentBodyRow({
  index,
  item,
  onDelete,
  onSelect,
}: Props): JSX.Element {
  const handleOpenModel = (): void =>
    onSelect({
      id: item._id,
      name: item.name,
      totalMonth: item.totalMonth,
      interestRate: item.interestRate,
      totalPrice: item.totalPrice,
      startDate: dayjs(item.startDate).format('YYYY-MM-DD'),
      note: item.note,
      paidMonths: item.paidMonths,
    });

  return (
    <TableRow key={item._id} onClick={handleOpenModel}>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {index + 1}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate max-w-3xs">
        {item.name}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        {item.interestRate}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        {item.paidMonths}/{item.totalMonth}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        {item.totalPrice}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        {dayjs(item.startDate).format('DD/MM/YYYY')}
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
