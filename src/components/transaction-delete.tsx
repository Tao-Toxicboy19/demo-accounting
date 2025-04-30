import { JSX } from 'react';
import { useCurrentUser, useDeleteTransaction } from '../services/hooks';
import HydrateFallback from '../pages/hydrate-fallback';
import { IdWithUserTransaction } from '../services/types';

type Props = {
  id: string;
};

export default function TransactionDelete({ id }: Props): JSX.Element {
  const { mutate } = useDeleteTransaction();
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) return <HydrateFallback />;

  const handleDeleteTransaction = async (): Promise<void> => {
    const payload: IdWithUserTransaction = {
      user: data.uid,
      id,
    };
    mutate(payload);
  };

  return (
    <a
      onClick={handleDeleteTransaction}
      className="ml-2 text-red-600 hover:text-red-900"
    >
      Delete
    </a>
  );
}
