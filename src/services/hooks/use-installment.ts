import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  addInstallment,
  getDropdownInstallment,
  getListInstallment,
} from '../api';
import {
  Installment,
  InstallmentWithLabelValue,
  UserWithInstallmentForm,
} from '../types';

export function useDropdownInstallment(
  uid: string,
  enabled: boolean,
): UseQueryResult<InstallmentWithLabelValue[], Error> {
  return useQuery<InstallmentWithLabelValue[], Error>({
    queryKey: ['installment-dropdown', uid],
    queryFn: () => getDropdownInstallment(uid),
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
        queryKey: ['installment-dropdown', variables.user],
      });
      queryClient.invalidateQueries({
        queryKey: ['installment-list', variables.user],
      });
    },
    onError: (error) => console.log(error),
    retry: 1,
  });
}

export function useListInstallment(
  uid: string,
): UseQueryResult<Installment[], Error> {
  return useQuery<Installment[], Error>({
    queryKey: ['installment-list', uid],
    queryFn: () => getListInstallment(uid),
    enabled: !!uid,
  });
}
