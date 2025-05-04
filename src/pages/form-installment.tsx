import dayjs from 'dayjs';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import Textfield from '../components/textfield';
import { useCreateInstallment, useCurrentUser } from '../services/hooks';
import HydrateFallback from './hydrate-fallback';
import { Link } from 'react-router';
import Button from '../components/button';
import { path } from '../services/routes/route-path';
import { CreateInstallmentDto, InstallmentFormInput } from '../services/types';

export default function FormInstallment(): JSX.Element {
  const { mutate } = useCreateInstallment();
  const { isPending, data: user } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InstallmentFormInput>({
    defaultValues: {
      startDate: dayjs().format('YYYY-MM-DD'),
    },
  });

  if (isPending || !user) return <HydrateFallback />;

  const onSubmit = async (data: InstallmentFormInput) => {
    const payload: CreateInstallmentDto = {
      ...data,
      user: user.uid,
    };
    mutate(payload);
  };

  return (
    <div>
      <Button
        component={Link}
        to={path.installment.list}
        className="mb-3 w-fit"
      >
        Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-3">
          <Textfield
            label="Name"
            error={!!errors?.name}
            placeholder="Name"
            className="w-full"
            {...register('name', { required: true })}
          />
          <Textfield
            label="Date"
            error={!!errors?.startDate}
            placeholder="Date"
            className="w-full"
            type="date"
            {...register('startDate', { required: true })}
          />
        </div>
        <div className="flex gap-3">
          <Textfield
            label="Interest Rate"
            error={!!errors?.interestRate}
            placeholder="Interest Rate"
            type="number"
            className="w-full"
            {...register('interestRate', {
              valueAsNumber: true,
            })}
          />
          <Textfield
            label="Total Price"
            error={!!errors?.totalPrice}
            placeholder="Total Price"
            type="number"
            className="w-full"
            {...register('totalPrice', {
              valueAsNumber: true,
            })}
          />
          <Textfield
            label="Total Month"
            error={!!errors?.totalMonth}
            placeholder="Total Month"
            type="number"
            className="w-full"
            {...register('totalMonth', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>

        <Textfield
          label="Note"
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
    </div>
  );
}
