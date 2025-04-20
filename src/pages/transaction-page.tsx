import { JSX } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { logout } from '../services/sing-out';
import { useSelector } from 'react-redux';
import { authSelector } from '../services/store/features/auth-slice';

export default function TransactionPage(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const userReducer = useSelector(authSelector);
  const handleLogout = async (): Promise<void> => {
    const res = await logout();
    if (res) navigate('/login');
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-gray-600">
            {userReducer.user?.displayName}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  Regional Paradigm Technician
                </div>
                <div className="text-sm text-gray-500">Optimization</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                jane.cooper@example.com
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
    </div>
  );
}
