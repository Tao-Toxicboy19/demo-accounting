import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  createInstallment,
  fetchInstallmentByUser,
  fetchInstallmentOptions,
  removeInstallment,
} from '../api';
import {
  InstallmentEntity,
  InstallmentOption,
  CreateInstallmentPayload,
  InstallmentIdentifier,
} from '../types';

const INSTALLMENT_KEYS = {
  dropdown: (userId: string) => ['installment-dropdown', userId],
  list: (userId: string) => ['installment-list', userId],
};

export function useInstallmentDropdown(
  userId: string,
  enabled = true,
): UseQueryResult<InstallmentOption[], Error> {
  return useQuery({
    queryKey: INSTALLMENT_KEYS.dropdown(userId),
    queryFn: () => fetchInstallmentOptions(userId),
    enabled: Boolean(userId) && enabled,
  });
}

export function useInstallmentByUser(
  userId: string,
): UseQueryResult<InstallmentEntity[], Error> {
  return useQuery({
    queryKey: INSTALLMENT_KEYS.list(userId),
    queryFn: () => fetchInstallmentByUser(userId),
    enabled: Boolean(userId),
  });
}

export function useCreateInstallment(): UseMutationResult<
  { id: string },
  Error,
  CreateInstallmentPayload
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInstallment,
    onSuccess: (_, variables) => {
      const userId = variables.user;
      queryClient.invalidateQueries({
        queryKey: INSTALLMENT_KEYS.dropdown(userId),
      });
      queryClient.invalidateQueries({
        queryKey: INSTALLMENT_KEYS.list(userId),
      });
    },
    onError: (error) => {
      console.error('CreateInstallment error:', error);
    },
    retry: 1,
  });
}

export function useRemoveInstallment(): UseMutationResult<
  void,
  Error,
  InstallmentIdentifier
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeInstallment,
    onSuccess: (_, { user }) => {
      const userId = user;
      queryClient.invalidateQueries({
        queryKey: INSTALLMENT_KEYS.dropdown(userId),
      });
      queryClient.invalidateQueries({
        queryKey: INSTALLMENT_KEYS.list(userId),
      });
    },
    onError: (error) => {
      console.error('Failed to delete transaction:', error);
    },
  });
}
