import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import entitiesReducer from './entities';
import toast from './middleware/toast';

const reducer = {
  user: userReducer,
  entities: entitiesReducer,
};

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toast),
  });
}
