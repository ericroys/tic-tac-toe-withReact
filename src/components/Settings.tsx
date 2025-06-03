import { useEffect, useRef } from 'react';
import { SiBasicattentiontoken } from 'react-icons/si';
import IconWithText from '../lib/styledIconText';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { SelectAllSettings, setSetting } from '../model/settingsReducer';

/*
  isOpen - function passed in from calling object to get whether
     this dialog should display or not
  onClose - function passed in from calling object to be called 
     when the dialog is closed
*/
export type Props = {
  isOpen: () => boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

/* Application settings ui component */
export const Settings = ({ isOpen, onClose, children }: Props) => {
  const parameters = useAppSelector(SelectAllSettings);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const e = ref.current;
    if (e)
      if (isOpen()) e.showModal();
      else e.close();
  }, [isOpen, onClose]);

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const getSetting = (key: string) => {
    console.log('looking for: ' + key + ' in ' + JSON.stringify(parameters));
    if (!parameters) return null;
    const res = parameters.filter((i) => i.key === key);
    if (res.length > 0) return res[0].value;
    return '';
  };
  console.log("---> " + getSetting('borderColor'));
  const keyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <dialog
      ref={ref}
      className='modal rounded-lg h-fit w-1/2 border-0'
      onKeyDown={keyDown}>
      <div className='w-fit h-fit flex flex-col p-5 rounded-lg items-center'>
        <IconWithText
          onClick={closeModal}
          icon={SiBasicattentiontoken}
          iconClass={iclass}
          text={'Close'}
          txtClass={tclass}
        />
        <form>
          <input
            type='color'
            defaultValue={getSetting('borderColor') || '#000000'}
            onChange={(event) => {
              //event.currentTarget.hidden = true;
              dispatch(
                setSetting({
                  key: 'borderColor',
                  value: event.currentTarget.value,
                })
              );
            }}
          />
        </form>
      </div>
      {children}
    </dialog>
  );
};

const iclass = 'fill-blue';
const tclass = `font-bold hover:shadow-md hover:shadow-gray 
              rounded-md text-black cursor-pointer pr-2 border-b-2 border-r-2 border-blue`;
