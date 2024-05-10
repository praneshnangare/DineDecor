import { createSlice } from "@reduxjs/toolkit";
import { ERROR, INITIAL, LOADED, LOADING } from "../../helpers/constants";

const initialState = {
  cartItems : [],
  cartTotal : 0,
  storeState: INITIAL,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartItems: (state) => {
      state.storeState = "LOADING";
    },
    getCartItemsSuccess: (state, action) => {
      state.cartItems = action.payload;
      state.storeState = "LOADED";
    },
    getCartItemsFailure: (state, action) => {
      state.storeState = "ERROR";
    },
    updateCartItems: (state) => {
      state.storeState = "LOADING";
    },
    updateCartItemsSuccess : (state, action) => {
      state.cartItems = action.payload;
      state.storeState = "LOADED";
    },
    updateCartItemsFailure : (state, action) => {
      state.storeState = "ERROR";
    }
  },
});

export const {
  getCartItems,
  getCartItemsSuccess,
  getCartItemsFailure,
  updateCartItems,
  updateCartItemsSuccess,
  updateCartItemsFailure
} = cartSlice.actions;

export default cartSlice.reducer;
