import { call, put, takeEvery } from "@redux-saga/core/effects";
import * as api from "./cartAPI";
import { getCartItemsSuccess, getCartItemsFailure, updateCartItemsSuccess, updateCartItemsFailure } from "./cartSlice";
function* workFetchCartItemsSaga() {
  try {
    const cartItems = yield call(api.getCartItemsAPI);
    yield put(getCartItemsSuccess(cartItems));
  } catch (error) {
    yield put(getCartItemsFailure());
    console.log(error);
  }
}

function* workUpdateCartItemsSaga(action) {
  try {
    // const updatedCartItems = yield call(api.updateCartItemsAPI, action.payload);
    const updatedCartItems = action.payload;
    yield put(updateCartItemsSuccess(updatedCartItems));
  } catch (error) {
    yield put(updateCartItemsFailure());
    console.log(error);
  }
}


export default function* cartSaga() {
  yield takeEvery("cart/getCartItems", workFetchCartItemsSaga);
  yield takeEvery("cart/updateCartItems", workUpdateCartItemsSaga);
}