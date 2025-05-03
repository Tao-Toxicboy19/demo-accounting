export type Installment = {
  name: string;
  user: string;
  startDate: Date;
  interestRate: number;
  totalMonth: number;
  paidMonths: number;
  totalPrice: number;
  _id: string;
  note: string;
};

export type InstallmentWithLabelValue = {
  label: string;
  value: string;
};

export type InstallmentForm = Omit<
  Installment,
  '_id' | 'paidMonths' | 'startDate' | 'user'
> & {
  startDate: string;
};

export type UserWithInstallmentForm = InstallmentForm & {
  user: string;
};
