import clsx from 'clsx';
import { JSX, ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

type Props<C extends ElementType> = {
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  component?: C;
} & ComponentPropsWithoutRef<C>;

export default function Button<C extends ElementType = 'button'>({
  children,
  className,
  fullWidth,
  startIcon,
  endIcon,
  component,
  ...rest
}: Props<C>): JSX.Element {
  const Component = component || 'button';

  return (
    <Component
      className={clsx(
        'flex gap-x-2 items-center border p-2 rounded-lg cursor-pointer transition active:scale-95',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </Component>
  );
}
