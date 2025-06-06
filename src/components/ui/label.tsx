import { JSX, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type Props = {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export default function Label({
  htmlFor,
  children,
  className,
}: Props): JSX.Element {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400',
          className,
        ),
      )}
    >
      {children}
    </label>
  );
}
