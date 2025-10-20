import { useEffect } from 'react';
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

export const Board = () => {
  const dispatch = useAppDispatch();
  const squares = useAppSelector(SelectAllSquares);
  const nextMove = useAppSelector(SelectNextMove);
  const myPlayer = useAppSelector(SelectPlayingAs);
  const status = useAppSelector(SelectStatus);

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
        style={{ backgroundColor: 'white' }}
        onClick={() => dispatch(reset())}>
        Reset
      </button>
      <div
        className={`drop-shadow-custom-m-gray flex flex-wrap w-1/3`}>
        {squares.map((s) => (
          <Cell key={s.id} id={s.id}/>
        ))}
      </div>
    </>
  );
};
