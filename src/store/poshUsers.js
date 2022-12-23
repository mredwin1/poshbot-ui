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
      poshUsers.list.concat(action.payload);
    },
    removed: (poshUsers, action) => {
      const index = poshUsers.list.findIndex(
        (poshUser) => poshUser.id === action.payload.id
      );
      poshUsers.list.splice(index, 1);
    },
    received: (poshUsers, action) => {
      poshUsers.list = action.payload.results;
    },
  },
});

export const { added, removed } = slice.actions;
export default slice.reducer;
