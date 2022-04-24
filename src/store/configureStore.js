import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import entitiesReducer from './entities';
import toast from './middleware/toast';
import api from './middleware/api';

const reducer = {
  user: userReducer,
  entities: entitiesReducer,
};

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(toast, api),
  });
}
