import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './infrastructure/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { AuthContextContextProvider } from './context/Auth-context';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.tsx';
import './styles/index.scss';

const persistor = persistStore(store);
const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthContextContextProvider>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </AuthContextContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
