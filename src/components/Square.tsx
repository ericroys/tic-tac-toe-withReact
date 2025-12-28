import { BOARDBACKGROUND, BORDERCOLOR, CELLCOLOR } from '../data/default_settings';
import {
  GameOver,
  SelectSquareById,
  SelectPlayingAs,
  MovePlayer,
} from '../store/reducers/gameReducer';
import { SelectSettingByKey } from '../store/reducers/settingsReducer';
import { useAppDispatch, useAppSelector } from '../store/game/storeHooks';
import { Face } from './Face';
import { SelectFileUpdated } from '../store/reducers/fileReducer';
import { dbGetFile } from '../controller/fileController';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';

export type Props = {
  id: number;
};
export const Cell = ({ id }: Props) => {
  const [background, setBackground] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector(GameOver);
  const square = useAppSelector((state) => SelectSquareById(state, id));
  const border = useAppSelector((state) =>
    SelectSettingByKey(state, BORDERCOLOR)
  );
  const boardColor = useAppSelector((state) =>
    SelectSettingByKey(state, CELLCOLOR)
  );
  const backgroundUpdate = useAppSelector((state) => 
    SelectFileUpdated(state, BOARDBACKGROUND));

  useEffect(()=> {
    const setIsBackground = async () => {
      const s = await dbGetFile(BOARDBACKGROUND);
      s ? setBackground(true) : setBackground(false);
    }
    setIsBackground();
  }, [backgroundUpdate])
  
  const playingAs = useAppSelector(SelectPlayingAs);

  if (!square) return;
  const { player, isSelected, isWinner } = square;
  const dotted = !gameOver && !isSelected ? ' hover:border-dotted' : '';

  const onClick = async () => {
    if (gameOver || square.isSelected) return;
    dispatch(MovePlayer({ id: id, player: playingAs }));
  };

  return (
    <div
      onClick={() => onClick()}
      className={
        `flex w-1/3 min-w-1/3 justify-center items-center 
        content-center text-center border-4
        ${dotted}
        `}
      style={{
        borderColor: String(border),
        //only use color if no background images selected
        backgroundColor: !background ? String(boardColor) : undefined,
      }}>
      <Face key={id} isWin={isWinner} player={player} />
    </div>
  );
};
