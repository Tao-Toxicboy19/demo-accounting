import { InstallmentWithLabelValue, UserWithInstallmentForm } from '../types';
import { httpClient } from './http-client';

export async function getInstallment(
  userId: string,
): Promise<InstallmentWithLabelValue[]> {
  const res = await httpClient.post<InstallmentWithLabelValue[]>(
    'installment/by/user',
    {
      user: userId,
    },
  );
  return res.data;
}

export async function addInstallment(
  payload: UserWithInstallmentForm,
): Promise<{ id: string }> {
  const res = await httpClient.post<{ id: string }>(
    'installment/create',
    payload,
  );
  return res.data;
}
