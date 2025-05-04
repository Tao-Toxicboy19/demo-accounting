import { JSX } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: Option[];
  register?: UseFormRegisterReturn;
};

export default function RadioGroup({
  name,
  options,
  register,
}: Props): JSX.Element {
  return (
    <div className="flex gap-x-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer"
        >
          <input
            type="radio"
            value={option.value}
            {...(register || { name })}
          />
          <span className="pl-2">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
