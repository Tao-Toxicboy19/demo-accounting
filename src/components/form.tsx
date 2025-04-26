import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { JSX } from 'react';
import Textfield from './textfield';
import Selection from './selection';
import { useAddTransaction } from '../services/hooks/use-transaction';
import { useSelector } from 'react-redux';
import { authSelector } from '../services/store/features/auth-slice';
import {
  TransactionForm,
  UserTransactionForm,
} from '../services/types/transaction-type';

const options = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'installment', label: 'Installment' },
];

export default function Form(): JSX.Element {
  const { mutate } = useAddTransaction();
  const userReducer = useSelector(authSelector);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionForm>({
    defaultValues: {
      date: dayjs().format('YYYY-MM-DD'),
    },
  });

  const onSubmit = (data: TransactionForm) => {
    const payload: UserTransactionForm = {
      ...data,
      user: userReducer.user!.uid,
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textfield
        error={!!errors?.title}
        placeholder="Name"
        {...register('title', { required: true })}
      />
      <Selection
        control={control}
        name="type"
        placeholder="Type"
        options={options}
        rules={{ required: true }}
      />
      <Textfield
        error={!!errors?.amount}
        placeholder="Amount"
        type="number"
        {...register('amount', {
          required: true,
          valueAsNumber: true,
        })}
      />
      <Textfield
        error={!!errors?.date}
        placeholder="Date"
        type="date"
        {...register('date', { required: true })}
      />
      <Selection
        control={control}
        name="category"
        placeholder="Category"
        options={options}
        rules={{ required: true }}
      />
      <Textfield
        error={!!errors?.note}
        placeholder="Note"
        {...register('note')}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
