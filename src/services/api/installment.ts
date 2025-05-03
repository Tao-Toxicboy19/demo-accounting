import {
  Installment,
  InstallmentWithLabelValue,
  UserWithInstallmentForm,
} from '../types';
import { httpClient } from './http-client';

export async function getDropdownInstallment(
  userId: string,
): Promise<InstallmentWithLabelValue[]> {
  const res = await httpClient.post<InstallmentWithLabelValue[]>(
    'installments/dropdown',
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
    'installments/create',
    payload,
  );
  return res.data;
}

export async function getListInstallment(
  userId: string,
): Promise<Installment[]> {
  const res = await httpClient.post<Installment[]>('installments/list', {
    user: userId,
  });
  return res.data;
}
