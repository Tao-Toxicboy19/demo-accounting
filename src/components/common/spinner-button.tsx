import clsx from 'clsx';
import { ButtonHTMLAttributes, JSX } from 'react';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SpinnerButton({
  isLoading,
  children,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <button
      disabled={isLoading || rest.disabled}
      className={clsx(className, 'relative', {
        'opacity-70 cursor-not-allowed': isLoading,
      })}
      {...rest}
    >
      {isLoading ? (
        <div
          className="inline-block size-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-white"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
