import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Import from redux persist FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appApi } from './api';
import authReducer from './features/auth/auth-slice';
import userPrivilegeSlice from './features/user-privileges/user-privileges-slice';

/**
 * ### App wide combined Reducers
 * any reducers that will be used app wide should be declared here
 *
 * `Type of Reducers ( STORE, API )` \
 * `STORE = app wide store's` \
 * `API = app wide API's`
 */
export const rootReducers = combineReducers({
  // STORE
  auth: authReducer,
  user: userPrivilegeSlice,
  // API
  [appApi.reducerPath]: appApi.reducer,
});

/**
 * ### Persisted Storage Configuration
 *
 * localStorage key = `'root'`
 *
 * only `auth` store is persisted in localStorage by default
 *
 * append on `whitelist` the key string of specific reducer defined in `rootReducers`
 * 
    ````javascript
    {
      key: "root",
      storage: storage,
      whitelist: ["auth", <reducer key>]
    }
    ````
 */
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
};

/**
 * ### Implementation of persistReducer
 */
const reducersWithPersist = persistReducer(persistConfig, rootReducers);

/**
 * ### Implementation of Redux Toolkit Store
 */
export const store = configureStore({
  reducer: reducersWithPersist,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      //  {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
    }).concat(appApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
