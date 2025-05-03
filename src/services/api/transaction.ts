import {
  CreateTransactionPayload,
  TransactionEntity,
  TransactionIdentifier,
} from '../types';
import { httpClient } from './http-client';

const ENDPOINT = {
  LIST: 'transactions/list',
  CREATE: 'transactions/create',
  DELETE: 'transactions/delete',
};

export async function fetchTransactionsByUser(
  userId: string,
): Promise<TransactionEntity[]> {
  const res = await httpClient.post<TransactionEntity[]>(ENDPOINT.LIST, {
    user: userId,
  });
  return res.data;
}

export async function createTransaction(
  payload: CreateTransactionPayload,
): Promise<TransactionEntity> {
  const res = await httpClient.post<TransactionEntity>(
    ENDPOINT.CREATE,
    payload,
  );
  return res.data;
}

export async function removeTransaction(
  payload: TransactionIdentifier,
): Promise<void> {
  const res = await httpClient.post<void>(ENDPOINT.DELETE, payload);
  return res.data;
}
