import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import entitiesReducer from './entities';
import toast from './middleware/toast';
import api from './middleware/api';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiCallBegan, apiCallFailed } from './api';

const reducers = combineReducers({
  user: userReducer,
  entities: entitiesReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            apiCallBegan.type,
            apiCallFailed.type,
          ],
        },
      }).concat(toast, api),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
