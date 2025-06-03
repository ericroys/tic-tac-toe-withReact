import './App.css';
import { Board } from './components/Board';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className='flex  mt-10 w-full flex-col items-center'>
        <Board />
      </main>
    </>
  );
}

export default App;
