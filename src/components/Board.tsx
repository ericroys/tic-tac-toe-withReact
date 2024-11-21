import { useEffect, useState } from 'react';
import {
  SelectNextMove,
  MoveNpc,
  reset,
  SelectAllSquares,
  SelectPlayingAs,
  SelectStatus,
  GameOver,
} from '../model/reducers';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { Cell } from './Square';
// import { CloseModal } from './modalClose';

export const Board = () => {
  const dispatch = useAppDispatch();
  const squares = useAppSelector(SelectAllSquares);
  const hasWinner = useAppSelector(GameOver);
  const nextMove = useAppSelector(SelectNextMove);
  const myPlayer = useAppSelector(SelectPlayingAs);
  const status = useAppSelector(SelectStatus);
  //our modal/dialog management start with closed
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function nextMoving() {
      if (hasWinner) return;
      if (
        nextMove != myPlayer &&
        (status === 'ready' || status === 'calcwin_complete')
      ) {
        dispatch(MoveNpc());
      }
    }
    nextMoving();
  }, [nextMove, myPlayer, MoveNpc, status, hasWinner]);
  return (
    <>
      {/* <button onClick={() => dispatch(npcMove)}>BOB</button> */}
      <button className='bg-blue' onClick={() => dispatch(reset())}>
        Reset
      </button>
      <button
        onClick={() => {
          setIsOpen(true);
        }}>
        Options
      </button>
      <div>It's player {nextMove === 'x' ? 'X' : 'O'}'s turn!</div>
      <div className='bg-black drop-shadow-custom-m-gray flex flex-wrap w-1/3'>
        {squares.map((s) => (
          <Cell key={s.id} id={s.id} />
        ))}
      </div>
      {/* <CloseModal isOpen={isOpen} onClose={closeModal} children={<></>} /> */}
    </>
  );
};
