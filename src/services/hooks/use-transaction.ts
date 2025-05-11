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
  getIncomeAndExpenseSummary,
  updateTransaction,
} from '../api';
import {
  CreateTransactionPayload,
  IncomeAndExpenseSummary,
  ResponseTransaction,
  TransactionEntity,
  TransactionIdentifier,
  TransactionsLimitPage,
} from '../types';
import { setTotalPage, useAppDispatch } from '../store';

const TRANSACTION_QUERY_KEY = 'transactions';

export function useTransactionsByUser(
  payload: TransactionsLimitPage,
): UseQueryResult<ResponseTransaction, Error> {
  const dispatch = useAppDispatch();

  const res = useQuery({
    queryKey: [
      TRANSACTION_QUERY_KEY,
      payload.user,
      payload.page,
      payload.limit,
    ],
    queryFn: () => fetchTransactionsByUser(payload),
    enabled: Boolean(payload.user),
  });

  if (res.isSuccess) dispatch(setTotalPage(res.data.totalPage));

  return res;
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

export function useIncomeAndExpenseSummary(
  userId: string,
): UseQueryResult<IncomeAndExpenseSummary, Error> {
  return useQuery({
    queryKey: ['income-and-summary'],
    queryFn: () => getIncomeAndExpenseSummary(userId),
    enabled: Boolean(userId),
  });
}

export function useUpdateTransaction(): UseMutationResult<
  TransactionEntity,
  Error,
  CreateTransactionPayload
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
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
