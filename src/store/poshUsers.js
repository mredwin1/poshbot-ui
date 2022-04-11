import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const slice = createSlice({
  name: 'poshUsers',
  initialState: {
    list: [],
  },
  reducers: {
    poshUserAdded: (poshUsers, action) => {
      poshUsers.list.unshift({
        id: ++lastId,
        userId: '9696799f-74e3-4296-b6a4-2236ff35ffce',
        firstName: 'Monica',
        lastName: 'Schmidt',
        email: action.payload.email,
        username: 'monica_schmi',
        password: action.payload.password,
        profilePictureUrl:
          'https://images.unsplash.com/photo-1590076263644-1ab672cf1dea?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8ZmVtYWxlfHx8fHx8MTY0ODkzMDM0MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600',
        sales: 2,
        profileUrl: 'https://poshmark.com/closet/monica_schmi',
        campaignStatus: 'Not Assigned',
      });
    },
    poshUserRemoved: (poshUsers, action) => {
      const index = poshUsers.list.indexOf(
        (poshUser) => poshUser.id === action.payload.id
      );
      poshUsers.list.splice(index, 1);
    },
    loadPoshUsers: (poshUsers, action) => {
      poshUsers.list = action.payload;
    },
  },
});

export const { poshUserAdded, poshUserRemoved, loadPoshUsers } = slice.actions;
export default slice.reducer;
