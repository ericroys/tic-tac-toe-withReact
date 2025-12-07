import { useEffect } from 'react';
import {
  SelectNextMove,
  MoveNpc,
  reset,
  SelectAllSquares,
  SelectPlayingAs,
  SelectStatus,
} from '../model/gameReducer';
import { PiRecycleLight } from 'react-icons/pi';

import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { Cell } from './Square';
import StyledIconText from '../lib/styledIconText';
// import { CloseModal } from './modalClose';

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

  const doReset = () => {
    dispatch(reset())
  }

  return (
    <>
      <StyledIconText
        icon={PiRecycleLight}
        text='Reset'
        iconClass='text-black'
        txtClass='text-black pr-5 drop-shadow-custom-m-gray cursor-pointer'
        onClick={() => doReset()}
      />
      <div className={`drop-shadow-custom-m-gray flex flex-wrap w-1/3`}>
        {squares.map((s) => (
          <Cell key={s.id} id={s.id} />
        ))}
      </div>
      {/* <CloseModal isOpen={isOpen} onClose={closeModal} children={<></>} /> */}
    </>
  );
};
