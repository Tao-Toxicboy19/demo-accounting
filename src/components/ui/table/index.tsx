import { JSX, ReactNode, HTMLAttributes } from 'react';

// Base props with native HTML attributes
type BaseProps<T> = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<T>;

// Table
function Table({
  children,
  className = '',
  onClick,
  ...rest
}: BaseProps<HTMLTableElement>): JSX.Element {
  return (
    <table className={`min-w-full ${className}`} onClick={onClick} {...rest}>
      {children}
    </table>
  );
}

// TableHeader
function TableHeader({
  children,
  className = '',
  onClick,
  ...rest
}: BaseProps<HTMLTableSectionElement>): JSX.Element {
  return (
    <thead className={className} onClick={onClick} {...rest}>
      {children}
    </thead>
  );
}

// TableBody
function TableBody({
  children,
  className = '',
  onClick,
  ...rest
}: BaseProps<HTMLTableSectionElement>): JSX.Element {
  return (
    <tbody className={className} onClick={onClick} {...rest}>
      {children}
    </tbody>
  );
}

// TableRow
function TableRow({
  children,
  className = '',
  onClick,
  ...rest
}: BaseProps<HTMLTableRowElement>): JSX.Element {
  return (
    <tr className={className} onClick={onClick} {...rest}>
      {children}
    </tr>
  );
}

// TableCell
type TableCellProps = BaseProps<HTMLTableCellElement> & {
  isHeader?: boolean;
};

function TableCell({
  children,
  isHeader = false,
  className = '',
  onClick,
  ...rest
}: TableCellProps): JSX.Element {
  const CellTag = isHeader ? 'th' : 'td';
  return (
    <CellTag className={className} onClick={onClick} {...rest}>
      {children}
    </CellTag>
  );
}

export { Table, TableHeader, TableBody, TableRow, TableCell };
