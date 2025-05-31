import { JSX } from 'react';

type Props = {
  closeModal: () => void;
  //   defaultValues?: Partial<TransactionFormInput>;
};
export default function FormSavingGoals({ closeModal }: Props): JSX.Element {
  return <div onClick={closeModal}>form-saving-goals</div>;
}
