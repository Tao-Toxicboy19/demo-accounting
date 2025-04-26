export type Transaction = {
  _id: string;
  user: string;
  type: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  note: string;
};

export type TransactionForm = Omit<Transaction, '_id' | 'user' | 'date'> & {
  date: string;
};

export type UserTransactionForm = TransactionForm & {
  user: string;
};
