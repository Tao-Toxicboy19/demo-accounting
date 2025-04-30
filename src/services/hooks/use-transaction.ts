import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { addTransaction, deleteTransaction, getTransaction } from '../api';
import {
  IdWithUserTransaction,
  Transaction,
  UserTransactionForm,
} from '../types';

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
    onError: (error) => console.log(error),
    retry: 1,
  });
}

export function useDeleteTransaction(): UseMutationResult<
  void,
  Error,
  IdWithUserTransaction
> {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IdWithUserTransaction>({
    mutationFn: async (payload: IdWithUserTransaction) => {
      await deleteTransaction(payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['transactions', variables.user],
      });
    },
  });
}
