import {
  InstallmentEntity,
  InstallmentOption,
  CreateInstallmentPayload,
  InstallmentIdentifier,
} from '../types';
import { httpClient } from './http-client';

const ENDPOINTS = {
  DROPDOWN: 'installments/dropdown',
  CREATE: 'installments/create',
  LIST: 'installments/list',
  DELETE: 'installments/delete',
  UPDATE: 'installments/update',
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
  payload: CreateInstallmentPayload,
): Promise<{ id: string }> {
  const res = await httpClient.post<{ id: string }>(ENDPOINTS.CREATE, payload);
  return res.data;
}

export async function fetchInstallmentByUser(
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

export async function updateInstallment(
  payload: CreateInstallmentPayload,
): Promise<InstallmentEntity> {
  const res = await httpClient.post<InstallmentEntity>(
    ENDPOINTS.UPDATE,
    payload,
  );
  return res.data;
}
