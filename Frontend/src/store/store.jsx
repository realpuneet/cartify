import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});
