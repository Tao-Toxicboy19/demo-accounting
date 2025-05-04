import { JSX } from 'react';
import TransactionMetrics from '../components/transactions/transaction-metrics';
import MonthlySalesChart from '../components/transactions/monthly-sales-chart';
import MonthlyTarget from '../components/transactions/monthly-target';

export default function DashboardPage(): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <TransactionMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
      </div>
    </>
  );
}
