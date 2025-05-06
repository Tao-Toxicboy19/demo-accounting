import { Options } from '../types';

export const categories: Options[] = [
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

export const transactionTypeOptions = {
  Income: 'income',
  Expense: 'expense',
  Installment: 'installment',
};
