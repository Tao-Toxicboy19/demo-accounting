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
import { paginationSelector, setTotalPage, useAppDispatch } from '../store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const TRANSACTION_QUERY_KEY = 'transactions';
const INCOME_AND_SUMMARY_KEY = 'income-and-summary';

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

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(setTotalPage(res.data.totalPage));
    }
  }, [res.isSuccess, res.data?.totalPage, dispatch]);

  return res;
}

export function useCreateTransaction(): UseMutationResult<
  TransactionEntity,
  Error,
  CreateTransactionPayload
> {
  const queryClient = useQueryClient();
  const pageReducer = useSelector(paginationSelector);

  return useMutation({
    mutationFn: createTransaction,

    onMutate: async (tx) => {
      queryClient.setQueryData<IncomeAndExpenseSummary>(
        [INCOME_AND_SUMMARY_KEY, tx.user],
        (oldData) => {
          if (!oldData) return oldData;

          const income = oldData.income ?? 0;
          const expense = oldData.expense ?? 0;
          const amt = +tx.amount;

          return tx.type === 'income'
            ? { income: income + amt, expense }
            : { income, expense: expense + amt };
        },
      );
      queryClient.setQueryData<ResponseTransaction>(
        [TRANSACTION_QUERY_KEY, tx.user, pageReducer.page, pageReducer.limit],
        (res) => {
          if (!res) return res;
          const fakeTransaction: TransactionEntity = {
            ...tx,
            _id: uuidv4(),
            date: new Date(),
          };
          return {
            ...res,
            items: [fakeTransaction, ...res.items],
          };
        },
      );
    },

    onSuccess: (_, { user }) => {
      queryClient.invalidateQueries({
        queryKey: [
          TRANSACTION_QUERY_KEY,
          user,
          pageReducer.page,
          pageReducer.limit,
        ],
      });
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
  const pageReducer = useSelector(paginationSelector);

  return useMutation({
    mutationFn: removeTransaction,
    onMutate: async (tx) => {
      const transactionEntity = tx.transactionEntity;
      if (!transactionEntity) return;

      queryClient.setQueryData<IncomeAndExpenseSummary>(
        [INCOME_AND_SUMMARY_KEY, tx.user],
        (oldData) => {
          if (!oldData) return oldData;

          const income = oldData.income ?? 0;
          const expense = oldData.expense ?? 0;
          const amt = +transactionEntity.amount;

          return transactionEntity.type === 'income'
            ? { income: income - amt, expense }
            : { income, expense: expense - amt };
        },
      );
      queryClient.setQueryData<ResponseTransaction>(
        [TRANSACTION_QUERY_KEY, tx.user, pageReducer.page, pageReducer.limit],
        (res) => {
          if (!res) return res;
          const transactions = res.items.filter((item) => item._id !== tx.id);

          return {
            ...res,
            items: transactions,
          };
        },
      );
    },

    onError: (error) => {
      console.error('Failed to delete transaction:', error);
    },
  });
}

export function useUpdateTransaction(): UseMutationResult<
  TransactionEntity,
  Error,
  CreateTransactionPayload
> {
  const queryClient = useQueryClient();
  const pageReducer = useSelector(paginationSelector);
  return useMutation({
    mutationFn: updateTransaction,
    onMutate: async (tx) => {
      const queryKey = [
        TRANSACTION_QUERY_KEY,
        tx.user,
        pageReducer.page,
        pageReducer.limit,
      ];

      const prevTx = queryClient.getQueryData<ResponseTransaction>(queryKey);

      queryClient.setQueryData<ResponseTransaction>(queryKey, (res) => {
        if (!res) return res;
        const index = res.items.findIndex((item) => item._id === tx.id);
        if (index !== -1) {
          const updatedTransaction: TransactionEntity = {
            ...res.items[index],
            ...tx,
            _id: res.items[index]._id,
            date: new Date(tx.date),
          };

          const newItems = [...res.items];
          newItems[index] = updatedTransaction;

          return {
            ...res,
            items: newItems,
          };
        }

        return res;
      });

      return { prevTx, queryKey };
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
    queryKey: [INCOME_AND_SUMMARY_KEY, userId],
    queryFn: () => getIncomeAndExpenseSummary(userId),
    enabled: Boolean(userId),
  });
}
