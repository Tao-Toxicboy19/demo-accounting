import clsx from 'clsx';
import { JSX } from 'react';

type TextfieldProps = {
  className?: string;
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  label?: string;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Textfield({
  className,
  placeholder,
  type = 'text',
  readonly = false,
  label,
  error,
  ...rest
}: TextfieldProps): JSX.Element {
  return (
    // 'max-w-sm mx-auto'
    <div className={clsx(className)}>
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
        {...rest}
        className={clsx(
          error && 'border-red-500',
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#CCCCCC]',
        )}
      />
    </div>
  );
}
