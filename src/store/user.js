import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const slice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    id: '',
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    loggedIn: (user, action) => {
      user.isAuthenticated = true;
      user.id = action.payload.id;
      user.username = action.payload.username;
      user.accessToken = action.payload.access;
      user.refreshToken = action.payload.refresh;
    },
    loggedOut: (user, action) => {
      user.isAuthenticated = '';
      user.id = '';
      user.username = '';
      user.accessToken = '';
      user.refreshToken = '';
    },
  },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;
export default slice.reducer;
