import { JSX } from 'react';
import InstallmentHeaderRow from './installment-header-row';
import { Table, TableBody } from '../../ui/table';
import InstallmentBodyRow from './installment-body-row';
import {
  useAuthUser,
  useInstallmentByUser,
  useRemoveInstallment,
} from '../../../services/hooks';

export default function TableInstallment(): JSX.Element {
  const { uid } = useAuthUser();
  const { data } = useInstallmentByUser(uid);
  const { mutate } = useRemoveInstallment();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <InstallmentHeaderRow />
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((item, index) => (
              <InstallmentBodyRow
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
