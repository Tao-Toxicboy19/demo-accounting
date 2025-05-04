import { JSX } from 'react';
import {
  CreateInstallmentPayload,
  InstallmentFormInput,
} from '../../../services/types';
import { useForm } from 'react-hook-form';
import SpinnerButton from '../../common/spinner-button';
import Textfield from '../../common/textfield';
import dayjs from 'dayjs';
import { useAuthUser, useCreateInstallment } from '../../../services/hooks';

type Props = {
  closeModal: () => void;
};

export default function FormInstallment({ closeModal }: Props): JSX.Element {
  const { uid } = useAuthUser();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InstallmentFormInput>({
    defaultValues: {
      startDate: dayjs().format('YYYY-MM-DD'),
    },
  });
  const { mutate } = useCreateInstallment();

  const onSubmit = async (data: InstallmentFormInput) => {
    const payload: CreateInstallmentPayload = {
      ...data,
      user: uid,
    };
    closeModal();
    mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-2 overflow-y-auto custom-scrollbar"
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {'Add Instllment'}
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Plan your next big moment: schedule or edit an event to stay on track
        </p>
      </div>
      <div className="mt-8">
        <div>
          <Textfield
            id="name"
            error={!!errors?.name}
            label="Installment Name"
            {...register('name', { required: true })}
          />
        </div>
        <div className="mt-6">
          <Textfield
            id="totalMonth"
            label="Total Month"
            error={!!errors?.totalMonth}
            type="number"
            {...register('totalMonth', {
              valueAsNumber: true,
              required: true,
            })}
          />
        </div>
        <div className="flex gap-x-5 w-full mt-6">
          <div className="w-full">
            <Textfield
              id="interestRate"
              label="Interest Rate"
              error={!!errors?.interestRate}
              type="number"
              {...register('interestRate', {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="w-full">
            <Textfield
              id="totalPrice"
              label="Total Price"
              error={!!errors?.totalPrice}
              type="number"
              {...register('totalPrice', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Date
          </label>
          <div className="relative">
            <input
              id="date"
              type="date"
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              {...register('startDate', { required: true })}
            />
          </div>
        </div>
        <div className="mt-6">
          <Textfield
            id="note"
            error={!!errors?.note}
            label="Note"
            type="text"
            {...register('note')}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <button
          onClick={closeModal}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          Close
        </button>
        <SpinnerButton
          isLoading={isSubmitting}
          className="btn btn-success btn-update-event flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:w-auto bg-brand-500 hover:bg-brand-600 min-w-[134px]"
          type="submit"
        >
          Add Installment
        </SpinnerButton>
      </div>
    </form>
  );
}
