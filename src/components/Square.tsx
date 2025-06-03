import {
  GameOver,
  SelectSquareById,
  SelectPlayingAs,
  MovePlayer,
} from '../model/gameReducer';
import { SelectSettingByKey } from '../model/settingsReducer';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { Face } from './Face';

export type Props = {
  id: number;
};
export const Cell = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector(GameOver);
  const square = useAppSelector((state) => SelectSquareById(state, id));
  const border = useAppSelector((state) => SelectSettingByKey(state, 'borderColor'));
  const playingAs = useAppSelector(SelectPlayingAs);
  
  if (!square) return;
  const { player, isSelected, isWinner } = square;
  const dotted = !gameOver && !isSelected ? ' hover:border-dotted' : '';

  const onClick = async () => {
    if (gameOver) return;
    dispatch(MovePlayer({ id: id, player: playingAs }));
  };

  return (
    <div
      onClick={() => onClick()}
      className={`flex w-1/3 min-w-1/3 justify-center items-center content-center
        text-center border-4 ${dotted}
        `}
      style={{ borderColor: String(border) }}>
      <Face isWin={isWinner} player={player} />
    </div>
  );
};
