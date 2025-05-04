import { JSX } from 'react';
import Card from '../components/common/card';
import PageBreadcrumb from '../components/common/page-bread-crumb';
import TableTrasaction from '../components/tables/trasaction/table-trasaction';
import FormTransaction from '../components/form/transactions/form-transaction';

export default function TransactionPage(): JSX.Element {
  return (
    <>
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="space-y-6">
        <Card
          title="Transactions"
          showModal
          buttonLabel="Add Transaction +"
          renderModalContent={(close) => <FormTransaction closeModal={close} />}
        >
          <TableTrasaction />
        </Card>
      </div>
    </>
  );
}
