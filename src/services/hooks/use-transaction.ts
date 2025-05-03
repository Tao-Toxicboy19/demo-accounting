import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchTransactionsByUser,
  createTransaction,
  removeTransaction,
} from '../api';
import {
  CreateTransactionPayload,
  TransactionEntity,
  TransactionIdentifier,
} from '../types';

const TRANSACTION_QUERY_KEY = 'transactions';

export function useTransactionsByUser(
  userId: string,
): UseQueryResult<TransactionEntity[], Error> {
  return useQuery({
    queryKey: [TRANSACTION_QUERY_KEY, userId],
    queryFn: () => fetchTransactionsByUser(userId),
    enabled: Boolean(userId),
  });
}

export function useCreateTransaction(): UseMutationResult<
  TransactionEntity,
  Error,
  CreateTransactionPayload
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (_, { user }) => {
      queryClient.invalidateQueries({
        queryKey: [TRANSACTION_QUERY_KEY, user],
      });
    },
    onError: (error) => {
      console.error('Failed to add transaction:', error);
    },
    retry: 1,
  });
}

export function useRemoveTransaction(): UseMutationResult<
  void,
  Error,
  TransactionIdentifier
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTransaction,
    onSuccess: (_, { user }) => {
      queryClient.invalidateQueries({
        queryKey: [TRANSACTION_QUERY_KEY, user],
      });
    },
    onError: (error) => {
      console.error('Failed to delete transaction:', error);
    },
  });
}
