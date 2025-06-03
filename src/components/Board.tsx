import { useEffect, useState } from 'react';
import {
  SelectNextMove,
  MoveNpc,
  reset,
  SelectAllSquares,
  SelectPlayingAs,
  SelectStatus,
} from '../model/gameReducer';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { Cell } from './Square';
import { SelectAllSettings } from '../model/settingsReducer';

export const Board = () => {
  const dispatch = useAppDispatch();
  const squares = useAppSelector(SelectAllSquares);
  const nextMove = useAppSelector(SelectNextMove);
  const myPlayer = useAppSelector(SelectPlayingAs);
  const settings = useAppSelector(SelectAllSettings);
  //TODO Use the settings from the store
  const status = useAppSelector(SelectStatus);
  const [color, setColor] = useState<string>('#652020');

  useEffect(() => {
    async function nextMoving() {
      if (
        nextMove != myPlayer &&
        (status === 'ready' || status === 'calcwin_complete')
      ) {
        dispatch(MoveNpc());
      }
    }
    nextMoving();
  }, [nextMove, myPlayer, dispatch, status]);
  return (
    <>
      <button
        style={{ backgroundColor: color }}
        onClick={() => dispatch(reset())}>
        Reset
      </button>
      <div
        className={`${color} drop-shadow-custom-m-gray flex flex-wrap w-1/3`}>
        {squares.map((s) => (
          <Cell key={s.id} id={s.id} color={color} />
        ))}
      </div>
    </>
  );
};
