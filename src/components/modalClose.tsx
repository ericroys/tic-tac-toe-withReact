import { useEffect, useRef, useState } from 'react';
import { SiBasicattentiontoken } from 'react-icons/si';
import IconWithText from '../lib/styledIconText';
import React from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export const CloseModal = ({ isOpen, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(isOpen);
  useEffect(() => {
    setDialogOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const e = ref.current;
    if (e)
      if (isDialogOpen) e.showModal();
      else e.close();
  }, [isDialogOpen]);

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
    setDialogOpen(false);
  };

  const keyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <dialog
      ref={ref}
      className='modal rounded-lg h-fit w-1/2 bg-gradient-to-r from-bluish to-greenish-light'
      onKeyDown={keyDown}>
      <div className='w-fit h-fit flex flex-col p-5 rounded-lg items-center'>
        <span className={taclass}>TEST</span>
        <IconWithText
          onClick={closeModal}
          icon={SiBasicattentiontoken}
          iconClass={iclass}
          text={'Close'}
          txtClass={tclass}
        />
      </div>
      {children}
    </dialog>
  );
};

let iclass = 'fill-pinkish';
let tclass = `font-bold pl-2 hover:shadow-md hover:shadow-redish 
              rounded-md text-bluish-dark cursor-pointer pr-2`;
let taclass = `text-center drop-shadow-abc mb-10`;
