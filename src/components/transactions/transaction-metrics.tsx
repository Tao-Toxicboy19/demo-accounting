import { JSX } from 'react';
import {
  GroupIcon,
  ArrowUpIcon,
  BoxIconLine,
  ArrowDownIcon,
} from '../../icons';
import Icons from '../common/icons';
import Badge from '../ui/badge/badge';
import { useAuthUser, useIncomeAndExpenseSummary } from '../../services/hooks';

export default function TransactionMetrics(): JSX.Element {
  const { uid } = useAuthUser();
  const { data } = useIncomeAndExpenseSummary(uid);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Icons
            path={GroupIcon}
            className="text-gray-800 size-6 dark:text-white/90"
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Incomes
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.income}
            </h4>
          </div>
          <Badge color="success">
            <Icons path={ArrowUpIcon} />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Icons
            path={BoxIconLine}
            className="text-gray-800 size-6 dark:text-white/90"
          />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Expenses
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.expense}
            </h4>
          </div>

          <Badge color="error">
            <Icons path={ArrowDownIcon} />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
