import { JSX } from 'react';
import { useModal } from '../../services/hooks/use-modal';
import Modal from '../ui/modal';
import clsx from 'clsx';

type Props = {
  buttonLabel?: string;
  buttonClassName?: string;
  modalClassName?: string;
  renderModalContent: (close: () => void) => JSX.Element;
};

export default function GenericModalTriggerButton({
  buttonLabel = 'Open Modal',
  buttonClassName = '',
  modalClassName = 'max-w-[700px] p-6 lg:p-10',
  renderModalContent,
}: Props): JSX.Element {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button
        className={clsx(
          'btn btn-success flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto',
          buttonClassName,
        )}
        onClick={openModal}
      >
        {buttonLabel}
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className={modalClassName}>
        {renderModalContent(closeModal)}
      </Modal>
    </>
  );
}
