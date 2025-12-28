import { useEffect, useState } from 'react';
import {
  SelectNextMove,
  MoveNpc,
  reset,
  SelectAllSquares,
  SelectPlayingAs,
  SelectStatus,
} from '../store/reducers/gameReducer';
import { PiRecycleLight } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '../store/game/storeHooks';
import { Cell } from './Square';
import StyledIconText from '../lib/styledIconText';
import { BOARDBACKGROUND } from '../data/default_settings';
import { defaultStyleIconText } from '../styling/styles';
import { dbGetFile } from '../controller/fileController';
import { SelectFileUpdated } from '../store/reducers/fileReducer';

export const Board = () => {
  const [image, setImage] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const squares = useAppSelector(SelectAllSquares);
  const nextMove = useAppSelector(SelectNextMove);
  const myPlayer = useAppSelector(SelectPlayingAs);
  const status = useAppSelector(SelectStatus);
  const backgroundUpdate = useAppSelector((state) => 
    SelectFileUpdated(state, BOARDBACKGROUND));

  useEffect(()=> {
    async function getBackground(){
      const f = await dbGetFile(BOARDBACKGROUND);
      setImage(f ? URL.createObjectURL(f) : undefined);
    }
    getBackground();
  }, [setImage, backgroundUpdate]);

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

  const bgstyle: React.CSSProperties =
  image ? {
    backgroundImage: `url(${image})`,
    backgroundSize: '100% 100%'
  }
  : {}

  return (
    <>
      <StyledIconText
        icon={PiRecycleLight}
        text='Reset'
        {...defaultStyleIconText}
        onClick={() => doReset()}
      />
      <div 
      style={bgstyle}
      className={
        `drop-shadow-custom-m-gray flex flex-wrap w-1/3 mt-1 
        ${image && 
          `bg-cover bg-no-repeat bg-center 
          `}
        `}>
        {squares.map((s) => (
          <Cell key={s.id} id={s.id} />
        ))}
      </div>
    </>
  );
};
