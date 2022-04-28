import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'campaigns',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    added: (campaigns, action) => {
      campaigns.list.push(action.payload);
    },
    removed: (campaigns, action) => {
      const index = campaigns.list.findIndex(
        (campaign) => campaign.id === action.payload.id
      );
      campaigns.list.splice(index, 1);
    },
    updated: (campaigns, action) => {
      const index = campaigns.list.findIndex(
        (campaign) => campaign.id === action.payload.id
      );
      campaigns.list[index] = action.payload;
    },
    received: (campaigns, action) => {
      campaigns.list = action.payload.results;
    },
    started: (campaigns, action) => {
      const index = campaigns.list.findIndex(
        (campaign) => campaign.id === action.payload.id
      );
      campaigns.list[index] = action.payload;
    },
    stopped: (campaigns, action) => {
      const index = campaigns.list.findIndex(
        (campaign) => campaign.id === action.payload.id
      );
      campaigns.list[index] = action.payload;
    },
  },
});

export const { added, removed, updated, received } = slice.actions;
export default slice.reducer;
