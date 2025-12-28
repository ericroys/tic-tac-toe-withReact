import { useEffect, useRef } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import IconWithText from '../lib/styledIconText';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/game/storeHooks';
import { SelectAllSettings, setSetting } from '../store/reducers/settingsReducer';
import { SettingsFields } from '../data/default_settings';
import { defaultStyleIconText } from '../styling/styles';
import { SettingInput } from './SettingInput';
import { SettingInputFile } from './SettingInputFile';
import { saveFile } from '../store/reducers/fileReducer';

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
  //get settings from redux store
  const parameters = useAppSelector(SelectAllSettings);
  //make store dispatch available
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDialogElement | null>(null);
  const t = useRef<number>(0); //deal with some unnecessary painting
  //make react-form functions available
  const { register, getValues, handleSubmit, setValue } = useForm({});

  //make sure dialog displays only when appropriate
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

  //get a particular setting from the store
  const getSetting = (key: string) => {
    if (!parameters) return undefined;
    const res = parameters.filter((i) => i.key === key);
    if (res.length > 0 && res[0].value !== null) return res[0].value;
    return undefined;
  };

  //allow escape to close the dialog
  const keyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const onSubmit = () => {
    SettingsFields.forEach(async (f) => {
      let v = getValues(f.id);
      //if (!v) return;
      //handle files a bit different
      if (f.inputType === 'file') {
        dispatch(
          saveFile(
            {id: f.id,
              file: v instanceof File ? v as File : undefined
            }
          )
        )

        //handle regular input
      } else {
        dispatch(
          setSetting({
            key: f.id,
            value: v,
          })
        );
      }
    });
  };

  //the component. Using t.current to prevent unecessary painting
  return t.current < 2 ? (
    <>
      <dialog
        ref={ref}
        className='modal sm:rounded-r-lg h-fit w-full sm:w-1/4 border-0'
        onKeyDown={keyDown}>
        <div className='w-fit h-fit flex flex-col p-5 rounded-lg items-center'>
          <form key={0} onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row justify-center'>
              <div className={`flex flex-col pr-5`}>
                {SettingsFields.filter(f => f.inputType !== 'file').map((x, idx) => {
                  return (
                    <SettingInput
                      key={idx} label={x.label}
                      id={x.id} register={register}
                      defaultValue={getSetting(x.id)}
                      type={x.inputType} />
                  );
                })}
              </div>
              <div className={`flex flex-col`}>
                {SettingsFields.filter(f => f.inputType === 'file').map((x, idx) => {
                  return (
                    <SettingInputFile
                      key={idx} label={x.label}
                      id={x.id} register={register}
                      setValue={setValue}
                    />
                  )
                })}
              </div>
            </div>
            <div className='flex justify-center mt-2'>
              <button type='submit'>
                <IconWithText
                  icon={TfiSave}
                  {...defaultStyleIconText}
                  text={'Save'}
                  size={20}
                />
              </button>
            </div>
          </form>
          <button>
            <IconWithText
              onClick={closeModal}
              icon={AiOutlineCloseCircle}
              {...defaultStyleIconText}
              text={'Close'}
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
