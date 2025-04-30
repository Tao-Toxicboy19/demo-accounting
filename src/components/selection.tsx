import clsx from 'clsx';
import { JSX } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  error?: boolean;
  options?: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  rules?: RegisterOptions;
};

export default function Selection({
  control,
  name,
  placeholder,
  className,
  options = [], // fallback empty array
  rules,
}: Props): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Select
          className={clsx(className)}
          options={options}
          value={
            (options as OptionType[]).find((c) => c.value === field.value) ||
            null
          }
          onChange={(val) => field.onChange((val as OptionType)?.value)}
          placeholder={placeholder}
          loadingMessage={() => 'Loading...'}
          noOptionsMessage={() => (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              className="text-blue-500 hover:underline w-full text-left px-2 py-1"
            >
              + Add new Installment
            </button>
          )}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: fieldState.error
                ? '#fb2c36'
                : baseStyles.borderColor,
              '&:hover': {
                borderColor: fieldState.error
                  ? '#fb2c36'
                  : baseStyles.borderColor,
              },
              boxShadow: fieldState.error
                ? '0 0 0 1px #fb2c36'
                : baseStyles.boxShadow,
            }),
          }}
        />
      )}
    />
  );
}
