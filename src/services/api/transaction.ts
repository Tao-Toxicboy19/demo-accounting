import {
  CreateTransactionPayload,
  IncomeAndExpenseSummary,
  TransactionEntity,
  TransactionIdentifier,
} from '../types';
import { httpClient } from './http-client';

const ENDPOINTS = {
  LIST: 'transactions/list',
  CREATE: 'transactions/create',
  DELETE: 'transactions/delete',
  SUMMARY: 'transactions/summary',
  UPDATE: 'transactions/update',
};

export async function fetchTransactionsByUser(
  userId: string,
): Promise<TransactionEntity[]> {
  const res = await httpClient.post<TransactionEntity[]>(ENDPOINTS.LIST, {
    user: userId,
  });
  return res.data;
}

export async function createTransaction(
  payload: CreateTransactionPayload,
): Promise<TransactionEntity> {
  const res = await httpClient.post<TransactionEntity>(
    ENDPOINTS.CREATE,
    payload,
  );
  return res.data;
}

export async function removeTransaction(
  payload: TransactionIdentifier,
): Promise<void> {
  const res = await httpClient.post<void>(ENDPOINTS.DELETE, payload);
  return res.data;
}

export async function getIncomeAndExpenseSummary(
  userId: string,
): Promise<IncomeAndExpenseSummary> {
  const res = await httpClient.post<IncomeAndExpenseSummary>(
    ENDPOINTS.SUMMARY,
    {
      user: userId,
    },
  );
  return res.data;
}

export async function updateTransaction(
  payload: CreateTransactionPayload,
): Promise<TransactionEntity> {
  const res = await httpClient.post<TransactionEntity>(
    ENDPOINTS.UPDATE,
    payload,
  );
  return res.data;
}
