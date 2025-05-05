import { JSX, useState } from 'react';
import InstallmentHeaderRow from './installment-header-row';
import { Table, TableBody } from '../../ui/table';
import InstallmentBodyRow from './installment-body-row';
import {
  useAuthUser,
  useInstallmentByUser,
  useRemoveInstallment,
} from '../../../services/hooks';
import { useModal } from '../../../services/hooks/use-modal';
import { InstallmentFormInput } from '../../../services/types';
import Modal from '../../ui/modal';
import FormInstallment from '../../form/installments/form-installment';

export default function TableInstallment(): JSX.Element {
  const { uid } = useAuthUser();
  const { data } = useInstallmentByUser(uid);
  const { mutate } = useRemoveInstallment();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedInstallment, setSelectedInstallment] =
    useState<Partial<InstallmentFormInput>>();

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
                onSelect={(item) => {
                  setSelectedInstallment(item);
                  openModal();
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
          {selectedInstallment && (
            <FormInstallment
              closeModal={closeModal}
              defaultValues={selectedInstallment}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
