import { JSX } from 'react';
import Button from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  page: number;
  totalPage: number;
  prevPage: () => void;
  nextPage: () => void;
};

export default function PaginationControls({
  prevPage,
  nextPage,
  page,
  totalPage,
}: Props): JSX.Element {
  return (
    <div className="flex gap-x-2 items-center">
      <Button onClick={prevPage}>
        <ChevronLeft className="text-gray-500 w-4 h-4 lg:w-5 lg:h-5" />
      </Button>
      <div className="w-7 mx-auto flex items-center justify-center">
        <span className="text-sm">{page}</span> /{' '}
        <span className="text-sm">{totalPage}</span>
      </div>
      <Button onClick={nextPage}>
        <ChevronRight className="text-gray-500 w-4 h-4 lg:w-5 lg:h-5" />
      </Button>
    </div>
  );
}
