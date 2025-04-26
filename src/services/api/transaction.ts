import { Transaction, UserTransactionForm } from '../types/transaction-type';
import { httpClient } from './http-client';

export async function getTransaction(userId: string): Promise<Transaction[]> {
  const res = await httpClient.post<Transaction[]>('transaction/by-user', {
    userId,
  });
  return res.data;
}

export async function addTransaction(
  payload: UserTransactionForm,
): Promise<Transaction> {
  const res = await httpClient.post<Transaction>('transaction/create', payload);
  return res.data;
}
