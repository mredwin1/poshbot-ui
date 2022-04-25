import { combineReducers } from '@reduxjs/toolkit';
import poshUsersReducer from './poshUsers';
import listingsReducer from './listings';
import campaignsReducer from './campaigns';

export default combineReducers({
  poshUsers: poshUsersReducer,
  listings: listingsReducer,
  campaigns: campaignsReducer,
});
