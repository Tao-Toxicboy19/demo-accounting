import { JSX } from 'react';
import {
  useAuthUser,
  useTransactionsByUser,
  useRemoveTransaction,
} from '../../../services/hooks';
import { Table, TableBody } from '../../ui/table';
import TransactionBodyRow from './transaction-body-row';
import TransactionHeaderRow from './transaction-header-row';

export default function TableTransaction(): JSX.Element {
  const { uid } = useAuthUser();
  const { data } = useTransactionsByUser(uid);
  const { mutate } = useRemoveTransaction();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TransactionHeaderRow />
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((item, index) => (
              <TransactionBodyRow
                key={item._id}
                index={index}
                item={item}
                onDelete={() => mutate({ user: uid, id: item._id })}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
