import { useEffect, useRef } from 'react';
import { SiBasicattentiontoken, SiMinutemailer } from 'react-icons/si';
import IconWithText from '../lib/styledIconText';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { SelectAllSettings, setSetting } from '../model/settingsReducer';
import { DefaultSettings, SettingsFields } from '../data/default_settings';
import {
  lblClass,
  inputclass,
  styledIconTextIco,
  styledIconTextTxt,
} from '../styling/styles';

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
export const SettingsComponent = ({ isOpen, onClose, children }: Props) => {
  const parameters = useAppSelector(SelectAllSettings);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDialogElement | null>(null);
  const t = useRef<number>(0); //deal with some unnecessary painting
  const { register, getValues, handleSubmit } = useForm({});

  useEffect(() => {
    const e = ref.current;
    if (e)
      if (isOpen()) e.showModal();
      else e.close();
    t.current = 1;
  }, [isOpen, onClose]);

  const closeModal = () => {
    if (onClose) {
      t.current = 2;
      onClose();
    }
  };

  const getDefaultSetting = (key: string) =>{
    const t = DefaultSettings.find(s => s.key === key)
    return t ? t.value : '';
  }

  const getSetting = (key: string) => {
    if (!parameters) return null;
    const res = parameters.filter((i) => i.key === key);
    if (res.length > 0) return res[0].value;
    return '';
  };

  const keyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const onSubmit = () => {
    SettingsFields.forEach((f) => {
      dispatch(
        setSetting({
          key: f.id,
          value: getValues(f.id),
        })
      );
    });
  };

  return t.current < 2 ? (
    <>
      <dialog
        ref={ref}
        className='modal rounded-lg h-fit w-1/2 border-0'
        onKeyDown={keyDown}>
        <div className='w-fit h-fit flex flex-col p-5 rounded-lg items-center'>
          <form key={0} onSubmit={handleSubmit(onSubmit)}>
            {SettingsFields.map((f, i) => {
              return (
                <div key={i}>
                  <label key={i} htmlFor={f.id} className={lblClass}>
                    {f.label}
                  </label>
                  <input
                    defaultValue={getSetting(f.id) || getDefaultSetting(f.id)}
                    key={'i' + i}
                    type={f.inputType}
                    id={f.id}
                    {...register(f.id)}
                    className={inputclass}
                  />
                </div>
              );
            })}
            <div className='flex justify-center'>
              <button type='submit'>
                <IconWithText
                  icon={SiMinutemailer}
                  iconClass={styledIconTextIco}
                  text={'Save'}
                  txtClass={styledIconTextTxt}
                />
              </button>
            </div>
          </form>
          <button>
            <IconWithText
              onClick={closeModal}
              icon={SiBasicattentiontoken}
              iconClass={styledIconTextIco}
              text={'Close'}
              txtClass={styledIconTextTxt}
            />
          </button>
        </div>
        {children}
      </dialog>
    </>
  ) : (
    <></>
  );
};
