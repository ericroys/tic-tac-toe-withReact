import { TbXboxX } from 'react-icons/tb';
import { FaRegCircle } from 'react-icons/fa';
import { VscBlank } from 'react-icons/vsc';
import { Players } from '../types';
import { PLAYEROCOLOR, PLAYERXCOLOR, WINCOLOR } from '../data/default_settings';
import { SelectSettingByKey } from '../model/settingsReducer';
import { useAppSelector } from '../store/storeHooks';

export type Props = {
  isWin: boolean;
  player: Players;
};

export const Face = ({ isWin, player }: Props) => {

  const winColor = useAppSelector((state) =>
    SelectSettingByKey(state, WINCOLOR)
  );
  const xColor = useAppSelector((state) => 
    SelectSettingByKey(state, PLAYERXCOLOR)
  );
  const oColor = useAppSelector((state) => 
    SelectSettingByKey(state, PLAYEROCOLOR)
  );

  const winX = isWin ? String(winColor) : String(xColor);
  const winO = isWin ? String(winColor) : String(oColor);
  const params = {
    className: 'h-fit w-fit m-3',
    size: 100,
  };

  return player === 'x' ? (
    <TbXboxX {...params} style={{ color: winX }} />
  ) : player === 'o' ? (
    <FaRegCircle {...params} style={{ color: winO }} size={85} />
  ) : (
    <VscBlank {...params} style={{ color: winX }} />
  );
};
