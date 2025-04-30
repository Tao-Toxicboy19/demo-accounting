import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { JSX, useEffect, useState } from 'react';
import Textfield from './textfield';
import Selection from './selection';
import {
  TransactionForm,
  TransactionType,
  UserTransactionForm,
} from '../services/types/transaction-type';
import RadioGroup from './radio-group';
import HydrateFallback from '../pages/hydrate-fallback';
import { useAddTransaction, useCurrentUser } from '../services/hooks';
import { useInstallment } from '../services/hooks/use-installment';

const categories = [
  { value: 'snack', label: 'ขนม' },
  { value: 'drink', label: 'เครื่องดื่ม' },
  { value: 'food', label: 'อาหาร' },
  { value: 'transportation', label: 'ค่าเดินทาง' },
  { value: 'shopping', label: 'ช้อปปิ้ง' },
  { value: 'entertainment', label: 'ความบันเทิง' },
  { value: 'bill', label: 'ค่าสาธารณูปโภค' },
  { value: 'healthcare', label: 'สุขภาพ' },
  { value: 'education', label: 'การศึกษา' },
  { value: 'other_expense', label: 'รายจ่ายอื่น ๆ' },
  { value: 'salary', label: 'เงินเดือน' },
  { value: 'freelance', label: 'งานฟรีแลนซ์' },
  { value: 'gift', label: 'ของขวัญ' },
  { value: 'refund', label: 'เงินคืน' },
  { value: 'investment', label: 'ผลตอบแทนการลงทุน' },
  { value: 'other_income', label: 'รายรับอื่น ๆ' },
  { value: 'credit_card', label: 'ผ่อนบัตรเครดิต' },
  { value: 'car_loan', label: 'ผ่อนรถยนต์' },
  { value: 'home_loan', label: 'ผ่อนบ้าน' },
  { value: 'phone', label: 'ผ่อนมือถือ' },
  { value: 'appliance', label: 'ผ่อนเครื่องใช้ไฟฟ้า' },
  { value: 'other_installment', label: 'ผ่อนชำระอื่น ๆ' },
];

export default function Form(): JSX.Element {
  const { mutate } = useAddTransaction();
  const { isPending, data: user } = useCurrentUser();
  const [transactionType, setTransactionType] =
    useState<TransactionType>('income');
  const installment = useInstallment(
    user?.uid || '',
    transactionType === 'installment',
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionForm>({
    defaultValues: {
      date: dayjs().format('YYYY-MM-DD'),
    },
  });

  if (isPending || !user) return <HydrateFallback />;

  const installmentValue = watch('installmentId');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (transactionType === 'installment' && installmentValue) {
      const selected = installment.data?.find(
        (i) => i.value === installmentValue,
      );
      if (selected) {
        setValue('title', selected.label);
      }
    }
  }, [installmentValue, transactionType, installment.data, setValue]);

  const onSubmit = async (data: TransactionForm) => {
    const payload: UserTransactionForm = {
      ...data,
      user: user.uid,
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RadioGroup
        name="transactionType"
        register={register('type', {
          required: true,
          onChange: (e) => {
            const value = e.target.value;
            setTransactionType(value);
            if (value !== 'installment') {
              setValue('installmentId', undefined);
              setValue('title', '');
            }
          },
        })}
        options={[
          { label: 'Income', value: 'income' },
          { label: 'Expense', value: 'expense' },
          { label: 'Installment', value: 'installment' },
        ]}
      />
      {transactionType !== 'installment' && (
        <Textfield
          error={!!errors?.title}
          placeholder="Name"
          {...register('title', { required: true })}
        />
      )}
      {transactionType === 'installment' && (
        <Selection
          control={control}
          name="installmentId"
          placeholder="Installments"
          options={installment.data}
          rules={{ required: true }}
        />
      )}
      <Textfield
        error={!!errors?.amount}
        placeholder="Amount"
        type="number"
        step="0.01"
        {...register('amount', {
          required: true,
          valueAsNumber: true,
          validate: (value) =>
            (Number.isFinite(value) &&
              /^\d+(\.\d{1,2})?$/.test(value.toString())) ||
            'กรุณากรอกไม่เกิน 2 ตำแหน่ง',
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
        placeholder="Categories"
        options={categories}
        rules={{ required: true }}
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
