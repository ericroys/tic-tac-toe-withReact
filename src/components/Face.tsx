import { TbXboxX } from 'react-icons/tb';
import { FaRegCircle } from 'react-icons/fa';
import { VscBlank } from 'react-icons/vsc';
import { Players } from '../types';

export type Props = {
  isWin: boolean;
  player: Players;
};

export const Face = ({ isWin, player }: Props) => {
  const win = isWin ? ' text-redish ' : '';
  const params = {
    className: 'h-fit w-fit m-3' + win,
    size: 100,
  };
  return player === 'x' ? (
    <TbXboxX {...params} />
  ) : player === 'o' ? (
    <FaRegCircle className={'h-fit w-fit m-3' + win} size={100} />
  ) : (
    <VscBlank className={'h-fit w-fit m-3'} size={100} />
  );
};
