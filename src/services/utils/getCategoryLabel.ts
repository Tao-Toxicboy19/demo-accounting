import { Options } from '../types';

export function getCategoryLabel(value: string, options: Options[]): string {
  return options.find((opt) => opt.value === value)?.label ?? value ?? '';
}
