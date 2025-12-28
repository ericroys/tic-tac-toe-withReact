import './App.css';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { BOARDCOLOR, SCREENBACKGROUND } from './data/default_settings';
import { SelectSettingByKey } from './store/reducers/settingsReducer';
import { useAppSelector } from './store/game/storeHooks';
import { useEffect, useState } from 'react';
import { dbGetFile } from './controller/fileController';
import { SelectFileUpdated } from './store/reducers/fileReducer';

function App() {
  const boardColor = useAppSelector((state) => SelectSettingByKey(state, BOARDCOLOR));
  const backgroundUpdate = useAppSelector((state) => SelectFileUpdated(state, SCREENBACKGROUND));
  //state for async background
  const [background, setBackground] = useState<string | undefined>();

  //get screen background if present
  useEffect(() => {
    if(!backgroundUpdate) return;

    const getBackground = async () => {
      const f = await dbGetFile(SCREENBACKGROUND);
      setBackground(f ? URL.createObjectURL(f) : undefined);
    }
    getBackground();
  }, [backgroundUpdate, setBackground]);

  //styling for background or color
  const bgstyle: React.CSSProperties =
    background ? {
      backgroundImage: `url(${background})`,
      backgroundSize: '100% 100%'
    }
      : {
        backgroundColor: String(boardColor)
      }

  return (
    <>
      <Header />
      <main className='flex flex-1 pt-10 w-full flex-col items-center h-[96vh]'
        style={bgstyle}>
        <Board />
      </main>
    </>
  );
}

export default App;
