import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTransaction } from '../api/transaction';
import { Transaction } from '../types/transaction-type';

export function useTransaction(
  uid: string,
): UseQueryResult<Transaction[], Error> {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions', uid],
    queryFn: () => getTransaction(uid),
    enabled: !!uid,
  });
}
