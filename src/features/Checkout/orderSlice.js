import { createSlice } from "@reduxjs/toolkit";
import { ERROR, INITIAL, LOADED, LOADING } from "../../helpers/constants";

const initialState = {
  orders: [],
  storeState: INITIAL,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders: (state) => {
      state.storeState = LOADING;
    },
    getOrdersSuccess: (state, action) => {
      state.storeState = LOADED;
      state.orders = action.payload;
    },
    getOrdersFailure: (state) => {
      state.storeState = ERROR;
    },
    addOrder: (state) => {
      state.storeState = LOADING;
    },
    addOrderSuccess: (state, action) => {
      state.storeState = LOADED;
      state.orders.push(action.payload);
    },
    addOrderFailure: (state) => {
      state.storeState = ERROR;
    },
  },
});

export const {
  getOrders,
  getOrdersSuccess,
  getOrdersFailure,
  addOrder,
  addOrderSuccess,
  addOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
