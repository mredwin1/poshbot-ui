import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'listings',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    added: (listings, action) => {
      listings.list.push({
        id: action.payload.id,
        assigned: action.payload.assigned,
        title: action.payload.title,
        original_price: action.payload.original_price,
        listing_price: action.payload.listing_price,
        lowest_price: action.payload.lowest_price,
        size: action.payload.size,
        cover_photo: action.payload.cover_photo,
        brand: action.payload.brand,
        description: action.payload.description,
        category: action.payload.category,
        subcategory: action.payload.subcategory,
      });
    },
    removed: (listings, action) => {
      const index = listings.list.findIndex(
        (listing) => listing.id === action.payload.id
      );
      listings.list.splice(index, 1);
    },
    updated: (listings, action) => {
      const index = listings.list.findIndex(
        (listing) => listing.id === action.payload.id
      );
      listings.list[index] = action.payload;
    },
    received: (listings, action) => {
      listings.list = action.payload.results;
    },
  },
});

export const { added, removed, updated, received } = slice.actions;
export default slice.reducer;
