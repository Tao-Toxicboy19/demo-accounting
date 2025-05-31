import { JSX } from 'react';
import PageBreadcrumb from '../components/common/page-bread-crumb';
import Card from '../components/common/card';
import {
  nextPage,
  paginationSelector,
  prevPage,
  useAppDispatch,
} from '../services/store';
import { useSelector } from 'react-redux';
import TableTransactions from '../components/tables/transactions/table-transactions';
import FormSavingGoals from '../components/form/saving-goal/form-saving-goals';

export default function SavingGoalPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const pageReducer = useSelector(paginationSelector);

  return (
    <>
      <PageBreadcrumb pageTitle="Saving Goals" />
      <div className="space-y-6">
        <Card
          showModal
          buttonLabel="Add Saving Goal +"
          renderModalContent={(close) => <FormSavingGoals closeModal={close} />}
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
