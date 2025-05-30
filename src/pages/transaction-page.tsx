import { JSX } from 'react';
import Card from '../components/common/card';
import PageBreadcrumb from '../components/common/page-bread-crumb';
import FormTransaction from '../components/form/transactions/form-transaction';
import {
  nextPage,
  paginationSelector,
  prevPage,
  useAppDispatch,
} from '../services/store';
import { useSelector } from 'react-redux';
import TableTransactions from '../components/tables/transactions/table-transactions';

export default function TransactionPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const pageReducer = useSelector(paginationSelector);

  return (
    <>
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="space-y-6">
        <Card
          showModal
          buttonLabel="Add Transaction +"
          renderModalContent={(close) => <FormTransaction closeModal={close} />}
          isShowSkipPage
          page={pageReducer.page}
          totalPage={pageReducer.totalPage}
          nextPage={() => dispatch(nextPage())}
          prevPage={() => dispatch(prevPage())}
        >
          <TableTransactions />
        </Card>
      </div>
    </>
  );
}
