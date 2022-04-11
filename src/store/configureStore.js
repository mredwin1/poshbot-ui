import { configureStore } from '@reduxjs/toolkit';
import entitiesReducer from './entities';
import toast from './middleware/toast';

const reducer = {
  entities: entitiesReducer,
};

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toast),
  });
}
