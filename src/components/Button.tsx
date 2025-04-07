import clsx from 'clsx';
import { ButtonHTMLAttributes, JSX, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  fullWidth,
  startIcon,
  endIcon,
  ...rest
}: Props): JSX.Element {
  return (
    <div
      className={clsx(
        'flex gap-x-2 items-center border p-2 rounded-lg cursor-pointer transition active:scale-95',
        fullWidth && 'w-full',
        className,
      )}
    >
      {startIcon}
      <button {...rest}>{children}</button>
      {endIcon}
    </div>
  );
}
