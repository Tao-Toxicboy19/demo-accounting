// export type Transaction = {
//   _id: string;
//   user: string;
//   type: 'income' | 'expense' | 'installment';
//   title: string;
//   amount: number;
//   date: Date;
//   category: string;
//   note: string;
// };

// export type TransactionForm = Omit<Transaction, '_id' | 'user' | 'date'> & {
//   date: string;
//   installmentId?: string;
// };

// export type UserTransactionForm = TransactionForm & {
//   user: string;
// };

// export type IdWithUserTransaction = Pick<Transaction, 'user'> & {
//   id: string;
// };

export type TransactionEntity = {
  _id: string;
  user: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: Date;
  category: string;
  note: string;
};

export type TransactionFormInput = Omit<
  TransactionEntity,
  '_id' | 'user' | 'date'
> & {
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
