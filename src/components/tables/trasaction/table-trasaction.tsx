import { JSX, useState } from 'react';
import {
  useAuthUser,
  useTransactionsByUser,
  useRemoveTransaction,
} from '../../../services/hooks';
import { Table, TableBody } from '../../ui/table';
import TransactionBodyRow from './transaction-body-row';
import TransactionHeaderRow from './transaction-header-row';
import Modal from '../../ui/modal';
import { useModal } from '../../../services/hooks/use-modal';
import FormTransaction from '../../form/transactions/form-transaction';
import { CreateTransactionPayload } from '../../../services/types';

export default function TableTransaction(): JSX.Element {
  const { uid } = useAuthUser();
  const { data } = useTransactionsByUser(uid);
  const { mutate } = useRemoveTransaction();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Partial<CreateTransactionPayload>>();

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
                onSelect={(item) => {
                  setSelectedTransaction(item);
                  openModal();
                }}
                onDelete={(evnet) => {
                  evnet.stopPropagation();
                  mutate({ user: uid, id: item._id });
                }}
              />
            ))}
          </TableBody>
        </Table>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          {selectedTransaction && (
            <FormTransaction
              closeModal={closeModal}
              defaultValues={selectedTransaction}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
