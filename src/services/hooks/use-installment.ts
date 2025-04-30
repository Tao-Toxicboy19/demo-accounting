import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { InstallmentWithLabelValue, UserWithInstallmentForm } from '../types';
import { addInstallment, getInstallment } from '../api';

export function useInstallment(
  uid: string,
  enabled: boolean,
): UseQueryResult<InstallmentWithLabelValue[], Error> {
  return useQuery<InstallmentWithLabelValue[], Error>({
    queryKey: ['installment', uid],
    queryFn: () => getInstallment(uid),
    enabled: !!uid && enabled,
  });
}

export function useAddInstallment(): UseMutationResult<
  { id: string },
  Error,
  UserWithInstallmentForm
> {
  const queryClient = useQueryClient();

  return useMutation<{ id: string }, Error, UserWithInstallmentForm>({
    mutationFn: (payload: UserWithInstallmentForm) => addInstallment(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['installment', variables.user],
      });
    },
    onError: (error) => console.log(error),
    retry: 1,
  });
}
