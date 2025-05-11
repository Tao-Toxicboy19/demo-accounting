import clsx from 'clsx';
import React, { JSX } from 'react';
import GenericModalTriggerButton from './generic-moda-trigger-button';
import Button from './button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
  nextPage,
  paginationSelector,
  prevPage,
  useAppDispatch,
} from '../../services/store';
import { useSelector } from 'react-redux';

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  buttonLabel?: string;
  showModal?: boolean;
  renderModalContent?: (close: () => void) => JSX.Element;
};

export default function Card({
  title,
  children,
  className = '',
  desc = '',
  buttonLabel,
  showModal = true,
  renderModalContent,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const pageReducer = useSelector(paginationSelector);

  return (
    <div
      className={clsx(
        'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]',
        className,
      )}
    >
      {/* Card Header */}
      <div className="px-6 pt-5 flex gap-x-5 items-center justify-between">
        <div className="flex gap-x-5 items-center">
          <div>
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
            {desc && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            )}
          </div>
          {showModal && renderModalContent && (
            <GenericModalTriggerButton
              buttonLabel={buttonLabel}
              renderModalContent={renderModalContent}
            />
          )}
        </div>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => dispatch(prevPage())}>
            <ChevronLeft className="text-gray-500" />
          </Button>
          <div>
            <span>{pageReducer.page}</span> /{' '}
            <span>{pageReducer.totalPage}</span>
          </div>
          <Button onClick={() => dispatch(nextPage())}>
            <ChevronRight className="text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
