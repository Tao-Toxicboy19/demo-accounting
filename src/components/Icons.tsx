import clsx from 'clsx';
import { JSX } from 'react';

type Props = {
  path: string;
  className?: string;
};

export default function Icons({ path, className }: Props): JSX.Element {
  return <img src={path} className={clsx(className)} />;
}
