import { JSX } from 'react';
import { useTransaction } from '../services/hooks/use-transaction';
import dayjs from 'dayjs';
import HydrateFallback from './hydrate-fallback';
import { useCurrentUser } from '../services/hooks/use-auth';

export default function TransactionPage(): JSX.Element {
  const user = useCurrentUser();
  const { data, isPending } = useTransaction(user.data?.uid ?? '');

  if (isPending || user.isPending) {
    return <HydrateFallback />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            No.
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
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
        {data?.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{index + 1}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{item.title}</div>
              {/* <div className="text-sm text-gray-500">Optimization</div> */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {item.type}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {dayjs(item.date).format('DD/MM/YYYY')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.note}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
              <a href="#" className="ml-2 text-red-600 hover:text-red-900">
                Delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
