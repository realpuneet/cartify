import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproducts: (state, action) => {
      state.products = action.payload;
    },
    lazyloadproducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
  },
});

export const {loadproducts, lazyloadproducts} = productSlice.actions;
export default productSlice.reducer;
