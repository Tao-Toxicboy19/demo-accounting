import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  createInstallment,
  fetchInstallmentList,
  fetchInstallmentOptions,
  removeInstallment,
} from '../api';
import {
  InstallmentEntity,
  InstallmentOption,
  CreateInstallmentDto,
  InstallmentIdentifier,
} from '../types';

// 🔑 Query Keys
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

export function useInstallmentList(
  userId: string,
): UseQueryResult<InstallmentEntity[], Error> {
  return useQuery({
    queryKey: INSTALLMENT_KEYS.list(userId),
    queryFn: () => fetchInstallmentList(userId),
    enabled: Boolean(userId),
  });
}

export function useCreateInstallment(): UseMutationResult<
  { id: string },
  Error,
  CreateInstallmentDto
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
