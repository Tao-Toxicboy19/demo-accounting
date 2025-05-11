import { JSX, useEffect, useState } from 'react';
import {
  useAuthUser,
  useCreateTransaction,
  useInstallmentDropdown,
  useUpdateTransaction,
} from '../../../services/hooks';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  TransactionFormInput,
  CreateTransactionPayload,
  TransactionType,
} from '../../../services/types';
import Textfield from '../../common/textfield';
import Label from '../../ui/label';
import Select from '../../ui/Select';
import SpinnerButton from '../../common/spinner-button';
import clsx from 'clsx';
import {
  categories,
  transactionTypeOptions,
} from '../../../services/constants';

type Props = {
  closeModal: () => void;
  defaultValues?: Partial<TransactionFormInput>;
};

export default function FormTransaction({
  closeModal,
  defaultValues,
}: Props): JSX.Element {
  const { uid } = useAuthUser();
  const [transactionType, setTransactionType] = useState<TransactionType>(
    defaultValues?.type || 'income',
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TransactionFormInput>({
    defaultValues: {
      date: dayjs().format('YYYY-MM-DD'),
      type: 'expense',
      ...defaultValues,
    },
  });
  const { data } = useInstallmentDropdown(
    uid,
    transactionType === 'installment',
  );

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        date: defaultValues.date || dayjs().format('YYYY-MM-DD'),
      });
    }
  }, [defaultValues, reset]);

  const selectedInstallmentId = watch('installmentId');

  useEffect(() => {
    if (transactionType !== 'installment' || !data) return;
    const matched = data.find((item) => item.value === selectedInstallmentId);
    if (matched) {
      setValue('title', matched.label);
    }
  }, [selectedInstallmentId, data, transactionType, setValue]);

  const { mutate: create } = useCreateTransaction();
  const { mutate: update } = useUpdateTransaction();

  const onSubmit = async (data: TransactionFormInput) => {
    const payload: CreateTransactionPayload = {
      ...data,
      user: uid,
    };
    closeModal();
    if (defaultValues) {
      update(payload);
    } else {
      create(payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-2 overflow-y-auto custom-scrollbar"
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {'Add Transaction'}
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Plan your next big moment: schedule or edit an event to stay on track
        </p>
      </div>
      <div className="mt-8">
        <div>
          {transactionType === 'installment' ? (
            <div>
              <Label>Transaction Title</Label>
              <Select
                options={data || []}
                className="dark:bg-dark-900"
                {...register('installmentId', { required: true })}
              />
            </div>
          ) : (
            <Textfield
              id="title"
              error={!!errors?.title}
              label="Transaction Title"
              {...register('title', { required: true })}
            />
          )}
        </div>
        <div className="mt-6">
          <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
            Type
          </label>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {Object.entries(transactionTypeOptions).map(([key, value]) => (
              <div key={key} className="n-chk">
                <div
                  className={`form-check form-check-${value} form-check-inline`}
                >
                  <label
                    className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                    htmlFor={`modal${key}`}
                  >
                    <span className="relative">
                      <input
                        className="sr-only form-check-input"
                        type="radio"
                        value={value}
                        id={`modal${key}`}
                        {...register('type', {
                          required: true,
                          onChange: (e) => {
                            const value = e.target.value;
                            setTransactionType(value);
                          },
                        })}
                      />
                      <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                        <span
                          className={`h-2 w-2 rounded-full bg-white block`}
                        ></span>
                      </span>
                    </span>
                    {key}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 w-full flex gap-x-5">
          <div className="w-full">
            <Textfield
              id="amount"
              label="Amount"
              error={!!errors?.amount}
              type="number"
              {...register('amount', {
                required: true,
                valueAsNumber: true,
                validate: (value) =>
                  (Number.isFinite(value) &&
                    /^\d+(\.\d{1,2})?$/.test(value.toString())) ||
                  'กรุณากรอกไม่เกิน 2 ตำแหน่ง',
              })}
            />
          </div>
          <div className="w-full">
            <Label>Categories</Label>
            <Select
              options={categories}
              className="dark:bg-dark-900"
              {...register('category', { required: true })}
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
              {...register('date', { required: true })}
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
          className={clsx(
            'btn btn-success btn-update-event flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:w-auto bg-brand-500 hover:bg-brand-600',
            'min-w-[134px] w-full',
          )}
          type="submit"
        >
          Add Transaction
        </SpinnerButton>
      </div>
    </form>
  );
}
