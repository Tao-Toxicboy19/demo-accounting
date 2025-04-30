export type Installment = {
  name: string;
  user: string;
  startDate: Date;
  interestRate: number;
  totalMonth: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
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
