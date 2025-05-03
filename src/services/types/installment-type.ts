export type InstallmentEntity = {
  _id: string;
  name: string;
  user: string;
  startDate: Date;
  interestRate: number;
  totalMonth: number;
  paidMonths: number;
  totalPrice: number;
  note: string;
};

export type InstallmentOption = {
  label: string;
  value: string;
};

export type InstallmentFormInput = Omit<
  InstallmentEntity,
  '_id' | 'user' | 'paidMonths' | 'startDate'
> & {
  startDate: string;
};

export type CreateInstallmentDto = InstallmentFormInput & {
  user: string;
};

export type InstallmentIdentifier = {
  id: string;
  user: string;
};
