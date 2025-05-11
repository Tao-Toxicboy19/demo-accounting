export type TransactionEntity = {
  _id: string;
  user: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: Date;
  category: string;
  note: string;
  installmentId: string;
};

export type TransactionFormInput = Omit<
  TransactionEntity,
  '_id' | 'user' | 'date'
> & {
  id?: string;
  date: string;
  installmentId?: string;
};

export type CreateTransactionPayload = TransactionFormInput & {
  user: string;
};

export type TransactionIdentifier = {
  id: string;
  user: string;
};

export type TransactionType = 'income' | 'expense' | 'installment';
export type TransactionsLimitPage = {
  user: string;
  page: number;
  limit: number;
};
export type ResponseTransaction = {
  items: TransactionEntity[];
  total: number;
  totalPage: number;
};
