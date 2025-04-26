import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { JSX } from 'react';
import { TransactionForm } from '../services/types/transaction-form-type';
import Textfield from './textfield';
import Selection from './selection';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function Form(): JSX.Element {
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
    console.log('Submitted data:', data);
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
