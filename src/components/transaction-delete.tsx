import { JSX } from 'react';
import { useCurrentUser, useRemoveTransaction } from '../services/hooks';
import HydrateFallback from '../pages/hydrate-fallback';
import { TransactionIdentifier } from '../services/types';

type Props = {
  id: string;
};

export default function TransactionDelete({ id }: Props): JSX.Element {
  const { mutate } = useRemoveTransaction();
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) return <HydrateFallback />;

  const handleDeleteTransaction = async (): Promise<void> => {
    const payload: TransactionIdentifier = {
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
