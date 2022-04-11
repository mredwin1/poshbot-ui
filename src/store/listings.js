import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const slice = createSlice({
  name: 'listings',
  initialState: [],
  reducers: {
    listingAdded: (listings, action) => {
      listings.push({
        id: ++lastId,
        title: action.payload.title,
        originalPrice: action.payload.originalPrice,
        listingPrice: action.payload.listingPrice,
        size: action.payload.size,
        imgUrl:
          'https://images.unsplash.com/photo-1586527153946-39236c744230?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8aXRlbXx8fHx8fDE2NDkzOTg0NjU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600',
        brand: action.payload.brand,
      });
    },
    listingRemoved: (listings, action) => {
      const index = listings.indexOf(
        (listing) => listing.id === action.payload.id
      );
      listings.splice(index, 1);
    },
    listingUpdated: (listings, action) => {
      const index = listings.indexOf(
        (listing) => listing.id === action.payload.id
      );
      listings[index] = action.payload;
    },
  },
});

export const { listingAdded, listingRemoved, listingUpdated } = slice.actions;
export default slice.reducer;
