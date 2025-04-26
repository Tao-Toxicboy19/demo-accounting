import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { addTransaction, getTransaction } from '../api/transaction';
import { Transaction, UserTransactionForm } from '../types/transaction-type';

export function useTransaction(
  uid: string,
): UseQueryResult<Transaction[], Error> {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions', uid],
    queryFn: () => getTransaction(uid),
    enabled: !!uid,
  });
}

export function useAddTransaction(): UseMutationResult<
  Transaction,
  Error,
  UserTransactionForm
> {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, UserTransactionForm>({
    mutationFn: (payload: UserTransactionForm) => addTransaction(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['transactions', variables.user],
      });
    },
  });
}
