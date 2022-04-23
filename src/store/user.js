import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { accessToken: '', refreshToken: '' },
  reducers: {
    userLoggedIn: (user, action) => {
      console.log('test');
      user.accessToken = action.payload.access;
      user.refreshToken = action.payload.refresh;
    },
  },
});

export const { userLoggedIn } = slice.actions;
export default slice.reducer;
