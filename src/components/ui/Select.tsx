import clsx from 'clsx';
import { JSX } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  options,
  label,
  placeholder,
  error,
  className = '',
  ...rest
}: Props): JSX.Element {
  return (
    <div className={clsx(className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
      )}
      <select
        {...rest}
        className={clsx(
          'h-11 w-full appearance-none rounded-lg border bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3',
          'dark:bg-dark-900 dark:text-white/90 dark:placeholder:text-white/30',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500 dark:focus:border-red-500'
            : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800',
        )}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
