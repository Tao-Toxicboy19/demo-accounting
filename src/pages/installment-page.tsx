import { JSX } from 'react';
import Button from '../components/button';
import { Link } from 'react-router';
import { path } from '../services/routes/route-path';
import { useCurrentUser, useListInstallment } from '../services/hooks';
import HydrateFallback from './hydrate-fallback';
import dayjs from 'dayjs';
import TransactionDelete from '../components/transaction-delete';

export default function InstallmentPage(): JSX.Element {
  const user = useCurrentUser();
  const { data, isPending } = useListInstallment(user.data?.uid ?? '');

  if (isPending || user.isPending || !data) {
    return <HydrateFallback />;
  }

  return (
    <div>
      <Button
        component={Link}
        to={path.installment.form}
        className="mb-3 w-fit"
      >
        New Installment
      </Button>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Interest Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Paid/Total Months
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Note
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{index + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-3xs">
                <div className="text-sm text-gray-900">{item.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {item.interestRate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {item.paidMonths}/{item.totalMonth}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {item.totalPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {dayjs(item.startDate).format('DD/MM/YYYY')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.note}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <TransactionDelete id={item._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
