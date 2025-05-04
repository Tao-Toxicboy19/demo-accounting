import {
  InstallmentEntity,
  InstallmentOption,
  CreateInstallmentDto,
  InstallmentIdentifier,
} from '../types';
import { httpClient } from './http-client';

const ENDPOINTS = {
  DROPDOWN: 'installments/dropdown',
  CREATE: 'installments/create',
  LIST: 'installments/list',
  DELETE: 'installments/delete',
};

export async function fetchInstallmentOptions(
  userId: string,
): Promise<InstallmentOption[]> {
  const res = await httpClient.post<InstallmentOption[]>(ENDPOINTS.DROPDOWN, {
    user: userId,
  });
  return res.data;
}

export async function createInstallment(
  payload: CreateInstallmentDto,
): Promise<{ id: string }> {
  const res = await httpClient.post<{ id: string }>(ENDPOINTS.CREATE, payload);
  return res.data;
}

export async function fetchInstallmentList(
  userId: string,
): Promise<InstallmentEntity[]> {
  const res = await httpClient.post<InstallmentEntity[]>(ENDPOINTS.LIST, {
    user: userId,
  });
  return res.data;
}

export async function removeInstallment(
  payload: InstallmentIdentifier,
): Promise<void> {
  const res = await httpClient.post<void>(ENDPOINTS.DELETE, payload);
  return res.data;
}
