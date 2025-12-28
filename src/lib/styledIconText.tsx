import { StyledIconText } from '../types/styledIconTxt';
import StyledIcon from './styledIcon';

/**
 * A styled component with a left-side Icon with right-side text
 * Styling may be passed in for each
 * @param {StyledIconText}
 * @returns
 */
export default function IconWithText({
  icon,
  iconClass,
  text,
  txtClass,
  onClick,
  size
}: StyledIconText) {
  //basic defaults for text and icon styling
  const default_tclass = 'ml-2 ';
  const default_iclass = 'fill-current stroke-current ';

  //optionally append if input received
  let tClass = txtClass ? default_tclass + txtClass : default_tclass;
  let iClass = iconClass ? default_iclass + iconClass : default_iclass;

  return (
    <div onClick={onClick} 
    className='flex align-baseline items-center'>
      <StyledIcon icon={icon} className={iClass} size={size} />
      <span className={tClass}>{text}</span>  
    </div>
  );
}
