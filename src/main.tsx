import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '../src/store/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<>... loading ...</>}
        persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
