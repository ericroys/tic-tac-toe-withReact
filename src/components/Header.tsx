import { CiSettings } from 'react-icons/ci';

import StyledIconText from '../lib/styledIconText';
import { useState } from 'react';
import { SettingsComponent } from './Settings';
import { defaultStyleIconText } from '../styling/styles';

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
      <div className='bg-gray flex h-30 justify-center align-center shadow-md shadow-black'>
        {/* <CiSettings /> */}
        <StyledIconText
          icon={CiSettings}
          text='Settings'
          {...defaultStyleIconText}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <SettingsComponent
        isOpen={shouldDisplay}
        onClose={closeModal}
        children={<></>}
      />
    </>
  );
};
