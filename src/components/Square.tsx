import {
  GameOver,
  SelectSquareById,
  SelectPlayingAs,
  MovePlayer,
} from '../model/reducers';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { Face } from './Face';

export type Props = {
  id: number;
};
export const Cell = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector(GameOver);
  const square = useAppSelector((state) => SelectSquareById(state, id));
  const playingAs = useAppSelector(SelectPlayingAs);
  if (!square) return;
  const { player, isSelected, isWinner } = square;
  let dotted = !gameOver && !isSelected ? ' hover:border-dotted' : '';

  const onClick = async () => {
    if (gameOver || square.isSelected) return;
    dispatch(MovePlayer({ id: id, player: playingAs }));
  };

  return (
    <div
      onClick={() => onClick()}
      className={`flex w-1/3 min-w-1/3 bg-white justify-center items-center content-center
        text-center border-4 border-black ${dotted}
        `}>
      <Face isWin={isWinner} player={player} />
    </div>
  );
};
