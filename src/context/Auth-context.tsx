import { createContext } from 'react';
import { FCC } from '@/helpers/FCC';
import { useAppSelector } from '@/infrastructure/store/store-hooks';

export const AuthContextContext = createContext<null>(null);

export const AuthContextContextProvider: FCC = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken && !window.location.pathname.includes('auth')) {
    window.location.replace('/auth/login');
  }

  if (window.location.pathname === '/auth/login' && accessToken) {
    window.location.replace('/');
  }

  return <AuthContextContext.Provider value={null}>{children}</AuthContextContext.Provider>;
};
