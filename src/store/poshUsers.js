import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'poshUsers',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    added: (poshUsers, action) => {
      poshUsers.list.unshift(action.payload);
    },
    removed: (poshUsers, action) => {
      const index = poshUsers.list.indexOf(
        (poshUser) => poshUser.id === action.payload.id
      );
      poshUsers.list.splice(index, 1);
    },
    received: (poshUsers, action) => {
      poshUsers.list = action.payload;
    },
  },
});

export const { added, removed } = slice.actions;
export default slice.reducer;
