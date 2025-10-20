import './App.css';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { BOARDCOLOR } from './data/default_settings';
import { SelectSettingByKey } from './model/settingsReducer';
import { useAppSelector } from './store/storeHooks';

function App() {
  const boardColor = useAppSelector((state) => SelectSettingByKey(state, BOARDCOLOR));

  return (
    <>
      <Header />
      <main className='flex  pt-10 w-full flex-col items-center h-screen'
      style={{backgroundColor: String(boardColor)}}>
        <Board />
      </main>
    </>
  );
}

export default App;
