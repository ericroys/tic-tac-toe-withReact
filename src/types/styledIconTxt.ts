import { StyledIcon } from './styledIcon';

export type StyledIconText = StyledIcon & {
  text: string;
  txtClass?: string;
  onClick?: <T>() => T | void;
};
