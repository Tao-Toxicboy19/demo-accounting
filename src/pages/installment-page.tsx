import { JSX } from 'react';
import PageBreadcrumb from '../components/common/page-bread-crumb';
import Card from '../components/common/card';
import TableInstallment from '../components/tables/installment/table-installment';
import FormInstallment from '../components/form/installments/form-installment';

export default function InstallmentPage(): JSX.Element {
  return (
    <>
      <PageBreadcrumb pageTitle="Installment" />
      <div className="space-y-6">
        <Card
          title="Installment"
          showModal
          buttonLabel="Add Installment +"
          renderModalContent={(close) => <FormInstallment closeModal={close} />}
        >
          <TableInstallment />
        </Card>
      </div>
    </>
  );
}
