import { Transaction } from '../types/transaction-type';
import { httpClient } from './http-client';

export async function getTransaction(userId: string): Promise<Transaction[]> {
  const res = await httpClient.post<Transaction[]>('transaction/by-user', {
    userId,
  });
  return res.data;
}
