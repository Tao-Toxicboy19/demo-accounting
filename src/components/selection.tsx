import clsx from 'clsx';
import { JSX } from 'react';
import Select from 'react-select';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  error?: boolean;
  options: {
    value: string;
    label: string;
  }[];
  rules?: RegisterOptions;
};

export default function Selection({
  control,
  name,
  placeholder,
  className,
  options,
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
          value={options.find((c) => c.value === field.value)}
          onChange={(val) => field.onChange(val?.value)}
          placeholder={placeholder}
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
                ? '1px #fb2c36'
                : baseStyles.boxShadow,
            }),
          }}
        />
      )}
    />
  );
}
