import { StyledIconText } from '../types/styledIconTxt';
import IconWithText from './styledIconText';

export type Props = {
  data: {
    headerTxt: string;
    iconTexts: StyledIconText[];
  };
};

export const StyledIconListCard = ({ data }: Props) => {
  let { headerTxt, iconTexts } = data;
  let iclass = 'fill-blueish-dark';
  let tclass = 'font-extrabold text-bluish-dark';
  return (
    <div className='flex flex-col w-full bg-greenish-light'>
      <div className='bg-pinkish rounded-t-md font-extrabold text-bluish-dark shadow-md shadow-black'>
        {headerTxt}
      </div>
      <div className='flex flex-col border-pinkish border-2 pl-4 pt-2 pb-2 h-full'>
        {iconTexts.map((icotxt, idx) => (
          <IconWithText
            key={idx}
            icon={icotxt.icon}
            iconClass={iclass}
            text={icotxt.text}
            txtClass={tclass}
          />
        ))}
      </div>
    </div>
  );
};
