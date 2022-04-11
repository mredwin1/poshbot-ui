import { combineReducers } from '@reduxjs/toolkit';
import poshUsersReducer from './poshUsers';
import listingsReducer from './listings';

export default combineReducers({
  poshUsers: poshUsersReducer,
  listings: listingsReducer,
});
