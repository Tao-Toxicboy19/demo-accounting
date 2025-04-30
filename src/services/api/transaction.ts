import {
  IdWithUserTransaction,
  Transaction,
  UserTransactionForm,
} from '../types/transaction-type';
import { httpClient } from './http-client';

export async function getTransaction(userId: string): Promise<Transaction[]> {
  const res = await httpClient.post<Transaction[]>('transaction/by/user', {
    user: userId,
  });
  return res.data;
}

export async function addTransaction(
  payload: UserTransactionForm,
): Promise<Transaction> {
  const res = await httpClient.post<Transaction>('transaction/create', payload);
  return res.data;
}

export async function deleteTransaction(
  payload: IdWithUserTransaction,
): Promise<void> {
  const res = await httpClient.post<void>('transaction/delete', payload);
  return res.data;
}
