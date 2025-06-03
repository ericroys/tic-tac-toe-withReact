import { CiSettings } from 'react-icons/ci';

import StyledIconText from '../lib/styledIconText';
import { useState } from 'react';
import { Settings } from './Settings';

/*
  Header Object for the app currently consisting of
  settings option
*/
export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const shouldDisplay = () => isOpen;
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className='bg-gray flex h-30 items-center justify-between shadow-md shadow-black'>
        <div className='flex w-1/2'></div>
        {/* <CiSettings /> */}
        <StyledIconText
          icon={CiSettings}
          text='Settings'
          iconClass='text-white'
          txtClass='text-white pr-5 drop-shadow-custom-m-gray cursor-pointer'
          onClick={() => setIsOpen(true)}
        />
      </div>
      {/* <Settings isOpen={isOpen} onClose={closeModal} children={<></>} /> */}
      <Settings isOpen={shouldDisplay} onClose={closeModal} children={<></>} />
    </>
  );
};
