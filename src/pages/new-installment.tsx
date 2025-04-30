import dayjs from 'dayjs';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import Textfield from '../components/textfield';
import { useAddInstallment, useCurrentUser } from '../services/hooks';
import { InstallmentForm, UserWithInstallmentForm } from '../services/types';
import HydrateFallback from './hydrate-fallback';

export default function NewInstallment(): JSX.Element {
  const { mutate } = useAddInstallment();
  const { isPending, data: user } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InstallmentForm>({
    defaultValues: {
      startDate: dayjs().format('YYYY-MM-DD'),
    },
  });

  if (isPending || !user) return <HydrateFallback />;

  const onSubmit = async (data: InstallmentForm) => {
    const payload: UserWithInstallmentForm = {
      ...data,
      user: user.uid,
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textfield
        error={!!errors?.name}
        placeholder="Name"
        {...register('name', { required: true })}
      />
      <Textfield
        error={!!errors?.startDate}
        placeholder="Date"
        type="date"
        {...register('startDate', { required: true })}
      />
      <Textfield
        error={!!errors?.interestRate}
        placeholder="Interest Rate"
        type="number"
        {...register('interestRate', {
          required: true,
          valueAsNumber: true,
        })}
      />
      <Textfield
        error={!!errors?.totalMonth}
        placeholder="Total Month"
        type="number"
        {...register('totalMonth', {
          required: true,
          valueAsNumber: true,
        })}
      />
      <Textfield
        error={!!errors?.note}
        placeholder="Note"
        {...register('note')}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? 'กำลังบันทึก...' : 'Submit'}
      </button>
    </form>
  );
}
