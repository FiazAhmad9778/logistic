import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './infrastructure/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App.tsx';
import { AuthContextContextProvider } from './context/Auth-context';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

const persistor = persistStore(store);
const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthContextContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
