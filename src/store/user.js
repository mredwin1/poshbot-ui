import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    loggedIn: (user, action) => {
      user.accessToken = action.payload.access;
      user.refreshToken = action.payload.refresh;
    },
    loggedOut: (user, action) => {
      delete user.accessToken;
      delete user.refreshToken;
    },
  },
});

export const { userLoggedIn } = slice.actions;
export default slice.reducer;
