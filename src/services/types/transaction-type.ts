export type Transaction = {
  _id: string;
  user: string;
  type: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
